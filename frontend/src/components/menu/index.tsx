import React from "react";
import { gameStore } from "../../store/gameStore";

export function Menu(): JSX.Element {
    const onNewGame = React.useCallback(async () => {
        await gameStore.shuffleDeck();
        gameStore.changeState("betting");
    }, []);
    return <button onClick={onNewGame}>New Game</button>;
}
