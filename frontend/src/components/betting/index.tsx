import { observer } from "mobx-react-lite";
import React from "react";
import { gameStore } from "../../store/gameStore";

import darkButton from "../../assets/buttons/dark-button-texture.png";

import redButton from "../../assets/buttons/red-button-texture.png";
import greenButton from "../../assets/buttons/green-button-texture.png";

import "./styles.css";

export const Betting = observer(() => {
    const onAddBet = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.dataset.bet) { gameStore.addBet(Number(e.currentTarget.dataset.bet)); }
    }, []);

    const onDeal = React.useCallback(async () => {
        gameStore.changeState("playing");
        await gameStore.addCardToPlayer(gameStore.players[0]);
        await gameStore.addCardToPlayer(gameStore.players[0]);

        await gameStore.addCardToPlayer(gameStore.dealer);
        await gameStore.addHiddenCard(gameStore.dealer);
        console.log("xd");
    }, []);

    const onClear = React.useCallback(() => {
        gameStore.clearBet();
    }, []);

    const onAddCardToPlayer = React.useCallback(async () => {
        await gameStore.addCardToPlayer(gameStore.players[0]);

        if (gameStore.players[0].points > 21) {
            gameStore.changeState("dealerWon");
            await gameStore.showHiddenCard();
        }
    }, []);

    const onStand = React.useCallback(async () => {
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
        <div className="ui-wrapper">
            <div className="left-wrapper">

                <div className="chips-wrapper">
                    <div className="chip-wrapper">
                        <button
                            disabled={gameStore.players[0].money < 0.1 || gameStore.gameState !== "betting" || gameStore.isAnimating}
                            onClick={onAddBet}
                            data-bet={0.1}
                        // style={{ backgroundImage: `url(${darkButton})` }}
                            className={`chip white ${gameStore.players[0].money < 0.1 || gameStore.gameState
                                !== "betting" ? "disabled" : ""} `}
                        />
                        <div className="bet">0.1$</div>
                    </div>

                    <div className="chip-wrapper">
                        <button
                            disabled={gameStore.players[0].money < 1 || gameStore.gameState !== "betting" || gameStore.isAnimating}
                            onClick={onAddBet}
                            data-bet={1}
                        // style={{ backgroundImage: `url(${darkButton})` }}
                            className={`chip red ${gameStore.players[0].money < 10 || gameStore.gameState
                                !== "betting" ? "disabled" : ""} `}
                        />
                        <div className="bet">1$</div>
                    </div>

                    <div className="chip-wrapper">
                        <button
                            disabled={gameStore.players[0].money < 5 || gameStore.gameState !== "betting" || gameStore.isAnimating}
                            onClick={onAddBet}
                            data-bet={5}
                        // style={{ backgroundImage: `url(${darkButton})` }}
                            className={`chip blue ${gameStore.players[0].money < 5 || gameStore.gameState
                                !== "betting" ? "disabled" : ""} `}
                        />
                        <div className="bet">5$</div>
                    </div>

                    <div className="chip-wrapper">
                        <button
                            disabled={gameStore.players[0].money < 10 || gameStore.gameState !== "betting" || gameStore.isAnimating}
                            onClick={onAddBet}
                            data-bet={10}
                        // style={{ backgroundImage: `url(${darkButton})` }}
                            className={`chip black ${gameStore.players[0].money < 10 || gameStore.gameState
                                !== "betting" ? "disabled" : ""} `}
                        />
                        <div className="bet">10$</div>
                    </div>
                </div>

                <div className="clear-wrapper">
                    <button
                        disabled={gameStore.gameState !== "betting" || gameStore.isAnimating}
                        onClick={onClear}
                        style={{ backgroundImage: `url(${darkButton})` }}
                        className={`button ${gameStore.gameState !== "betting" ? "disabled" : ""} `}
                    >
                        <div className="clear">CLEAR</div>
                    </button>
                </div>
            </div>

            <div className="rigth-wrapper">

                <div className="money-wrapper">
                    <div className="bet-wrapper">
                        <span className="bet-wrapper__title">Bet:</span>
                        <span className="bet-wrapper__value">{gameStore.players[0].bet}$</span>
                    </div>

                    <div className="balance-wrapper">
                        <span className="balance-wrapper__title">Balance:</span>
                        <span className="balance-wrapper__value">{gameStore.players[0].money}$</span>
                    </div>
                </div>
                <div>
                    <button
                        disabled={gameStore.gameState !== "betting" || gameStore.players[0].bet <= 0 || gameStore.isAnimating}
                        onClick={onDeal}
                        style={{ backgroundImage: `url(${darkButton})` }}
                        className={`button ${gameStore.players[0].bet <= 0 || gameStore.gameState !== "betting" ? "disabled" : ""} `}
                    >
                        <div className="shine">Deal</div>
                    </button>

                    <button
                        disabled={gameStore.gameState !== "playing" || gameStore.isAnimating}
                        onClick={onAddCardToPlayer}
                        style={{ backgroundImage: `url(${greenButton})` }}
                        className={`button ${gameStore.gameState !== "playing" ? "disabled" : ""} `}
                    >
                        <div className="shine">Hit</div>
                    </button>

                    <button
                        disabled={gameStore.gameState !== "playing" || gameStore.isAnimating}
                        onClick={onStand}
                        style={{ backgroundImage: `url(${redButton})` }}
                        className={`button ${gameStore.gameState !== "playing" ? "disabled" : ""} `}
                    >
                        <div className="shine">Stand</div>
                    </button>
                </div>
            </div>
        </div>
    );
});
