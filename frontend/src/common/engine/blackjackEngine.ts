import { Animation, MeshBuilder, Quaternion, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { EngineBase } from "./engine";

import tableTexture from "../../assets/table.jpg";
import { Card } from "./cards/card";
import { CardType, CardValue, Types, Values } from "./cards/types";
import { Dealer, Player } from "../../store/type";

export class BlackJack extends EngineBase {
    public async addCardToPlayer(player: Player | Dealer, card: Card): Promise<void> {
        await this.moveCard(card, new Vector3(player.cards.length * 0.5, 0.15 + (player.cards.length / 100), player.position.z), 30, 10);
        await this.rotateCard(card, Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2), 30, 10);
    }

    public async addHiddenCard(player: Dealer, card: Card): Promise<void> {
        await this.moveCard(card, new Vector3(player.cards.length * 0.5, 0.15 + (player.cards.length / 100), player.position.z), 30, 10);
        await this.rotateCard(card, Quaternion.RotationAxis(new Vector3(1, 0, 0), -Math.PI / 2), 30, 10);
    }

    public async showHiddenCard(card: Card): Promise<void> {
        await this.rotateCard(card, Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2), 30, 10);
    }

    public createCards(): Card[] {
        const cardsS: Card[] = [];

        const cardsSuitsS: Array<[CardValue, CardType]> = [];

        Values.forEach((value) => {
            Types.forEach((type) => {
                cardsSuitsS.push([value, type]);
            });
        });

        cardsSuitsS.forEach(([value, type], i) => {
            const card = new Card(this.scene, value, type);
            card.setPosition(new Vector3(-6, 0.67 - (i / 100), 3));
            cardsS.push(card);
        });
        return cardsS;
    }

    public async returnAllCardsInGame(cardsInGameE: Card[], cardsS: Card[]): Promise<void> {
        try {
            while (cardsInGameE.length > 0) {
                const s = cardsInGameE.length;
                const cardInGame = cardsInGameE.pop();
                if (cardInGame) {
                    await this.moveCard(cardInGame, new Vector3(-6, 0.15 + ((cardsS.length / 100) - (s / 100)), 3), 30, 10);
                    await this.rotateCard(cardInGame, Quaternion.RotationAxis(new Vector3(1, 0, 0), -Math.PI / 2), 30, 10);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    public shuffelDeckPreviewAnimation(cardsS: Card[]): void {
        // eslint-disable-next-line
        for (const _ of cardsS) {
            const rand1 = Math.floor(Math.random() * 52);
            const rand2 = Math.floor(Math.random() * 52);

            const temp = cardsS[rand1];
            // await this.moveCard(cardsS[rand1], cardsS[rand2].card.position, 1000, 1);
            cardsS[rand1] = cardsS[rand2];
            // console.log(temp.card.position, cardsS[rand2].card.position);
            // await this.moveCard(cardsS[rand2], temp.card.position, 1000, 1);
            cardsS[rand2] = temp;
        }
        // cardsS.forEach((card) => {
        //     console.log(card.card.position);
        // });
    }

    protected addContent(): void {
        this.boot().then(() => {
            const table = MeshBuilder.CreateBox("table", { height: 13, width: 13 * 3000 / 1920, depth: 0.25 }, this.scene);
            const mat2 = new StandardMaterial("mat-table", this.scene);
            mat2.diffuseTexture = new Texture(tableTexture, this.scene);
            table.material = mat2;
            table.rotationQuaternion = Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2);
        });
    }

    protected moveCard(card: Card, vector: Vector3, framePerSeconds: number, totalFrames: number): Promise<void> {
        return new Promise((resolve) => {
            // eslint-disable-next-line
            Animation.CreateAndStartAnimation("moveCard", card.card, "position", framePerSeconds, totalFrames, card.card.position, vector, 2, undefined, () => {
                resolve();
            });
        });
    }

    protected rotateCard(card: Card, quaternion: Quaternion, framePerSeconds: number, totalFrames: number): Promise<void> {
        return new Promise((resolve) => {
            // eslint-disable-next-line
            Animation.CreateAndStartAnimation("rotateCard", card.card, "rotationQuaternion", framePerSeconds, totalFrames, card.card.rotationQuaternion, quaternion, 2, undefined, () => {
                resolve();
            });
        });
    }
}
