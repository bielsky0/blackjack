import { makeAutoObservable, runInAction } from "mobx";
import { Vector3 } from "@babylonjs/core";
import { Dealer, GameState, GameStore, Player } from "./type";

import { Points } from "../common/consts/types";

import { game } from "../common";

// new Vector3(-2, 0.2, -4)
// new Vector3(0.5, 0.2, 0)

export const gameStore = makeAutoObservable<GameStore>({
    isAnimating: false,
    cardIdx: 0,
    gameState: "menu",
    deck: game.createCards(),
    cardsInGame: [],
    dealer: {
        cards: [],
        position: new Vector3(0.5, 0.15, 3),
        points: 0,
        hiddenCard: null,
    },
    players: [
        {
            cards: [],
            position: new Vector3(0.5, 0.15, -3),
            points: 0,
            money: 100,
            bet: 0,
            splitIdx: 0,
            split: [{ cards: [], position: new Vector3(0.5, 0.15, 0), state: "playing", points: 0 },
                { cards: [], position: new Vector3(-2, 0.15, -4), state: "playing", points: 0 }],
        }],
    async swapSplittedArray(flag: 0 | 1) {
        this.isAnimating = true;
        try {
            await game.swapSplittedArray(this.players[0].split, flag);
            runInAction(() => {
                this.isAnimating = false;
            });
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
        }
    },
    async addCardToSplittedPosition(player: Player, splittedIdx: 0 | 1) {
        this.isAnimating = true;
        try {
            const card = this.deck[this.cardIdx];
            await game.addCardToSplittedPosition(player, card, splittedIdx);

            runInAction(() => {
                player.split[splittedIdx].cards.push(card);
                player.split[splittedIdx].points += Points[card.value];
                this.cardIdx++;
                this.cardsInGame.push(card);
            });
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
        }
    },
    checkSplit() {
        if (this.players[0].split[this.players[0].splitIdx].points > 21) {
            this.changeState("dealerWonSplit");
            this.players[0].split[this.players[0].splitIdx].state = "finished";
        } else if (this.dealer.points > 21) {
            this.changeState("playerWonSplit");
            this.players[0].split[this.players[0].splitIdx].state = "finished";

            this.players[0].money += this.players[0].bet * 2;
        } else {
            if (this.players[0].split[this.players[0].splitIdx].points > this.dealer.points) {
                this.changeState("playerWonSplit");
                this.players[0].split[this.players[0].splitIdx].state = "finished";
                this.players[0].money += this.players[0].bet * 2;
            }
            if (this.dealer.points > this.players[0].split[this.players[0].splitIdx].points) {
                this.changeState("dealerWonSplit");
                this.players[0].split[this.players[0].splitIdx].state = "finished";
            }

            if (this.dealer.points === this.players[0].split[this.players[0].splitIdx].points) {
                this.changeState("drawSplit");
                this.players[0].split[this.players[0].splitIdx].state = "finished";
                this.players[0].money += this.players[0].bet;
            }
        }

        this.players[0].splitIdx = 0;
    },

    async addCardToCurrentSplittedPosition(player: Player) {
        this.isAnimating = true;
        try {
            const card = this.deck[this.cardIdx];
            await game.addCardToCurrentSplittedPosition(player, card);

            player.split[player.splitIdx].cards.push(card);
            player.split[player.splitIdx].points += Points[card.value];
            this.cardIdx++;
            this.cardsInGame.push(card);
            if (player.split[player.splitIdx].points > 21) {
                player.split[player.splitIdx].state = "lose";
                player.splitIdx = 1;

                if (player.split[0].state !== "playing" && player.split[1].state !== "playing") {
                    // do end splitting
                    await this.showHiddenCard();
                    while (
                        this.dealer.points <= 17

                    ) {
                        await this.addCardToPlayer(this.dealer);
                    }
                    this.checkSplit();
                } else {
                    await this.swapSplittedArray(0);
                }
            }

            runInAction(() => {
                this.isAnimating = false;
            });
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
        }
    },
    async split() {
        this.isAnimating = true;
        try {
            await game.split(this.players[0]);

            runInAction(() => {
                this.players[0].split[0].cards.push(this.players[0].cards[0]);
                this.players[0].split[1].cards.push(this.players[0].cards[1]);
                this.players[0].split[0].points += Points[this.players[0].cards[0].value];
                this.players[0].split[1].points += Points[this.players[0].cards[1].value];

                this.isAnimating = false;
            });
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
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

    async onDouble() {
        this.isAnimating = true;
        try {
            this.addBet(this.players[0].bet);

            await this.addCardToPlayer(this.players[0]);

            await this.showHiddenCard();
            while (
                this.dealer.points < this.players[0].points &&
                this.players[0].points <= 21 &&
                this.dealer.points <= 21
            ) {
                await this.addCardToPlayer(this.dealer);
            }

            runInAction(() => {
                if (this.players[0].points > 21) {
                    this.changeState("dealerWon");
                } else if (this.dealer.points > 21) {
                    this.changeState("playerWon");
                    this.players[0].money += this.players[0].bet * 2;
                } else {
                    if (this.players[0].points > this.dealer.points) {
                        this.changeState("playerWon");
                        this.players[0].money += this.players[0].bet * 2;
                    }

                    if (this.dealer.points > this.players[0].points) {
                        this.changeState("dealerWon");
                    }

                    if (this.dealer.points === this.players[0].points) {
                        this.changeState("draw");
                        this.players[0].money += this.players[0].bet;
                    }
                }
            });
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
        }
    },

    async onSplittingStand() {
        this.isAnimating = true;
        try {
            this.players[0].split[this.players[0].splitIdx].state = "stand";
            this.players[0].splitIdx = 1;
            if (this.players[0].split[0].state !== "playing" && this.players[0].split[1].state !== "playing") {
                // do end splitting
                await this.showHiddenCard();
                while (
                    this.dealer.points <= 17
                    // this.players[0].points <= 21 &&
                    // this.dealer.points <= 21
                ) {
                    await this.addCardToPlayer(this.dealer);
                }
                this.checkSplit();
            } else {
                await this.swapSplittedArray(0);
            }
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
        }
    },

    async onStand() {
        this.isAnimating = true;
        try {
            await this.showHiddenCard();
            while (
                this.dealer.points < this.players[0].points &&
                this.players[0].points <= 21 &&
                this.dealer.points <= 21
            ) {
                await this.addCardToPlayer(this.dealer);
            }

            runInAction(() => {
                if (this.players[0].points > 21) {
                    this.changeState("dealerWon");
                } else if (this.dealer.points > 21) {
                    this.changeState("playerWon");
                    this.players[0].money += this.players[0].bet * 2;
                } else {
                    if (this.players[0].points > this.dealer.points) {
                        this.changeState("playerWon");
                        this.players[0].money += this.players[0].bet * 2;
                    }

                    if (this.dealer.points > this.players[0].points) {
                        this.changeState("dealerWon");
                    }

                    if (this.dealer.points === this.players[0].points) {
                        this.changeState("draw");
                        this.players[0].money += this.players[0].bet;
                    }
                }
            });
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
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
            if (player.points > 21) {
                this.changeState("dealerWon");
                await this.showHiddenCard();
            }
        } catch (err) {
            runInAction(() => {
                this.isAnimating = false;
            });
        }
    },
    changeState(newState: GameState) {
        this.isAnimating = true;
        this.isAnimating = false;
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
                    player.split.forEach((split) => {
                        split.state = "playing";
                        split.points = 0;
                        split.cards = [];
                    });
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

// function timeout(): Promise<void> {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 2000);
//     });
// }
