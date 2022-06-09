import { observer } from "mobx-react-lite";
import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";

import "./styles.css";

export const PlayerWon = observer(() => {
    const onNewGame = React.useCallback(async () => {
        if (gameStore.gameState === "playerWonSplit") {
            if (gameStore.players[0].split[0].state === "finished" && gameStore.players[0].split[1].state === "finished") {
                gameStore.changeState("betting");
                await gameStore.returnCardsToDeck();
                await gameStore.shuffleDeck();
            } else {
                if (gameStore.players[0].splitIdx === 0) {
                    await gameStore.swapSplittedArray(1);
                    console.log("2");
                }
                gameStore.checkSplit();
            }
        } else {
            gameStore.changeState("betting");
            await gameStore.returnCardsToDeck();
            gameStore.shuffleDeck();
        }
    }, []);
    return (
        ReactDOM.createPortal(
            <div key={Math.random()} className="player_won-wrapper" onClick={onNewGame}>
                <div className="title-wrapper">
                    <span className="player_won-wrapper__title">You won!</span>
                </div>
            </div>,
            document.body)

    );
});
