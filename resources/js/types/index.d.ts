import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export interface Product {
    id: number;
    name: string;
    description?: string;
    status?: string;
    price: number;
    stock: number;
    user: User;
    created_at?: string;
    updated_at?: string;
}
