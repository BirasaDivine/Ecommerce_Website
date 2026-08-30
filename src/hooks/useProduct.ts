import { useEffect, useState } from "react";
import { getProductById, getVariants } from "../services/productService";
import type { Product } from "../types/product";
import type { Variant } from "../types/variant";

export function useProduct(productId: string) {
  const [status, setStatus] = useState<"loading" | "ready" | "not-found">("loading");
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    let ignore = false;

    Promise.all([getProductById(productId), getVariants(productId)]).then(
      ([productResult, variantResult]) => {
        if (ignore) return;
        if (!productResult) {
          setStatus("not-found");
          return;
        }
        setProduct(productResult);
        setImage(productResult.image[0] ?? "");
        setVariants(variantResult.filter((v) => v.active));
        setStatus("ready");
      }
    );

    return () => {
      ignore = true;
    };
  }, [productId]);

  return { status, product, variants, image, setImage };
}
