import { observer } from "mobx-react-lite";
import React from "react";

import { gameStore } from "../../store/gameStore";

import {
    isChipBtnDisabled,
} from "./utils";

import "./styles.css";

import { ActionsButton } from "../actionsButtons";

export const BettingButtons = observer(() => {
    const onAddBet = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.dataset.bet) { gameStore.addBet(Number(e.currentTarget.dataset.bet)); }
    }, []);

    // const onClear = React.useCallback(() => {
    //     gameStore.clearBet();
    // }, []);

    return (
        <div className="left-wrapper">
            <ActionsButton />
            <div className="item1">
                <div className="chip-wrapper">
                    <button
                        disabled={isChipBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].money, 0.1)}
                        onClick={onAddBet}
                        data-bet={0.1}
                        className={`chip white
                        ${isChipBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].money, 0.1)
                            ? "disabled" : ""} `}
                    />
                </div>
            </div>
            {/* <ActionsButton /> */}
            <div className="item1">
                <div className="chip-wrapper">
                    <button
                        disabled={isChipBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].money, 1)}
                        onClick={onAddBet}
                        data-bet={1}
                        className={`chip red
                        ${isChipBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].money, 1)
                            ? "disabled" : ""} `}
                    />
                </div>
            </div>
            <div className="item1">
                <div className="chip-wrapper">
                    <button
                        disabled={isChipBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].money, 5)}
                        onClick={onAddBet}
                        data-bet={5}
                        className={`chip blue
                        ${isChipBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].money, 5)
                            ? "disabled" : ""} `}
                    />
                </div>
            </div>
            <div className="item1">
                <div className="chip-wrapper">
                    <button
                        disabled={isChipBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].money, 10)}
                        onClick={onAddBet}
                        data-bet={10}
                        className={`chip green
                        ${isChipBtnDisabled(gameStore.gameState, gameStore.isAnimating, gameStore.players[0].money, 10)
                            ? "disabled" : ""} `}
                    />
                </div>
            </div>

        </div>
    );
});
