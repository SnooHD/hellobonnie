declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_MAPBOX_TOKEN: string;
            POSTALCODE_LOOKUP_URL: string;
        }
    }
}

export {};
