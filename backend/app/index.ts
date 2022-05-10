import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import express from "express";

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
});

server.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server running on port ${process.env.BACKEND_PORT}`);
});
