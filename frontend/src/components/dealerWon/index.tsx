import { observer } from "mobx-react-lite";
import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";

import "./styles.css";

export const DealerWon = observer((): JSX.Element => {
    const onNewGame = React.useCallback(async () => {
        if (gameStore.gameState === "dealerWonSplit") {
            if (gameStore.players[0].split[0].state === "finished" && gameStore.players[0].split[1].state === "finished") {
                gameStore.changeState("betting");
                await gameStore.returnCardsToDeck();
                await gameStore.shuffleDeck();
            } else {
                if (gameStore.players[0].splitIdx === 0) {
                    console.log("2");

                    await gameStore.swapSplittedArray(1);
                }
                gameStore.checkSplit();
            }
        } else {
            gameStore.changeState("betting");
            await gameStore.returnCardsToDeck();
            await gameStore.shuffleDeck();
        }
    }, []);

    const onLose = React.useCallback(() => {
        gameStore.changeState("lose");
    }, []);
    return (
        ReactDOM.createPortal(
            <div key={Math.random()} className="dealer_won-wrapper" onClick={gameStore.players[0].money > 0 ? onNewGame : onLose}>

                <div className="title-wrapper">
                    <span className="dealer_won-wrapper__title">Dealer won!</span>
                </div>

            </div>, document.body)
    );
});
