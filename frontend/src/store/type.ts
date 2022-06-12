import { Vector3 } from "@babylonjs/core";
import { Card } from "../common/engine/cards/card";

export interface Player {
    cards: Card[];
    position: Vector3;
    points: number;
    money: number;
    bet: number;
    split: SplittedArray;
    splitIdx: 0 | 1;
}

// add and move first card to first array
// add new car to first array
// add and move second card to second array
// add new car to second array

// if stand or lose
// replace first array with second array

// new Vector3(-2, 0.2, -4)
// new Vector3(0.5, 0.2, 0)

export interface SplittedObject {
    cards: Card[];
    position: Vector3;
    state: "win" | "lose" | "playing" | "stand" | "finished";
    points: number;

}

export type SplittedArray = [SplittedObject, SplittedObject];
export interface Dealer {
    cards: Card[];
    position: Vector3;
    points: number;
    hiddenCard: null | Card;
}

export enum GameState {
    Playing,
    DealerWon,
    PlayerWon,
    Menu,
    Betting,
    Lose,
    Push,
    Splitting,
    PlayerWonSplit,
    DealerWonSplit,
    PushSplit,
}

export interface GameStore {
    isAnimating: boolean;
    gameState: GameState;
    deck: Array<Card>;
    cardsInGame: Array<Card>;
    cardIdx: number;
    dealer: Dealer;
    players: Player[];
    onSplitDouble: () => Promise<void>;
    swapSplittedArray: (flag: 0 | 1) => Promise<void>;
    checkSplit: () => void;
    onSplittingStand: () => Promise<void>;
    addCardToSplittedPosition: (player: Player, splittedIdx: 0 | 1) => Promise<void>;
    addCardToCurrentSplittedPosition: (player: Player) => Promise<void>;
    split: () => Promise<void>;
    onDouble: () => Promise<void>;
    onStand: () => Promise<void>;
    showHiddenCard: () => Promise<void>;
    addBet: (money: number) => void;
    addHiddenCard: (player: Dealer) => Promise<void>;
    shuffleDeck: () => Promise<void>;
    addCardToPlayer: (player: Player | Dealer) => Promise<void>;
    returnCardsToDeck: () => Promise<void>;
    changeState: (newState: GameState) => void;
    clearBet: () => void;
}
