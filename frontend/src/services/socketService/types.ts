export interface ServerToCLientEvents {
    receive_message: (data: string) => void;
    lobby_users: (loobyUsers: { room: string; users: User[]; }) => void;
}

export interface ClientToServerEvents {
    join_lobby: (data: string) => void;
    send_message: (data: { room: string; message: string; }) => void;
    disconnect: (data: string) => void;
}

export interface User {
    name: string;
    room: string;
}
