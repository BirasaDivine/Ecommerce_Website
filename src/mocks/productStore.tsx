import type { Product } from "../types/product";
import type { Variant } from "../types/variant";
import type { StockStatus } from "./categories";
import { MOCK_PRODUCTS } from "./products";
import { MOCK_VARIANTS } from "./variants";

export interface VariantDraft {
  _id?: string;
  size: string;
  price: number;
  stockStatus: StockStatus;
  active: boolean;
}

export type ProductDraft = Omit<Product, "_id" | "date">;

let products: Product[] = [...MOCK_PRODUCTS];
let variants: Variant[] = [...MOCK_VARIANTS];
let productSeq = products.length;

export function listProducts(): Product[] {
  return products;
}

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p._id === id);
}

export function listVariants(productId: string): Variant[] {
  return variants.filter((v) => v.productId === productId);
}

export function insertProduct(draft: ProductDraft): Product {
  productSeq += 1;
  const product: Product = { ...draft, _id: `p${productSeq}`, date: Date.now() };
  products = [...products, product];
  return product;
}

export function replaceProduct(id: string, draft: ProductDraft): Product | undefined {
  if (!findProduct(id)) return undefined;
  let updated: Product | undefined;
  products = products.map((p) => {
    if (p._id !== id) return p;
    updated = { ...p, ...draft };
    return updated;
  });
  return updated;
}

export function replaceVariantsForProduct(productId: string, drafts: VariantDraft[]): Variant[] {
  const kept = variants.filter((v) => v.productId !== productId);
  const next: Variant[] = drafts.map((draft, index) => ({
    _id: draft._id && draft._id.length > 0 ? draft._id : `${productId}-v${Date.now()}-${index}`,
    productId,
    size: draft.size,
    price: draft.price,
    stockStatus: draft.stockStatus,
    active: draft.active,
  }));
  variants = [...kept, ...next];
  return next;
}
