import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToCLientEvents } from "./types";

export class LobbyConnection {
    private io: Server<ClientToServerEvents, ServerToCLientEvents>;
    private socket: Socket<ClientToServerEvents, ServerToCLientEvents>;

    public constructor(io: Server<ClientToServerEvents, ServerToCLientEvents>,
        socket: Socket<ClientToServerEvents, ServerToCLientEvents>) {
        this.io = io;
        this.socket = socket;

        socket.on("join_lobby", async (data) => {
            console.log(data);
            await socket.join(data);
        });

        socket.on("send_message", (data) => {
            console.log(data);
            socket.to(data.room).emit("receive_message", `${socket.id}: ${data.message}`);
        });
    }
}
