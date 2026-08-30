import type { StockStatus } from "../mocks/categories";

export const STOCK_STATUS_LABELS: Record<StockStatus, string> = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

export const STOCK_STATUS_CLASSES: Record<StockStatus, string> = {
  IN_STOCK: "text-green-700 bg-green-50 border-green-300",
  LOW_STOCK: "text-amber-700 bg-amber-50 border-amber-300",
  OUT_OF_STOCK: "text-red-700 bg-red-50 border-red-300",
};
