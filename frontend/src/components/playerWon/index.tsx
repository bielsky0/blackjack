import { observer } from "mobx-react-lite";
import React from "react";
import ReactDOM from "react-dom";
import { gameStore } from "../../store/gameStore";
import { GameState } from "../../store/type";

import "./styles.css";

export const PlayerWon = observer(() => {
    console.log(gameStore.players[0].splitIdx);

    const onNewGame = React.useCallback(async () => {
        if (gameStore.gameState === GameState.PlayerWonSplit) {
            if (gameStore.players[0].split[0].state === "finished" && gameStore.players[0].split[1].state === "finished") {
                gameStore.changeState(GameState.Betting);
                await gameStore.returnCardsToDeck();
                await gameStore.shuffleDeck();
            } else {
                if (gameStore.players[0].splitIdx === 0) {
                    await gameStore.swapSplittedArray(1);
                }
                gameStore.checkSplit();
            }
        } else {
            gameStore.changeState(GameState.Betting);
            await gameStore.returnCardsToDeck();
            gameStore.shuffleDeck();
        }
    }, []);
    return (
        ReactDOM.createPortal(
            <div key={Math.random()} className="player_won-wrapper" onClick={onNewGame}>
                <div className="title-wrapper">
                    <span className="player_won-wrapper__title">You won {gameStore.players[0].bet}$</span>
                    {/* <span className="dealer-points__title">{gameStore.dealer.points}</span> */}
                    {/* <span className="vs-points__title">vs</span>
                    <span className="player-points__title">{gameStore.players[0].points}</span> */}

                </div>
            </div>,
            document.body)

    );
});
