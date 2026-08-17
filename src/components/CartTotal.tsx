import { useShopContext } from "../context/ShopContext";
import Title from "./Title";

export default function CartTotal() {
  const { currency, deliveryFee, getTotalAmount } = useShopContext();
  const subtotal = getTotalAmount();
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>
            {currency}
            {subtotal === 0 ? 0 : deliveryFee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-medium">
          <p>Total</p>
          <p>
            {currency}
            {total}.00
          </p>
        </div>
      </div>
    </div>
  );
}
