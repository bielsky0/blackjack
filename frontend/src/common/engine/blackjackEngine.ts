import { Animation, MeshBuilder, Quaternion, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
// import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";
import { EngineBase } from "./engine";

// import { createArdoise } from "../../utils/board";

import tableTexture from "../../assets/table.jpg";
import { Card } from "./cards/card";
import { CardType, CardValue, Types, Values } from "./cards/types";

export interface Player { cards: Card[]; position: Vector3; }

// let cardIdx = 0;
// const cardsInGame: Card[] = [];
// const cards: Card[] = [];

// const cardsSuits: Array<[CardValue, CardType]> = [];

// Values.forEach((value) => {
//     Types.forEach((type) => {
//         cardsSuits.push([value, type]);
//     });
// });

// export const player1: Player = {
//     cards: [],
//     position: new Vector3(0, 0.15, -3),
// };
// export const dealer: Player = {
//     cards: [],
//     position: new Vector3(0, 0.15, 3),
// };

export class BlackJack extends EngineBase {
    public addCardToPlayer(player: Player, card: Card): void {
        // const card = cards[cardIdx];

        this.moveCard(card, new Vector3(player.cards.length * 0.5, 0.15 + (player.cards.length / 100), player.position.z));
        this.rotateCard(card, Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2));
        player.cards.push(card);
        // cardsInGame.push(card);
        // cardIdx++;
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

    public returnAllCardsInGame(cardsInGameE: Card[], cardsS: Card[]): void {
        while (cardsInGameE.length > 0) {
            const s = cardsInGameE.length;
            const cardInGame = cardsInGameE.pop();
            if (cardInGame) {
                this.moveCard(cardInGame, new Vector3(-6, 0.15 + ((cardsS.length / 100) - (s / 100)), 3));
                this.rotateCard(cardInGame, Quaternion.RotationAxis(new Vector3(1, 0, 0), -Math.PI / 2));
            }
        }
        // cardIdx = 0;
        // player1.cards = [];
        // dealer.cards = [];
    }

    public shuffelDeckPreviewAnimation(cardsS: Card[]): void {
        for (let i = 0; i < cardsS.length; i++) {
            setTimeout(() => {
                const rand1 = Math.floor(Math.random() * 52);
                const rand2 = Math.floor(Math.random() * 52);

                const temp = cardsS[rand1];
                this.moveCard(cardsS[rand1], cardsS[rand2].card.position);
                cardsS[rand1] = cardsS[rand2];
                this.moveCard(cardsS[rand2], temp.card.position);
                cardsS[rand2] = temp;
            }, i * 300);
        }
    }

    protected addContent(): void {
        this.boot().then(() => {
            const table = MeshBuilder.CreateBox("table", { height: 13, width: 13 * 3000 / 1920, depth: 0.25 }, this.scene);
            const mat2 = new StandardMaterial("mat-table", this.scene);
            mat2.diffuseTexture = new Texture(tableTexture, this.scene);
            table.material = mat2;
            table.rotationQuaternion = Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2);
            // cardsSuits.forEach(([value, type], i) => {
            //     const card = new Card(this.scene, value, type);
            //     card.setPosition(new Vector3(-6, 0.67 - (i / 100), 3));
            //     cards.push(card);
            // });
        });
    }

    protected moveCard(card: Card, vector: Vector3): void {
        Animation.CreateAndStartAnimation("moveCard", card.card, "position", 30, 10, card.card.position, vector, 2);
    }

    protected rotateCard(card: Card, quaternion: Quaternion): void {
        Animation.CreateAndStartAnimation("moveCard", card.card, "rotationQuaternion", 30, 10, card.card.rotationQuaternion, quaternion, 2);
    }
}
