import React, { ChangeEvent } from "react";
import io from "socket.io-client";

import "./App.css";
/* eslint-disable-next-line */
const socket = io("http://localhost:4000");

export function App(): JSX.Element {
    const [room, setRoom] = React.useState("");

    const onSetRoom = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value);
    }, []);

    // Messages States
    const [message, setMessage] = React.useState("");
    const [messageReceived, setMessageReceived] = React.useState("");

    const joinRoom = React.useCallback(() => {
        if (room !== "") {
            socket.emit("join_lobby", room);
        }
    }, [room]);

    const sendMessage = React.useCallback(() => {
        socket.emit("send_message", { message, room });
    }, [room, message]);

    const onSendMessage = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }, []);

    React.useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("dsad", data);
            setMessageReceived(data);
        });
        return () => {
            socket.off("receive_message", (data) => {
                setMessageReceived(data.message);
            });
        };
    }, []);

    return (
        <div className="App">
            <input
                placeholder="Room Number..."
                onChange={onSetRoom}
            />
            <button onClick={joinRoom}> Join Room</button>
            <input
                placeholder="Message..."
                onChange={onSendMessage}
            />
            <button onClick={sendMessage}> Send Message</button>
            <h1> Message:</h1>
            {messageReceived}
        </div>
    );
}
