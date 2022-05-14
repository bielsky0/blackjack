import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToCLientEvents, User } from "./types";

export class LobbyConnection {
    private io: Server<ClientToServerEvents, ServerToCLientEvents>;
    private socket: Socket<ClientToServerEvents, ServerToCLientEvents>;
    private users: User[];

    public constructor(io: Server<ClientToServerEvents, ServerToCLientEvents>,
        socket: Socket<ClientToServerEvents, ServerToCLientEvents>) {
        this.io = io;
        this.socket = socket;
        this.users = [];
    }

    public init(): void {
        this.socket.on("join_lobby", this.joinLobby.bind(this));

        this.socket.on("send_message", this.sendMessage.bind(this));
    }

    private async joinLobby(lobby: string): Promise<void> {
        try {
            this.users.push({ name: this.socket.id, room: lobby });

            await this.socket.join(lobby);

            this.receiveLobbyInfo({ room: lobby, users: this.getLobbyUsers(lobby) });
        } catch (error) {
            console.log(error);
        }
    }

    private sendMessage(data: { message: string; room: string; }): void {
        this.receiveMessage(data);
    }

    private receiveLobbyInfo(lobbyUsers: { room: string; users: User[]; }): void {
        this.io.to(lobbyUsers.room).emit("lobby_users", lobbyUsers);
    }

    private receiveMessage(data: { message: string; room: string; }): void {
        this.io.to(data.room).emit("receive_message", `${this.socket.id}: ${data.message}`);
    }

    private removeUser(id: string): User | undefined {
        const index = this.users.findIndex(user => user.name === id);

        if (index !== -1) { return this.users.splice(index, 1)[0]; }
    }

    private getLobbyUsers(lobby: string) {
        return this.users.filter((user) => user.room === lobby);
    }

    private disconnect() {
        const user = this.removeUser(this.socket.id);

        if (user) {
            this.receiveLobbyInfo({ room: user.room, users: this.getLobbyUsers(user.room) });
        }
    }
}
