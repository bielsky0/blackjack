import { makeAutoObservable, runInAction } from "mobx";
import { Vector3 } from "@babylonjs/core";
import { Dealer, GameState, GameStore, Player } from "./type";

import { Points } from "../common/consts/types";

import { game } from "../common";

export const gameStore = makeAutoObservable<GameStore>({
    turn: null,
    turnIdx: null,
    isAnimating: false,
    cardIdx: 0,
    gameState: "menu",
    deck: game.createCards(),
    cardsInGame: [],
    dealer: {
        cards: [],
        position: new Vector3(0, 0.15, 4),
        points: 0,
        hiddenCard: null,
    },
    players: [
        {
            id: Math.random().toString(),
            cards: [],
            position: new Vector3(0, 0.15, -4),
            points: 0,
            money: 100,
            bet: 0,
            state: "playing",
        },
        {
            id: Math.random().toString(),
            cards: [],
            position: new Vector3(6, 0.15, 0),
            points: 0,
            money: 100,
            bet: 0,
            state: "playing",
        },
        {
            id: Math.random().toString(),
            cards: [],
            position: new Vector3(-6, 0.15, 0),
            points: 0,
            money: 100,
            bet: 0,
            state: "playing",
        },
    ],
    nextTurn() {
        if (this.turnIdx === null) {
            this.turnIdx = 0;
        }

        this.turn = this.players[this.turnIdx].id;

        this.turnIdx++;

        if (this.turnIdx === 3) {
            this.turnIdx = null;
        }
    },
    async hit() {
        if (this.turn) {
            const currentPlayer = this.players.find((player) => player.id === this.turn);
            if (currentPlayer) {
                await gameStore.addCardToPlayer(currentPlayer);
                runInAction(() => {
                    if (currentPlayer.points > 21) {
                        // this.players[this.turnIdx].
                        currentPlayer.state = "lose";
                        this.nextTurn();
                    }
                });
            }
        }
    },
    stand() {
        if (this.turn && this.turnIdx !== null) {
            this.players[this.turnIdx].state = "stand";
            this.nextTurn();
        }
    },
    async addHiddenCard(): Promise<void> {
        this.isAnimating = true;
        try {
            const card = this.deck[this.cardIdx];
            await game.addHiddenCard(this.dealer, card);
            runInAction(() => {
                this.dealer.cards.push(card);
                this.dealer.points += Points[card.value];
                this.dealer.hiddenCard = card;
                this.cardIdx++;
                this.cardsInGame.push(card);
                this.isAnimating = false;
            });
        } catch (err) {
            this.isAnimating = false;
        }
    },
    async shuffleDeck(): Promise<void> {
        this.isAnimating = true;
        try {
            await game.shuffelDeckPreviewAnimation(this.deck);
            runInAction(() => {
                this.isAnimating = false;
            });
        } catch (err) {
            this.isAnimating = false;
        }
    },

    async addCardToPlayer(player: Player | Dealer): Promise<void> {
        this.isAnimating = true;
        try {
            const card = this.deck[this.cardIdx];
            await game.addCardToPlayer(player, card);
            runInAction(() => {
                player.cards.push(card);
                player.points += Points[card.value];
                this.cardIdx++;
                this.cardsInGame.push(card);
                this.isAnimating = false;
            });
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
        }
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
        try {
            if (this.dealer.hiddenCard) {
                this.isAnimating = true;
                await game.showHiddenCard(this.dealer.hiddenCard);
                runInAction(() => {
                    this.dealer.hiddenCard = null;
                    this.isAnimating = false;
                });
            }
        } catch (err) {
            this.isAnimating = false;
        }
    },
    async returnCardsToDeck(): Promise<void> {
        this.isAnimating = true;
        try {
            await game.returnAllCardsInGame(this.cardsInGame, this.deck);
            runInAction(() => {
                this.cardIdx = 0;
                this.players.forEach((player) => {
                    player.cards = [];
                    player.points = 0;
                    player.bet = 0;
                });
                this.dealer.cards = [];
                this.dealer.points = 0;
                this.isAnimating = false;
            });
        } catch (err) {
            this.isAnimating = false;
        }
    },

    clearBet() {
        this.players[0].bet = 0;
        this.players[0].money = 100;
    },
}, {});
