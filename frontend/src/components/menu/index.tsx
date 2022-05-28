import React from "react";
// import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";

import "./menu.css";

export function Menu(): JSX.Element {
    const onNewGame = React.useCallback(async () => {
        await gameStore.shuffleDeck();
        gameStore.changeState("betting");
    }, []);
    return (
    // ReactDOM.createPortal(
        <div className="menu-wrapper" onClick={onNewGame}>
            <div className="title-wrapper">
                <span className="menu-wrapper__title">New Game</span>
            </div>
        </div>
    //  document.body)
    );
}
