import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import CartLineItem from "../components/cart/CartLineItem";
import EmptyCart from "../components/cart/EmptyCart";

export default function Cart() {
  const { cartLines, setQuantity, removeLine } = useCart();

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartLines.length > 0 ? (
        <>
          <div>
            {cartLines.map((item) => (
              <CartLineItem
                key={`${item._id}-${item.size}`}
                item={item}
                onQuantityChange={(quantity) => setQuantity(item, quantity)}
                onRemove={() => removeLine(item)}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between w-full">
            <div className="flex justify-start my-20">
              <div className="w-full sm:w-[450px]">
                <Link
                  to="/collection"
                  className="text-black hover:text-white w-full border hover:bg-black text-center transition-all duration-300 cursor-pointer py-4 px-8 text-sm font-medium block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="flex justify-end my-20 w-full sm:w-auto">
              <div className="w-full sm:w-[450px]">
                <CartTotal />

                <div className="w-full text-end">
                  <button
                    disabled
                    title="Checkout isn't implemented yet"
                    className="bg-black text-white text-sm my-8 px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
