import { observer } from "mobx-react-lite";
import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";

import "./styles.css";

export const Draw = observer(() => {
    const onNewGame = React.useCallback(async () => {
        gameStore.changeState("betting");
        await gameStore.returnCardsToDeck();
        await gameStore.shuffleDeck();
    }, []);
    return (
        ReactDOM.createPortal(
            <div className="draw-wrapper" onClick={onNewGame}>
                <div className="title-wrapper">
                    <span className="draw-wrapper__title">Draw!</span>
                </div>
            </div>,
            document.body)
    );
});
