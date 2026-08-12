export const CATEGORIES = [ "Men", "Women", "Kids"] as const;
export type Category = typeof CATEGORIES[number];
export const SUB_CATEGORIES = ["Topwear", "Bottomwear", "Winterwear"] as const;
export type SubCategory = typeof SUB_CATEGORIES[number];
export const STOCK_STATUSES = ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"] as const;
export type StockStatus = typeof STOCK_STATUSES[number];