import { observer } from "mobx-react-lite";
import React from "react";
import { gameStore } from "../../store/gameStore";

import {
    isDealBtnDisabled,
    isSplitBtnDisabled,
    isActionBtnDisabled,
    isDoubleBtnDisabled,
    isActionBtnDisabledProperty,
    isDoubleBtnDisabledProperty,
    isSplitBtnDisabledProperty,
    isDealBtnVisiable,
    isDoubleBtnVisiable,
    isActionBtnVisiable,
    isSplitBtnVisiable,
} from "./utils";

import darkButton from "../../assets/buttons/dark-button-texture.png";

import redButton from "../../assets/buttons/red-button-texture.png";
import greenButton from "../../assets/buttons/green-button-texture.png";
import { GameState } from "../../store/type";

import "./styles.css";

export const ActionsButton = observer(() => {
    const onDeal = React.useCallback(async () => {
        gameStore.changeState(GameState.Playing);
        await gameStore.addCardToPlayer(gameStore.players[0]);
        await gameStore.addCardToPlayer(gameStore.players[0]);

        await gameStore.addCardToPlayer(gameStore.dealer);
        await gameStore.addHiddenCard(gameStore.dealer);
    }, []);

    const onDouble = React.useCallback(async () => {
        if (gameStore.gameState === GameState.Splitting) {
            await gameStore.onSplitDouble();
        } else {
            await gameStore.onDouble();
        }
    }, []);

    const onAddCardToPlayer = React.useCallback(async () => {
        if (gameStore.gameState === GameState.Splitting) {
            await gameStore.addCardToCurrentSplittedPosition(gameStore.players[0]);
        } else {
            await gameStore.addCardToPlayer(gameStore.players[0]);

            if (gameStore.players[0].points > 21) {
                gameStore.changeState(GameState.DealerWon);
                await gameStore.showHiddenCard();
            }
        }
    }, []);

    const onSplit = React.useCallback(async () => {
        gameStore.changeState(GameState.Splitting);
        await gameStore.split();
        await gameStore.addCardToSplittedPosition(gameStore.players[0], 0);
        await gameStore.addCardToSplittedPosition(gameStore.players[0], 1);
    }, []);

    const onStand = React.useCallback(async () => {
        if (gameStore.gameState === GameState.Splitting) {
            await gameStore.onSplittingStand();
        } else {
            await gameStore.onStand();
        }
    }, []);

    return (
        <div className="item2 action-wrapper">
            <div className="primary-buttons__wrapper">
                <button
                    disabled={isDealBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].bet)}
                    onClick={onDeal}
                    style={{ backgroundImage: `url(${darkButton})` }}
                    className={`button 
                    ${isDealBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].bet) ? "disabled" : ""}
                        ${isDealBtnVisiable(gameStore.gameState, gameStore.players[0].bet)}
                    `}
                >
                    <div className="shine">Deal</div>
                </button>

                <button
                    disabled={isActionBtnDisabledProperty(gameStore.gameState, gameStore.isAnimating)}
                    onClick={onAddCardToPlayer}
                    style={{ backgroundImage: `url(${greenButton})` }}
                    className={`button ${isActionBtnDisabled(gameStore.gameState) ? "disabled" : ""} 
                        ${isActionBtnVisiable(gameStore.gameState)}
                    `}
                >
                    <div className="shine">Hit</div>
                </button>

                <button
                    disabled={isActionBtnDisabledProperty(gameStore.gameState, gameStore.isAnimating)}
                    onClick={onStand}
                    style={{ backgroundImage: `url(${redButton})` }}
                    className={`button ${isActionBtnDisabled(gameStore.gameState) ? "disabled" : ""}
                    ${isActionBtnVisiable(gameStore.gameState)}
                    `}
                >
                    <div className="shine">Stand</div>
                </button>
            </div>

            <div className="secondary-buttons__wrapper">
                <button
                    disabled={isSplitBtnDisabledProperty(gameStore.gameState, gameStore.players[0].cards, gameStore.isAnimating)}
                    onClick={onSplit}
                    style={{ backgroundImage: `url(${redButton})` }}
                    className={`button ${isSplitBtnDisabled(gameStore.gameState, gameStore.players[0].cards) ? "disabled" : ""} 
                        ${isSplitBtnVisiable(gameStore.gameState, gameStore.players[0].cards)}
                    `}
                >
                    <div className="shine">Split</div>
                </button>

                <button
                    disabled={isDoubleBtnDisabledProperty(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].cards)}
                    onClick={onDouble}
                    style={{ backgroundImage: `url(${darkButton})` }}
                    className={`button
                 ${isDoubleBtnDisabled(gameStore.gameState, gameStore.players[0].cards) ? "disabled" : ""}
                    ${isDoubleBtnVisiable(gameStore.gameState, gameStore.players[0].cards)}
                 `}
                >
                    <div className="shine">Double</div>
                </button>
            </div>
        </div>
    );
});
