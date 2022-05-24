import React from "react";

import { observer } from "mobx-react-lite";

import "./App.css";

import { GameSwitch } from "./components/gameSwitch";

export const App = observer(() => {
    return (
        <div style={{ position: "absolute", bottom: "10%", left: "10%" }}>
            <GameSwitch />
        </div>
    );
});
