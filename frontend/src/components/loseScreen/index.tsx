import { observer } from "mobx-react-lite";
import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";
import { GameState } from "../../store/type";

import "./styles.css";

export const LoseScreen = observer(() => {
    const onLose = React.useCallback(async () => {
        gameStore.changeState(GameState.Betting);
        await gameStore.returnCardsToDeck();
        await gameStore.shuffleDeck();
        gameStore.players[0].money = 100;
    }, []);
    return (
        ReactDOM.createPortal(
            <div className="lose_screen-wrapper" onClick={onLose}>
                <div className="lose_screen-title_wrapper">
                    <span className="lose_screen-wrapper__title">You are out of credits!</span>
                </div>
            </div>, document.body)
    );
});
