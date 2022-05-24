import { observer } from "mobx-react-lite";
import React from "react";
import { gameStore } from "../../store/gameStore";

export const Betting = observer(() => {
    const onAdd10 = React.useCallback(() => {
        gameStore.addBet(10);
    }, []);

    const onDeal = React.useCallback(async () => {
        gameStore.changeState("playing");
        await gameStore.addCardToPlayer(gameStore.players[0]);
        await gameStore.addCardToPlayer(gameStore.players[0]);

        await gameStore.addCardToPlayer(gameStore.dealer);
        await gameStore.addHiddenCard(gameStore.dealer);
    }, []);

    return (
        <div>
            <div>{gameStore.players[0].money}</div>
            {gameStore.players[0].money <= 0 ? null : <button onClick={onAdd10}>Add 10</button>}
            <button onClick={onDeal}>Deal</button>
        </div>
    );
});
