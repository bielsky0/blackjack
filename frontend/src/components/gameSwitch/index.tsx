import React from "react";

import { observer } from "mobx-react-lite";

import { gameStore } from "../../store/gameStore";
import { Menu } from "../menu";
import { Playing } from "../playing";
import { DealerWon } from "../dealerWon";
import { PlayerWon } from "../playerWon";
import { LoseScreen } from "../loseScreen";
import { Draw } from "../draw";

export const GameSwitch = observer(() => {
    switch (gameStore.gameState) {
        case "menu":
            return <Menu />;
        case "playerWon":
            return <PlayerWon />;
        case "dealerWon":
            return <DealerWon />;
        case "playerWonSplit":
            return <PlayerWon />;
        case "dealerWonSplit":
            return <DealerWon />;
        case "lose":
            return <LoseScreen />;
        case "draw":
            return <Draw />;
        case "drawSplit":
            return <Draw />;
        default:
            return <Playing />;
    }
});
