import { observer } from "mobx-react-lite";
import React from "react";
import { Points } from "../../common/consts/types";
import { gameStore } from "../../store/gameStore";

export const Playing = observer((): JSX.Element => {
    const onAddCardToPlayer = React.useCallback(async () => {
        await gameStore.addCardToPlayer(gameStore.players[0]);

        if (gameStore.players[0].points > 21) {
            gameStore.changeState("dealerWon");
            await gameStore.showHiddenCard();
        }
    }, []);

    const onStay = React.useCallback(async () => {
        await gameStore.showHiddenCard();
        while (
            gameStore.dealer.points < gameStore.players[0].points &&
            gameStore.players[0].points <= 21 &&
            gameStore.dealer.points <= 21
        ) {
            await gameStore.addCardToPlayer(gameStore.dealer);
        }

        if (gameStore.players[0].points > 21) {
            gameStore.changeState("dealerWon");
        } else if (gameStore.dealer.points > 21) {
            gameStore.changeState("playerWon");
            gameStore.players[0].money += gameStore.players[0].bet * 2;
        } else {
            if (gameStore.players[0].points > gameStore.dealer.points) {
                gameStore.changeState("playerWon");
                gameStore.players[0].money += gameStore.players[0].bet * 2;
            }

            if (gameStore.dealer.points > gameStore.players[0].points) {
                gameStore.changeState("dealerWon");
            }

            if (gameStore.dealer.points === gameStore.players[0].points) {
                gameStore.changeState("draw");
                gameStore.players[0].money += gameStore.players[0].bet;
            }
        }
    }, []);

    return (
        <div>
            <div>Bet: {gameStore.players[0].bet}</div>
            <div>{gameStore.dealer.hiddenCard ? gameStore.dealer.points - Points[gameStore.dealer.hiddenCard.value] > 0 ?
                gameStore.dealer.points - Points[gameStore.dealer.hiddenCard.value] : 0 : gameStore.dealer.points}
            </div>
            <div>{gameStore.players.map((player) => {
                return (
                    <div key={Math.random()}> {player.points}
                    </div>
                );
            })}
            </div>
            <button onClick={onAddCardToPlayer}>Hit</button>
            <button onClick={onStay}>Stay</button>
            <div>Money: {gameStore.players[0].money}</div>
        </div>
    );
});
