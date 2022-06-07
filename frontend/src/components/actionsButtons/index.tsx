import { observer } from "mobx-react-lite";
import React from "react";
import { gameStore } from "../../store/gameStore";

import darkButton from "../../assets/buttons/dark-button-texture.png";

import redButton from "../../assets/buttons/red-button-texture.png";
import greenButton from "../../assets/buttons/green-button-texture.png";

export const ActionsButton = observer(() => {
    const onDeal = React.useCallback(async () => {
        gameStore.changeState("playing");
        await gameStore.addCardToPlayer(gameStore.players[0]);
        await gameStore.addCardToPlayer(gameStore.players[0]);

        await gameStore.addCardToPlayer(gameStore.dealer);
        await gameStore.addHiddenCard(gameStore.dealer);
    }, []);

    const onDouble = React.useCallback(async () => {
        await gameStore.onDouble();
    }, []);

    const onAddCardToPlayer = React.useCallback(async () => {
        await gameStore.addCardToPlayer(gameStore.players[0]);

        if (gameStore.players[0].points > 21) {
            gameStore.changeState("dealerWon");
            await gameStore.showHiddenCard();
        }
    }, []);

    const onStand = React.useCallback(async () => {
        await gameStore.onStand();
    }, []);
    return (
        <div className="rigth-wrapper">

            <div className="money-wrapper">
                <div className="bet-wrapper">
                    <span className="bet-wrapper__title">Bet:</span>
                    <span className="bet-wrapper__value">{gameStore.players[0].bet}$</span>
                </div>

                <div className="balance-wrapper">
                    <span className="balance-wrapper__title">Balance:</span>
                    <span className="balance-wrapper__value">{gameStore.players[0].money}$</span>
                </div>
            </div>
            <div>
                <button
                    disabled={gameStore.gameState !== "betting" || gameStore.players[0].bet <= 0 || gameStore.isAnimating}
                    onClick={onDeal}
                    style={{ backgroundImage: `url(${darkButton})` }}
                    className={`button ${gameStore.players[0].bet <= 0 || gameStore.gameState !== "betting" ? "disabled" : ""} `}
                >
                    <div className="shine">Deal</div>
                </button>

                <button
                    disabled={gameStore.gameState !== "playing" || gameStore.isAnimating}
                    onClick={onAddCardToPlayer}
                    style={{ backgroundImage: `url(${greenButton})` }}
                    className={`button ${gameStore.gameState !== "playing" ? "disabled" : ""} `}
                >
                    <div className="shine">Hit</div>
                </button>
                <button
                    disabled={gameStore.gameState !== "playing" || gameStore.isAnimating}
                    onClick={onDouble}
                    style={{ backgroundImage: `url(${darkButton})` }}
                    className={`button ${gameStore.gameState !== "playing" ? "disabled" : ""} `}
                >
                    <div className="shine">Double</div>
                </button>
                <button
                    disabled={gameStore.gameState !== "playing" || gameStore.isAnimating}
                    onClick={onStand}
                    style={{ backgroundImage: `url(${redButton})` }}
                    className={`button ${gameStore.gameState !== "playing" ? "disabled" : ""} `}
                >
                    <div className="shine">Stand</div>
                </button>
            </div>
        </div>
    );
});
