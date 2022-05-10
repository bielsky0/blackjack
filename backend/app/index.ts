import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import express from "express";
import { LobbyConnection } from "./connections/lobby";

interface ServerToCLientEvents {
    receive_message: (data: string) => void;
}

interface ClientToServerEvents {
    join_room: (data: string) => void;
    send_message: (data: { room: string; message: string; }) => void;
}

dotenv.config({ path: `${__dirname}/../../.env` });

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
    }),
);

const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToCLientEvents>(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],

    },
});

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    /* eslint-disable-next-line */
const lobbyConnection = new LobbyConnection(io, socket);
});

server.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server running on port ${process.env.BACKEND_PORT}`);
});
