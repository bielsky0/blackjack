import {
    Animation,
    AnimationGroup,
    IAnimationKey,
    MeshBuilder,
    Quaternion,
    StandardMaterial,
    Vector3,
} from "@babylonjs/core";
import { EngineBase } from "./engine";
import { Card } from "./cards/card";
import { CardType, CardValue, Types, Values } from "./cards/types";
import { Dealer, Player, SplittedArray } from "../../store/type";
import { TextureId } from "../consts/types";

export class BlackJack extends EngineBase {
    public async swapSplittedArray(splittedArray: SplittedArray, flag: 0 | 1): Promise<void> {
        const promiseArray: Promise<void>[] = [];

        if (flag === 1) {
            for (const [i, card] of splittedArray[0].cards.entries()) {
                promiseArray.push(this.moveCard(card, new Vector3((i * 0.5) + 0.5,
                    0.15 + (i / 100), (
                        0)), 25, 10));
            }

            for (const [i, card] of splittedArray[1].cards.entries()) {
                promiseArray.push(this.moveCard(card, new Vector3((i * 0.5) - 2,
                    0.15 + (i / 100), (
                        -4)), 25, 10));
            }
        }

        if (flag === 0) {
            for (const [i, card] of splittedArray[0].cards.entries()) {
                promiseArray.push(this.moveCard(card, new Vector3((i * 0.5) - 2,
                    0.15 + (i / 100), (
                        -4)), 25, 10));
            }

            for (const [i, card] of splittedArray[1].cards.entries()) {
                promiseArray.push(this.moveCard(card, new Vector3((i * 0.5) + 0.5,
                    0.15 + (i / 100), (
                        0)), 25, 10));
            }
        }

        return new Promise((resolve) => {
            Promise.all(promiseArray).then(() => {
                resolve();
            });
        });
    }

    public async addCardToSplittedPosition(player: Player, card: Card, splittedPosition: 0 | 1): Promise<void> {
        const move = new Animation("move", "position", 25, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);

        const moveKeys: IAnimationKey[] = [];

        moveKeys.push({
            frame: 0,
            value: card.card.position,
        });

        let position = new Vector3((player.split[splittedPosition].cards.length * 0.5) + 0.5,
            0.15 + (player.split[splittedPosition].cards.length / 100),
            0);

        if (splittedPosition === 1) {
            position = new Vector3((player.split[splittedPosition].cards.length * 0.5) - 2,
                0.15 + (player.split[splittedPosition].cards.length / 100),
                -4);
        }

        moveKeys.push({
            frame: 10,
            value: position,
        });

        move.setKeys(moveKeys);

        const rotate = new Animation("rotate",
            "rotationQuaternion",
            25,
            Animation.ANIMATIONTYPE_QUATERNION,
            Animation.ANIMATIONLOOPMODE_CONSTANT);

        const rotateKeys: IAnimationKey[] = [];

        rotateKeys.push({
            frame: 0,
            value:
        card.card.rotationQuaternion,
        });

        rotateKeys.push({
            frame: 10,
            value: Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2),
        });

        rotate.setKeys(rotateKeys);

        const aniGroup = new AnimationGroup("addCardToSplittedPosition", this.scene);

        aniGroup.addTargetedAnimation(rotate, card.card);
        aniGroup.addTargetedAnimation(move, card.card);

        aniGroup.normalize(0, 10);

