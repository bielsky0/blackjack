import React from "react";

import { observer } from "mobx-react-lite";

import "./App.css";

import { GameSwitch } from "./components/gameSwitch";

export const App = observer(() => {
    return (
        <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex" }}>
            <GameSwitch />
        </div>
    );
});
