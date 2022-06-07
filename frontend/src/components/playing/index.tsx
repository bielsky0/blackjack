import React from "react";

import "./styles.css";
import { BettingButtons } from "../bettingButtons";
import { ActionsButton } from "../actionsButtons";

export const Playing = () => {
    return (
        <div className="ui-wrapper">
            <BettingButtons />

            <ActionsButton />
        </div>
    );
};
