import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";

export const Draw = () => {
    const onNewGame = React.useCallback(async () => {
        await gameStore.returnCardsToDeck();
        await gameStore.shuffleDeck();
        gameStore.changeState("betting");
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
};
