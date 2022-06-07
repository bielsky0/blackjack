import { observer } from "mobx-react-lite";
import React from "react";

import { gameStore } from "../../store/gameStore";

import darkButton from "../../assets/buttons/dark-button-texture.png";

import "./styles.css";

export const BettingButtons = observer(() => {
    const onAddBet = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.dataset.bet) { gameStore.addBet(Number(e.currentTarget.dataset.bet)); }
    }, []);

    const onClear = React.useCallback(() => {
        gameStore.clearBet();
    }, []);

    return (
        <div className="left-wrapper">
            <div className="chips-wrapper">
                <div className="chip-wrapper">
                    <button
                        disabled={gameStore.players[0].money < 0.1 || gameStore.gameState !== "betting" || gameStore.isAnimating}
                        onClick={onAddBet}
                        data-bet={0.1}
                        className={`chip white ${gameStore.players[0].money < 0.1 || gameStore.gameState
                !== "betting" ? "disabled" : ""} `}
                    />
                    <div className="bet">0.1$</div>
                </div>

                <div className="chip-wrapper">
                    <button
                        disabled={gameStore.players[0].money < 1 || gameStore.gameState !== "betting" || gameStore.isAnimating}
                        onClick={onAddBet}
                        data-bet={1}
                        className={`chip red ${gameStore.players[0].money < 10 || gameStore.gameState
                !== "betting" ? "disabled" : ""} `}
                    />
                    <div className="bet">1$</div>
                </div>

                <div className="chip-wrapper">
                    <button
                        disabled={gameStore.players[0].money < 5 || gameStore.gameState !== "betting" || gameStore.isAnimating}
                        onClick={onAddBet}
                        data-bet={5}
                        className={`chip blue ${gameStore.players[0].money < 5 || gameStore.gameState
                !== "betting" ? "disabled" : ""} `}
                    />
                    <div className="bet">5$</div>
                </div>

                <div className="chip-wrapper">
                    <button
                        disabled={gameStore.players[0].money < 10 || gameStore.gameState !== "betting" || gameStore.isAnimating}
                        onClick={onAddBet}
                        data-bet={10}
                        className={`chip black ${gameStore.players[0].money < 10 || gameStore.gameState
                !== "betting" ? "disabled" : ""} `}
                    />
                    <div className="bet">10$</div>
                </div>
            </div>

            <div className="clear-wrapper">
                <button
                    disabled={gameStore.gameState !== "betting" || gameStore.isAnimating}
                    onClick={onClear}
                    style={{ backgroundImage: `url(${darkButton})` }}
                    className={`button ${gameStore.gameState !== "betting" ? "disabled" : ""} `}
                >
                    <div className="clear">CLEAR</div>
                </button>
            </div>
        </div>
    );
});
