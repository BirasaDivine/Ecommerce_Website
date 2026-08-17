import { useState } from "react";
import { useParams } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

export default function Product() {
  const { productId } = useParams();
  const { products, currency, getPrice, getSizes, addToCart } = useShopContext();
  const product = products.find((p) => p._id === productId);
  const sizes = productId ? getSizes(productId) : [];
  const price = productId ? getPrice(productId) : null;

  const [image, setImage] = useState(product?.image[0] ?? "");
  const [size, setSize] = useState("");

  if (!product) {
    return (
      <div className="pt-10 text-center text-gray-500">Product not found.</div>
    );
  }

  return (
    <div className="border-t-2 pt-4">
      {/* Back Button */}
      <p
        onClick={() => window.history.back()}
        className="px-4 py-3 mb-3 cursor-pointer flex items-center gap-2 border rounded-full w-fit bg-gray-100 hover:bg-gray-200 transition-all duration-300"
      >
        <span aria-hidden>←</span>
        <span className="font-medium hidden sm:block">Go Back</span>
      </p>

      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((img, index) => (
              <img
                src={img}
                alt={product.name}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-contain cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} alt={product.name} className="w-full h-auto" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="rating" className="w-3" />
            <img src={assets.star_icon} alt="rating" className="w-3" />
            <img src={assets.star_icon} alt="rating" className="w-3" />
            <img src={assets.star_icon} alt="rating" className="w-3" />
            <img src={assets.star_dull_icon} alt="rating" className="w-3" />
            <p className="pl-2 text-sm text-gray-500">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {price !== null ? `${currency}${price}` : "Unavailable"}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p className="text-sm">Select Size</p>
            <div className="flex gap-2">
              {sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`bg-gray-100 border py-2 px-4 rounded-md font-medium text-sm ${
                    item === size ? "border-orange-500" : "border-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product._id, size)}
            disabled={!size}
            className="px-8 uppercase py-3 text-sm font-medium text-white bg-black active:bg-black/70 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add To Cart
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash On Delivery Available.</p>
            <p>Easy return and exchange policy within 7 days of purchase.</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm text-gray-500">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
