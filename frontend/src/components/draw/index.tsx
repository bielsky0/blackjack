import React from "react";
import { gameStore } from "../../store/gameStore";

export const Draw = () => {
    const onNewGame = React.useCallback(async () => {
        await gameStore.returnCardsToDeck();
        gameStore.shuffleDeck();
        gameStore.changeState("betting");
    }, []);
    return (
        <div>
            <span>{gameStore.dealer.points} </span>
            <span>{gameStore.players[0].points}</span>
            <span>Draw</span>
            <button onClick={onNewGame}>New Game</button>
        </div>
    );
};
