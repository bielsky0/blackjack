import React from "react";
// import ReactDOM from "react-dom";
// import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";
import { GameState } from "../../store/type";

import "./menu.css";

export function Menu(): JSX.Element {
    const onNewGame = React.useCallback(async () => {
        await gameStore.shuffleDeck();
        gameStore.changeState(GameState.Betting);
    }, []);
    return (
    // ReactDOM.createPortal(
        <div className="menu-wrapper">
            <div className="content-wrapper">

                <div className="stitle-wrapper">
                    <span className="menu-wrapper__title">BLACKJACK</span>
                </div>
                <div className="card-wrapper">
                    <div className="card first">
                        <div className="corner">J</div>
                        <div className="center heart" />
                        <div className="corner c2">J</div>
                    </div>

                    <div className="card second">
                        <div className="corner">A</div>
                        <div className="center heart" />
                        <div className="corner c2">A</div>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button className="play-btn" onClick={onNewGame}>
                        PLAY
                    </button>
                </div>
            </div>
        </div>
    // document.body)
    );
}
