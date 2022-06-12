import { GameState } from "../../../store/type";

export function isClearBtnDisabled(gameState: GameState, isAnimating: boolean, bet: number): boolean {
    return gameState !== GameState.Betting || bet <= 0 || isAnimating;
}

export function isChipBtnDisabled(gameState: GameState, isAnimating: boolean, money: number, chipValue: number): boolean {
    return money < chipValue || gameState !== GameState.Betting || isAnimating;
}