        aniGroup.play();
        return new Promise((resolve) => {
            aniGroup.onAnimationEndObservable.add(() => {
                resolve();
            });
        });
    }

    public async addCardToCurrentSplittedPosition(player: Player, card: Card): Promise<void> {
        const move = new Animation("move", "position", 25, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);

        const moveKeys: IAnimationKey[] = [];

        moveKeys.push({
            frame: 0,
            value: card.card.position,
        });

        const position =
            new Vector3((player.split[player.splitIdx].cards.length * 0.5) + 0.5,
                0.15 + (player.split[player.splitIdx].cards.length / 100),
                0);

        moveKeys.push({
            frame: 10,
            value: position,
        });

        move.setKeys(moveKeys);

        const rotate = new Animation("rotate",
            "rotationQuaternion",
            25,
            Animation.ANIMATIONTYPE_QUATERNION,
            Animation.ANIMATIONLOOPMODE_CONSTANT);

        const rotateKeys: IAnimationKey[] = [];

        rotateKeys.push({
            frame: 0,
            value:
        card.card.rotationQuaternion,
        });

        rotateKeys.push({
            frame: 10,
            value: Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2),
        });

        rotate.setKeys(rotateKeys);

        const aniGroup = new AnimationGroup("addCardToSplittedPosition", this.scene);

        aniGroup.addTargetedAnimation(rotate, card.card);
        aniGroup.addTargetedAnimation(move, card.card);

        aniGroup.normalize(0, 10);

        aniGroup.play();
        return new Promise((resolve) => {
            aniGroup.onAnimationEndObservable.add(() => {
                resolve();
            });
        });
    }

    public async split(player: Player): Promise<void> {
        const move0 = new Animation("move", "position", 25, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);

        const moveKeys0: IAnimationKey[] = [];

        moveKeys0.push({
            frame: 0,
            value: player.cards[0].card.position,
        });

        const position0 = new Vector3(0.5, 0.15, 0);

        moveKeys0.push({
            frame: 10,
            value: position0,
        });

        move0.setKeys(moveKeys0);

        const move1 = new Animation("move", "position", 25, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);

        const moveKeys1: IAnimationKey[] = [];

        moveKeys1.push({
            frame: 0,
            value: player.cards[1].card.position,
        });

        const position1 = new Vector3(-2, 0.15, -4);

        moveKeys1.push({
            frame: 10,
            value: position1,
        });

        move1.setKeys(moveKeys1);

        const rotate = new Animation("rotate",
            "rotationQuaternion",
            25,
            Animation.ANIMATIONTYPE_QUATERNION,
            Animation.ANIMATIONLOOPMODE_CONSTANT);

        const rotateKeys: IAnimationKey[] = [];

        rotateKeys.push({
            frame: 0,
            value: Quaternion.RotationAxis(new Vector3(1, 0, 0), -Math.PI / 2),

        });

        rotateKeys.push({
            frame: 10,
            value: Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2),
        });

        rotate.setKeys(rotateKeys);

        const aniGroup = new AnimationGroup("splitCards", this.scene);

        aniGroup.addTargetedAnimation(rotate, player.cards[0].card);
        aniGroup.addTargetedAnimation(rotate, player.cards[1].card);
        aniGroup.addTargetedAnimation(move0, player.cards[0].card);
        aniGroup.addTargetedAnimation(move1, player.cards[1].card);

        aniGroup.normalize(0, 10);

        aniGroup.play();

        return new Promise((resolve) => {
            aniGroup.onAnimationEndObservable.add(() => {
                resolve();
            });
        });
    }

    public addCardToPlayer(player: Player | Dealer, card: Card): Promise<void> {
        // console.log(card.type, card.value);
        const move = new Animation("move", "position", 25, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);

        const moveKeys: IAnimationKey[] = [];

        moveKeys.push({
            frame: 0,
            value: card.card.position,
        });

        moveKeys.push({
            frame: 10,
            value: new Vector3(player.cards.length * 0.5, 0.15 + (player.cards.length / 100), player.position.z),
        });

        // new Vector3(-2, 0.2, -4)
        // new Vector3(0.5, 0.2, 0)
        // new Vector3(player.cards.length * 0.5, 0.15 + (player.cards.length / 100), player.position.z)
        move.setKeys(moveKeys);

        const rotate = new Animation("rotate",
            "rotationQuaternion",
            25,
            Animation.ANIMATIONTYPE_QUATERNION,
            Animation.ANIMATIONLOOPMODE_CONSTANT);

        const rotateKeys: IAnimationKey[] = [];

        rotateKeys.push({
            frame: 0,
            value:
            card.card.rotationQuaternion,
        });

        rotateKeys.push({
            frame: 10,
            value: Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2),
        });

        rotate.setKeys(rotateKeys);

        const aniGroup = new AnimationGroup("addCardToPlayer", this.scene);

        aniGroup.addTargetedAnimation(rotate, card.card);
        aniGroup.addTargetedAnimation(move, card.card);

        aniGroup.normalize(0, 10);

        aniGroup.play();
        return new Promise((resolve) => {
            aniGroup.onAnimationEndObservable.add(() => {
                resolve();
            });
        });
    }

    public async addHiddenCard(player: Dealer, card: Card): Promise<void> {
        const move = new Animation("move", "position", 25, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);

        const moveKeys: IAnimationKey[] = [];

        moveKeys.push({
            frame: 0,
            value: card.card.position,
        });

        moveKeys.push({
            frame: 10,
            value: new Vector3(player.cards.length * 0.5, 0.15 + (player.cards.length / 100), player.position.z),
        });

        move.setKeys(moveKeys);

        const rotate = new Animation("rotate",
            "rotationQuaternion",
            25,
            Animation.ANIMATIONTYPE_QUATERNION,
            Animation.ANIMATIONLOOPMODE_CONSTANT);

        const rotateKeys: IAnimationKey[] = [];

        rotateKeys.push({
            frame: 0,
            value:
            card.card.rotationQuaternion,
        });

        rotateKeys.push({
            frame: 10,
            value: Quaternion.RotationAxis(new Vector3(1, 0, 0), -Math.PI / 2),
        });

        rotate.setKeys(rotateKeys);

        const aniGroup = new AnimationGroup("addCardToPlayer", this.scene);

        aniGroup.addTargetedAnimation(rotate, card.card);
        aniGroup.addTargetedAnimation(move, card.card);

        aniGroup.normalize(0, 10);

        aniGroup.play();
        return new Promise((resolve) => {
            aniGroup.onAnimationEndObservable.add(() => {
                resolve();
            });
        });
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

    public returnAllCardsInGame(cardsInGameE: Card[], cardsS: Card[]): Promise<void> {
        const promiseArray: Promise<void>[] = [];

        while (cardsInGameE.length > 0) {
            const s = cardsInGameE.length;
            const cardInGame = cardsInGameE.pop();
            if (cardInGame) {
                promiseArray.push(this.moveCard(cardInGame, new Vector3(-6, 0.15 + ((cardsS.length / 100) - (s / 100)), 3), 30, 10));
                promiseArray.push(this.rotateCard(cardInGame, Quaternion.RotationAxis(new Vector3(1, 0, 0), -Math.PI / 2), 30, 10));
            }
        }
        return new Promise((resolve) => {
            Promise.all(promiseArray).then(() => {
                resolve();
            });
        });
    }

    public shuffelDeckPreviewAnimation(cardsS: Card[]): Promise<void> {
        const promiseArray: Promise<void>[] = [];

        // eslint-disable-next-line
        for (const _ of cardsS) {
            const rand1 = Math.floor(Math.random() * 52);
            const rand2 = Math.floor(Math.random() * 52);

            const temp = cardsS[rand1];
            promiseArray.push(this.moveCard(cardsS[rand1], cardsS[rand2].card.position, 1000, 1));
            cardsS[rand1] = cardsS[rand2];
            promiseArray.push(this.moveCard(cardsS[rand2], temp.card.position, 1000, 1));
            cardsS[rand2] = temp;
        }

        return new Promise((resolve) => {
            Promise.all(promiseArray).then(() => {
                resolve();
            });
        });
    }

    protected addContent(): void {
        this.boot().then(() => {
            const table = MeshBuilder.CreateBox("table", { height: 13, width: 13 * 3000 / 1920, depth: 0.25 }, this.scene);
            const mat2 = new StandardMaterial("mat-table", this.scene);
            mat2.diffuseTexture = this.scene.getTextureByName(TextureId.table);
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
