import { observer } from "mobx-react-lite";
import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";
import { GameState } from "../../store/type";

import "./styles.css";

export const Draw = observer(() => {
    console.log(gameStore.players[0].splitIdx);

    const onNewGame = React.useCallback(async () => {
        if (gameStore.gameState === GameState.PushSplit) {
            if (gameStore.players[0].split[0].state === "finished" && gameStore.players[0].split[1].state === "finished") {
                gameStore.changeState(GameState.Betting);
                await gameStore.returnCardsToDeck();
                await gameStore.shuffleDeck();
            } else {
                if (gameStore.players[0].splitIdx === 0) {
                    await gameStore.swapSplittedArray(1);
                }
                gameStore.checkSplit();
            }
        } else {
            gameStore.changeState(GameState.Betting);
            await gameStore.returnCardsToDeck();
            gameStore.shuffleDeck();
        }
    }, []);
    return (
        ReactDOM.createPortal(
            <div key={Math.random()} className="draw-wrapper" onClick={onNewGame}>
                <div className="title-wrapper">
                    <span className="draw-wrapper__title">Push!</span>
                </div>
            </div>,
            document.body)
    );
});
