import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

interface CartLine {
  _id: string;
  size: string;
  quantity: number;
}

export default function Cart() {
  const { products, currency, cartItems, updateQuantity, getVariantPrice } =
    useShopContext();

  const [cartData, setCartData] = useState<CartLine[]>([]);

  useEffect(() => {
    const tempData: CartLine[] = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({ _id: itemId, size, quantity: cartItems[itemId][size] });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleRemove = (item: CartLine, productName: string) => {
    const confirmed = window.confirm(
      `Remove ${item.quantity} × ${productName} (${item.size}) from your cart?`
    );
    if (confirmed) {
      updateQuantity(item._id, item.size, 0);
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length > 0 ? (
        <>
          <div>
            {cartData.map((item) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency}
                          {getVariantPrice(item._id, item.size)}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  />

                  <img
                    onClick={() => handleRemove(item, productData.name)}
                    src={assets.bin_icon}
                    alt="Remove"
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                  />
                </div>
              );
            })}
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
        <div className="text-center py-8 text-3xl flex flex-col items-center justify-center h-[50vh]">
          <p className="w-3/4 m-auto flex items-center gap-2 justify-center text-xs sm:text-sm md:text-base text-gray-600">
            Your cart is empty.
          </p>
          <Link
            to="/collection"
            className="text-xs sm:text-sm md:text-base text-white bg-black py-2 px-8 rounded -mt-4"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
}
