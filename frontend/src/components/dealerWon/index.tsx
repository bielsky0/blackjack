import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";

import "./styles.css";

export function DealerWon(): JSX.Element {
    const onNewGame = React.useCallback(async () => {
        gameStore.changeState("betting");
        await gameStore.returnCardsToDeck();
        await gameStore.shuffleDeck();
    }, []);

    const onLose = React.useCallback(() => {
        gameStore.changeState("lose");
    }, []);
    return (
        ReactDOM.createPortal(
            <div className="dealer_won-wrapper" onClick={gameStore.players[0].money > 0 ? onNewGame : onLose}>

                <div className="title-wrapper">
                    <span className="dealer_won-wrapper__title">Dealer won!</span>
                </div>

            </div>, document.body)
    );
}
