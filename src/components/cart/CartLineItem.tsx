import { useShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/frontend_assets/assets";
import type { CartLine } from "../../hooks/useCart";

interface CartLineItemProps {
  item: CartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartLineItem({ item, onQuantityChange, onRemove }: CartLineItemProps) {
  const { currency } = useShopContext();

  return (
    <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
      <div className="flex items-start gap-6">
        <img
          className="w-16 sm:w-20"
          src={item.product.image[0]}
          alt={item.product.name}
        />
        <div>
          <p className="text-xs sm:text-lg font-medium">{item.product.name}</p>
          <div className="flex items-center gap-5 mt-2">
            <p>
              {currency}
              {item.price}
            </p>
            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
          </div>
        </div>
      </div>

      <input
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") return;
          const quantity = Number(value);
          if (Number.isNaN(quantity)) return;
          onQuantityChange(quantity);
        }}
      />

      <img
        onClick={onRemove}
        src={assets.bin_icon}
        alt="Remove"
        className="w-4 mr-4 sm:w-5 cursor-pointer"
      />
    </div>
  );
}
