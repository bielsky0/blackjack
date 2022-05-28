import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";

import "./styles.css";

export function PlayerWon(): JSX.Element {
    const onNewGame = React.useCallback(async () => {
        gameStore.changeState("betting");
        await gameStore.returnCardsToDeck();
        gameStore.shuffleDeck();
    }, []);
    return (
        ReactDOM.createPortal(
            <div className="player_won-wrapper" onClick={onNewGame}>
                <div className="title-wrapper">
                    <span className="player_won-wrapper__title">You won!</span>
                </div>
            </div>,
            document.body)

    );
}
