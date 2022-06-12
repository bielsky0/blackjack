import React from "react";

import { observer } from "mobx-react-lite";
import { balanceToFixed } from "./utils";
import { gameStore } from "../../store/gameStore";

import "./styles.css";

export const Balance = observer(() => {
    return (
        <div className="money-wrapper">
            <div className="bet-wrapper">
                <span className="bet-wrapper__title">Bet:</span>
                <span className="bet-wrapper__value">{balanceToFixed(gameStore.players[0].bet)}$</span>
            </div>

            <div className="balance-wrapper">
                <span className="balance-wrapper__title">Balance:</span>
                <span className="balance-wrapper__value">{balanceToFixed(gameStore.players[0].money)}$</span>
            </div>
        </div>
    );
});
