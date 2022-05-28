import React from "react";

import { observer } from "mobx-react-lite";

import { gameStore } from "../../store/gameStore";
// import { DealerWon } from "../dealerWon";
import { Menu } from "../menu";
// import { PlayerWon } from "../playerWon";
// import { Playing } from "../playing";
import { Betting } from "../betting";
import { DealerWon } from "../dealerWon";
import { PlayerWon } from "../playerWon";
import { LoseScreen } from "../loseScreen";
import { Draw } from "../draw";
// import { LoseScreen } from "../loseScreen";
// import { Draw } from "../draw";

export const GameSwitch = observer(() => {
    switch (gameStore.gameState) {
        case "menu":
            return <Menu />;
        // case "playing":
        //     return <Playing />;
        case "playerWon":
            return <PlayerWon />;
        case "dealerWon":
            return <DealerWon />;
        // case "betting":
        //     return <Betting />;
        case "lose":
            return <LoseScreen />;
        case "draw":
            return <Draw />;
        default:
            return <Betting />;
    }
});
