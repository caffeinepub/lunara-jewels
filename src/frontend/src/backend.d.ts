import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderRequest {
    id: bigint;
    customerName: string;
    totalAmount: bigint;
    shippingNote: string;
    timestamp: Time;
    items: Array<CartItem>;
    customerEmail: string;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrderRequest(id: bigint): Promise<OrderRequest | null>;
    getProduct(id: bigint): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listOrderRequests(): Promise<Array<OrderRequest>>;
    listProducts(): Promise<Array<Product>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitOrderRequest(customerName: string, customerEmail: string, shippingNote: string, items: Array<CartItem>, totalAmount: bigint): Promise<bigint>;
    updateProduct(product: Product): Promise<void>;
}
