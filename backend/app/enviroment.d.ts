declare global {
    namespace NodeJS {
        interface Process {
            BACKEND_PORT: number;
            FRONTEND_PORT: number;
            FRONTEND_URL: string;
        }
    }
}

export {};
