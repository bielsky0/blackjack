import io, { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToCLientEvents } from "./types";

export class SocketService {
    private socket: Socket<ServerToCLientEvents, ClientToServerEvents>;
    public constructor() {
        this.socket = io("http://localhost:4000");
    }
}
