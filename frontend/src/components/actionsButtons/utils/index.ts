import { Card } from "../../../common/engine/cards/card";
import { GameState } from "../../../store/type";

export function isDealBtnDisabled(gameState: GameState, isAnimating: boolean, bet: number): boolean {
    return gameState !== "betting" || bet <= 0 || isAnimating;
}

export function isSplitBtnDisabled(playerCards: Card[]): boolean {
    if (playerCards.length < 2) {
        return true;
    }

    return playerCards[0].value !== playerCards[1].value;
}

export function isActionBtnDisabled(gameState: GameState, isAnimating: boolean): boolean {
// gameStore.gameState !== "playing" || gameStore.isAnimating || gameStore.gameState !== "splitting"

    return !(gameState === "playing" || gameState === "splitting" || isAnimating);
    // (gameState !== "playing" || gameState !== "splitting") || isAnimating;
}
