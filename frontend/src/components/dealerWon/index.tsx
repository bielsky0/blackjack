import React from "react";
import { gameStore } from "../../store/gameStore";

export function DealerWon(): JSX.Element {
    const onNewGame = React.useCallback(async () => {
        await gameStore.returnCardsToDeck();
        gameStore.shuffleDeck();
        gameStore.changeState("betting");
    }, []);

    const onLose = React.useCallback(async () => {
        await gameStore.returnCardsToDeck();
        gameStore.shuffleDeck();
        gameStore.changeState("betting");
        gameStore.players[0].money = 100;
    }, []);
    return (
        <div>
            {gameStore.players[0].money > 0 ? (
                <div>
                    <span>{gameStore.dealer.points} </span>
                    <span>{gameStore.players[0].points}</span>
                    <span>You lose!</span>
                    <button onClick={onNewGame}>New Game</button>
                </div>
            ) : (
                <div>
                    <span>You are out of credits!</span>
                    <button onClick={onLose}>New Game</button>
                </div>
            )}
        </div>
    );
}
