import type { Product } from "../types/product";
import type { Variant } from "../types/variant";
import * as store from "../mocks/productStore";
import type { ProductDraft, VariantDraft } from "../mocks/productStore";

export type { ProductDraft, VariantDraft };

export interface SaveProductInput extends ProductDraft {
  variants: VariantDraft[];
}

export interface ProductWithVariants {
  product: Product;
  variants: Variant[];
}

const LATENCY_MS = 200;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}

export async function getProducts(): Promise<Product[]> {
  return delay(store.listProducts());
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return delay(store.findProduct(id));
}

export async function getVariants(productId: string): Promise<Variant[]> {
  return delay(store.listVariants(productId));
}

export async function createProduct(input: SaveProductInput): Promise<ProductWithVariants> {
  const { variants: variantDrafts, ...draft } = input;
  const product = store.insertProduct(draft);
  const variants = store.replaceVariantsForProduct(product._id, variantDrafts);
  return delay({ product, variants });
}

export async function updateProduct(
  id: string,
  input: SaveProductInput
): Promise<ProductWithVariants | undefined> {
  const { variants: variantDrafts, ...draft } = input;
  const product = store.replaceProduct(id, draft);
  if (!product) return delay(undefined);
  const variants = store.replaceVariantsForProduct(id, variantDrafts);
  return delay({ product, variants });
}
