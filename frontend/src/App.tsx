import React from "react";

import "./App.css";

import { gameStore } from "./store/gameStore";

export const App = (): JSX.Element => {
    const onAddCardToPlayer = React.useCallback(() => {
        gameStore.addCardToPlayer(gameStore.players[0]);
    }, []);

    const onAddCardToDealer = React.useCallback(() => {
        gameStore.addCardToPlayer(gameStore.players[1]);
    }, []);

    const onCardShuffle = React.useCallback(() => {
        gameStore.shuffleDeck();
    }, []);

    const onCardReturn = React.useCallback(() => {
        gameStore.returnCardsToDeck();
    }, []);
    return (
        <div style={{ position: "absolute", bottom: "10%", left: "10%" }}>
            <button onClick={onAddCardToPlayer}>Add card to player</button>
            <button onClick={onAddCardToDealer}>Add card to dealer</button>
            <button onClick={onCardShuffle}>Shuffle deck</button>
            <button onClick={onCardReturn}>Return cards to deck</button>
            <div>{gameStore.players.map((player) => {
                return (
                    <div key={Math.random()}> {player.cards.map((card) => {
                        return <div key={Math.random()}> {card.value} {card.type} </div>;
                    })}
                    </div>
                );
            })}
            </div>
        </div>
    );
};
