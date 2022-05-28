import { Vector3 } from "@babylonjs/core";
import { Card } from "../common/engine/cards/card";

export interface Player {
    cards: Card[];
    position: Vector3;
    points: number;
    money: number;
    bet: number;
}

export interface Dealer {
    cards: Card[];
    position: Vector3;
    points: number;
    hiddenCard: null | Card;
}
export type GameState = "playing" | "dealerWon" | "playerWon" | "menu" | "betting" | "lose" | "draw";
export interface GameStore {
    isAnimating: boolean;
    gameState: GameState;
    deck: Array<Card>;
    cardsInGame: Array<Card>;
    cardIdx: number;
    dealer: Dealer;
    players: Player[];
    showHiddenCard: () => Promise<void>;
    addBet: (money: number) => void;
    addHiddenCard: (player: Dealer) => Promise<void>;
    shuffleDeck: () => Promise<void>;
    addCardToPlayer: (player: Player | Dealer) => Promise<void>;
    returnCardsToDeck: () => Promise<void>;
    changeState: (newState: GameState) => void;
    clearBet: () => void;
}
