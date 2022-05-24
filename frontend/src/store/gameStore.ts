import { makeAutoObservable } from "mobx";
import { Vector3 } from "@babylonjs/core";
import { Dealer, GameState, GameStore, Player } from "./type";

import { Points } from "../common/consts/types";

import { game } from "../common";

export const gameStore = makeAutoObservable<GameStore>({
    cardIdx: 0,
    gameState: "menu",
    deck: game.createCards(),
    cardsInGame: [],
    dealer: {
        cards: [],
        position: new Vector3(0, 0.15, 3),
        points: 0,
        hiddenCard: null,
    },
    players: [
        {
            cards: [],
            position: new Vector3(0, 0.15, -3),
            points: 0,
            money: 100,
            bet: 0,

        }],
    async addHiddenCard(): Promise<void> {
        const card = this.deck[this.cardIdx];
        await game.addHiddenCard(this.dealer, card);
        this.dealer.cards.push(card);
        this.dealer.points += Points[card.value];
        this.dealer.hiddenCard = card;
        this.cardIdx++;
        this.cardsInGame.push(card);
    },
    shuffleDeck(): void {
        game.shuffelDeckPreviewAnimation(this.deck);
    },

    async addCardToPlayer(player: Player | Dealer): Promise<void> {
        const card = this.deck[this.cardIdx];
        await game.addCardToPlayer(player, card);
        player.cards.push(card);
        player.points += Points[card.value];
        this.cardIdx++;
        this.cardsInGame.push(card);
    },

    changeState(newState: GameState) {
        this.gameState = newState;
    },
    addBet(money: number) {
        if (this.players[0].money >= money) {
            this.players[0].bet += money;
            this.players[0].money -= money;
        }
    },

    async showHiddenCard() {
        if (this.dealer.hiddenCard) {
            await game.showHiddenCard(this.dealer.hiddenCard);
            this.dealer.hiddenCard = null;
        }
    },
    async returnCardsToDeck(): Promise<void> {
        await game.returnAllCardsInGame(this.cardsInGame, this.deck);
        this.cardIdx = 0;
        this.players.forEach((player) => {
            player.cards = [];
            player.points = 0;
            player.bet = 0;
        });
        this.dealer.cards = [];
        this.dealer.points = 0;
    },
}, {});
