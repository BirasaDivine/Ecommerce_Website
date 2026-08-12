import type { StockStatus } from "../mocks/categories";

export interface Variant {
    _id: string;
    productId: string;
    size: string;
    price: number;
    stockStatus: StockStatus;
    active: boolean;
}