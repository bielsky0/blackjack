import { Card } from "../../../common/engine/cards/card";
import { GameState } from "../../../store/type";

export function isDealBtnDisabled(gameState: GameState, isAnimating: boolean, bet: number): boolean {
    return !(gameState === GameState.Betting && bet > 0 && isAnimating === false);
}

export function isSplitBtnDisabledProperty(gameState: GameState, playerCards: Card[], isAnimating: boolean): boolean {
    if (playerCards.length < 2) {
        return true;
    }

    return !(isAnimating === false && gameState === GameState.Playing);
}

export function isSplitBtnDisabled(gameState: GameState, playerCards: Card[]): boolean {
    if (playerCards.length < 2) {
        return true;
    }

    return !(gameState === GameState.Playing && (playerCards[0].value !== playerCards[1].value));
}

export function isActionBtnDisabledProperty(gameState: GameState, isAnimating: boolean): boolean {
    return !((gameState === GameState.Playing || gameState === GameState.Splitting) && isAnimating === false);
}

export function isActionBtnDisabled(gameState: GameState): boolean {
    return !((gameState === GameState.Playing || gameState === GameState.Splitting));
}

export function isDoubleBtnDisabledProperty(gameState: GameState, isAnimating: boolean, playerCards: Card[]): boolean {
    return !((gameState === GameState.Playing || gameState === GameState.Splitting) && isAnimating === false) || (playerCards.length > 2);
}

export function isDoubleBtnDisabled(gameState: GameState, playerCards: Card[]): boolean {
    return !((gameState === GameState.Playing || gameState === GameState.Splitting)) || (playerCards.length > 2);
}

export function isDoubleBtnVisiable(gameState: GameState, playerCards: Card[]): string {
    return !((gameState === GameState.Playing || gameState === GameState.Splitting)) || (playerCards.length > 2) ? "disappear" : "appear";
}

export function isDealBtnVisiable(gameState: GameState, bet: number): string {
    console.log(gameState !== GameState.Betting || bet <= 0 ? "disappear" : "appear");
    return gameState !== GameState.Betting || bet <= 0 ? "disappear" : "appear";
}

export function isActionBtnVisiable(gameState: GameState): string {
    return !(gameState === GameState.Playing || gameState === GameState.Splitting) ? "disappear" : "appear";
}

export function isSplitBtnVisiable(gameState: GameState, playerCards: Card[]): string {
    if (playerCards.length < 2) {
        return "disappear";
    }

    return !(gameState === GameState.Playing && playerCards.length === 2
        && (playerCards[0].value === playerCards[1].value)) ? "disappear" : "appear";
}
