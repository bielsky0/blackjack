import { observer } from "mobx-react-lite";
import React from "react";
import { gameStore } from "../../store/gameStore";

import { isDealBtnDisabled, isSplitBtnDisabled, isActionBtnDisabled } from "./utils";

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
        if (gameStore.gameState === "splitting") {
            await gameStore.addCardToCurrentSplittedPosition(gameStore.players[0]);
        } else {
            await gameStore.addCardToPlayer(gameStore.players[0]);

            if (gameStore.players[0].points > 21) {
                gameStore.changeState("dealerWon");
                await gameStore.showHiddenCard();
            }
        }
    }, []);

    const onSplit = React.useCallback(async () => {
        gameStore.changeState("splitting");
        await gameStore.split();
        await gameStore.addCardToSplittedPosition(gameStore.players[0], 0);
        await gameStore.addCardToSplittedPosition(gameStore.players[0], 1);
    }, []);

    const onStand = React.useCallback(async () => {
        if (gameStore.gameState === "splitting") {
            await gameStore.onSplittingStand();
        } else {
            await gameStore.onStand();
        }
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
                    disabled={isDealBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].bet)}
                    onClick={onDeal}
                    style={{ backgroundImage: `url(${darkButton})` }}
                    className={`button 
                        ${isDealBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].bet) ? "disabled" : ""} `}
                >
                    <div className="shine">Deal</div>
                </button>

                <button
                    disabled={isActionBtnDisabled(gameStore.gameState, gameStore.isAnimating)}
                    onClick={onAddCardToPlayer}
                    style={{ backgroundImage: `url(${greenButton})` }}
                    className={`button ${isActionBtnDisabled(gameStore.gameState, gameStore.isAnimating) ? "disabled" : ""} `}
                >
                    <div className="shine">Hit</div>
                </button>
                <button
                    disabled={isActionBtnDisabled(gameStore.gameState, gameStore.isAnimating)}
                    onClick={onDouble}
                    style={{ backgroundImage: `url(${darkButton})` }}
                    className={`button ${isActionBtnDisabled(gameStore.gameState, gameStore.isAnimating) ? "disabled" : ""} `}
                >
                    <div className="shine">Double</div>
                </button>
                <button
                    disabled={isActionBtnDisabled(gameStore.gameState, gameStore.isAnimating)}
                    onClick={onStand}
                    style={{ backgroundImage: `url(${redButton})` }}
                    className={`button ${isActionBtnDisabled(gameStore.gameState, gameStore.isAnimating) ? "disabled" : ""} `}
                >
                    <div className="shine">Stand</div>
                </button>
                <button
                    disabled={isSplitBtnDisabled(gameStore.players[0].cards)}
                    onClick={onSplit}
                    style={{ backgroundImage: `url(${redButton})` }}
                    className={`button ${isSplitBtnDisabled(gameStore.players[0].cards) ? "disabled" : ""} `}
                >
                    <div className="shine">Split</div>
                </button>
            </div>
        </div>
    );
});
