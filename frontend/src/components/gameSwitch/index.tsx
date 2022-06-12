import React from "react";

import { observer } from "mobx-react-lite";

import { gameStore } from "../../store/gameStore";
import { Menu } from "../menu";
import { Playing } from "../playing";
import { DealerWon } from "../dealerWon";
import { PlayerWon } from "../playerWon";
import { LoseScreen } from "../loseScreen";
import { Draw } from "../draw";
import { GameState } from "../../store/type";

export const GameSwitch = observer(() => {
    switch (gameStore.gameState) {
        case GameState.Menu:
            return <Menu />;
        case GameState.PlayerWon:
            return <PlayerWon />;
        case GameState.DealerWon:
            return <DealerWon />;
        case GameState.PlayerWonSplit:
            return <PlayerWon />;
        case GameState.DealerWonSplit:
            return <DealerWon />;
        case GameState.Lose:
            return <LoseScreen />;
        case GameState.Push:
            return <Draw />;
        case GameState.PushSplit:
            return <Draw />;
        default:
            return <Playing />;
    }
});
