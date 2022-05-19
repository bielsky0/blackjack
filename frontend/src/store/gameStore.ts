import { makeAutoObservable } from "mobx";
import { Vector3 } from "@babylonjs/core";
import { GameState } from "./type";

// eslint-disable-next-line import/no-cycle
import { game } from "../common";
import { Player } from "../common/engine/blackjackEngine";

export const gameStore = makeAutoObservable<GameState>({
    cardIdx: 0,
    deck: game.createCards(),
    cardsInGame: [],
    players: [{
        cards: [],
        position: new Vector3(0, 0.15, -3),
    },
    {
        cards: [],
        position: new Vector3(0, 0.15, 3),
    }],

    shuffleDeck() {
        game.shuffelDeckPreviewAnimation(this.deck);
        // this.deck.forEach(() => {
        //     const rand1 = Math.floor(Math.random() * 52);
        //     const rand2 = Math.floor(Math.random() * 52);

        //     const temp = this.deck[rand1];
        //     this.deck[rand1] = this.deck[rand2];
        //     this.deck[rand2] = temp;
        // });
    },

    addCardToPlayer(player: Player) {
        const card = this.deck[this.cardIdx];
        game.addCardToPlayer(player, card);
        this.cardIdx++;
        this.cardsInGame.push(card);
    },

    returnCardsToDeck() {
        console.log(this.cardsInGame);
        game.returnAllCardsInGame(this.cardsInGame, this.deck);

        this.cardIdx = 0;
        this.players.forEach((player) => {
            player.cards = [];
        });
    },
}, {});
