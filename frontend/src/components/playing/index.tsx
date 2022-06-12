import React from "react";

import "./styles.css";
import { observer } from "mobx-react-lite";
import { BettingButtons } from "../bettingButtons";
import { Balance } from "../balanace";
// import { ActionsButton } from "../actionsButtons";

export const Playing = observer(() => {
    return (
        <div className="ui-wrapper">
            <BettingButtons />

            <Balance />
        </div>
    );
});
