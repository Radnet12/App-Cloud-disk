// Libs
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";

// API
import { $api } from "./AxiosInstance";

export class AuthService {
    static registration(
        email: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/registration", {
            email,
            password,
        });
    }

    static login(
        email: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/login", {
            email,
            password,
        });
    }

    static authorization(): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>("/auth/authorization");
    }
}
