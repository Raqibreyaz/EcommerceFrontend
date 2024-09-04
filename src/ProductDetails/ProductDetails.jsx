import { useEffect, useCallback, useState, useMemo, memo } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  StarIcon,
  HeartIcon,
  TrashIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import DescriptionDetailsAndHighlights from "./DescriptionDetailsAndHighlights";
import ImageGallery from "./ImageGallery";
import ProductDetailsNav from "./ProductDetailsNav";
import ReviewComponent from "../features/reviews/Reviews.jsx";
import { Container } from "../components/index.js";
import { catchAndShowMessage } from "../utils/catchAndShowMessage.js";
import { useFetchProductDetailsQuery } from "../features/product-list/ProductSlice.js";
import {
  useAddProductToWishlistMutation,
  useIsProductInWishlistQuery,
  useRemoveProductFromWishlistMutation,
} from "../features/wishlist/wishlistSlice.js";
import {
  useAddProductToCartMutation,
  useFetchUserCartQuery,
} from "../features/cart/cartSlice.js";
import { useFetchUserQuery } from "../features/user/userSlice.js";
import { useFetchProductReviewsQuery } from "../features/reviews/reviewSlice.js";
import { IsAddedToCart } from "../utils/isAddedToCart.js";

// reviews:[{oneWord,review,rating,user:{fullname,avatar,address}}]
const reviews = { href: "#", average: 4, totalCount: 117, rating: 4 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SizesSection = memo(({ product, selectedSize, setSelectedSize }) => {
  return (
    <RadioGroup
      value={selectedSize}
      onChange={setSelectedSize}
      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
    >
      {product.sizes?.map((size) => (
        <Radio
          key={size}
          value={size}
          className={({ focus }) =>
            classNames(
              "cursor-pointer bg-white text-gray-900 shadow-sm",
              focus ? "ring-2 ring-indigo-500" : "",
              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
            )
          }
        >
          {({ checked, focus }) => (
            <>
              <span>{size}</span>
              <span
                className={classNames(
                  checked ? "border-indigo-500" : "border-transparent",
                  focus ? "border" : "border-2",
                  "pointer-events-none absolute -inset-px rounded-md"
                )}
                aria-hidden="true"
              />
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
});

const ColorsSection = memo(
  ({ product, setSelectedColor, selectedColor, user }) => {
    console.log(product);

    return (
      <RadioGroup
        value={selectedColor}
        onChange={setSelectedColor}
        className="flex items-center max-sm:gap-3 gap-2 flex-wrap"
      >
        {product.colors?.map((color) => (
          <Radio
            key={color.color}
            // color is an object containing color with images
            value={color}
            aria-label={color.color}
            className={({ focus, checked }) =>
              classNames(
                "ring-gray-400",
                focus && checked ? "ring ring-offset-1" : "",
                !focus && checked ? "ring-2" : "",
                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
              )
            }
          >
            <span
              aria-hidden="true"
              className={classNames(
                color.color,
                `h-8 w-8 rounded-full border border-black border-opacity-10`
              )}
              style={{ backgroundColor: color.color }}
            />
          </Radio>
        ))}
        {(user === "admin" || product.owner._id === user?._id) && (
          <Link to={`/add-new-colors/${product._id}`}>
            <PlusCircleIcon className=" text-gray-500 size-8" />
          </Link>
        )}
      </RadioGroup>
    );
  }
);

export default function ProductDetails() {
  const productId = useParams().id;

  const Navigate = useNavigate();

  const {
    data: { product = {} } = {},
    isLoading: isLoadingProduct,
    isError: isErrorInProduct,
  } = useFetchProductDetailsQuery(productId);

  const { data: { isInWishlist = false } = {}, isLoading: isLoadingWishlist } =
    useIsProductInWishlistQuery(productId);

  const { data: { user = null } = {}, isLoadingUser } = useFetchUserQuery();

  const [AddToWishlist, { isLoading: isLoadingAddToWishlist }] =
    useAddProductToWishlistMutation();

  const [AddToCart, { isLoading: isLoadingAddToCart }] =
    useAddProductToCartMutation();

  const { isLoading: isLoadingCart, data: { userCart = [] } = {} } =
    useFetchUserCartQuery();

  const [RemoveFromWishlist, { isLoading: isLoadingRemoveFromWishlist }] =
    useRemoveProductFromWishlistMutation();

  const [selectedSize, setSelectedSize] = useState({});

  const [selectedColor, setSelectedColor] = useState("");

  const isProductInCart = useMemo(
    () => IsAddedToCart(productId, selectedColor.color, selectedSize, userCart),
    [selectedColor, selectedSize, userCart]
  );

  const handleAddToCart = useCallback(
    (e) => {
      if (!user) Navigate("/login");
      catchAndShowMessage(AddToCart, {
        id: productId,
        color: selectedColor.color,
        size: selectedSize,
        quantity: 1,
      });
    },
    [selectedColor, selectedSize, user]
  );

  const handleWishlistProduct = useCallback(() => {
    if (!user) Navigate("/login");

    if (isInWishlist) {
      catchAndShowMessage(RemoveFromWishlist, {
        id: productId,
        color: selectedColor.color,
        size: selectedSize,
      });
    } else {
      catchAndShowMessage(AddToWishlist, {
        id: productId,
        color: selectedColor.color,
        size: selectedSize,
      });
    }
  }, [selectedColor, selectedSize, isInWishlist, user]);

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setSelectedColor((prevSelectedColor) => product.colors[0]);
      setSelectedSize((prevSelectedSize) => product.sizes[0]);
    }
  }, [product]);

  return (
    <Container
      LoadingConditions={[
        !!isLoadingCart,
        !!isLoadingProduct,
        !!isLoadingUser,
        !!isLoadingWishlist,
        !!isLoadingAddToCart,
        !!isLoadingAddToWishlist,
        !!isLoadingRemoveFromWishlist,
      ]}
      RenderingConditions={[!!product, !!product?._id, !isErrorInProduct]}
      className="bg-white pt-6"
    >
      <ProductDetailsNav name={product?.product_name} />
      {/* Image gallery */}
      <ImageGallery selectedColor={selectedColor} />
      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-10 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className=" font-bold tracking-tight capitalize  text-gray-900 text-3xl">
            {product?.product_name}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p
            className={`sm:text-3xl max-sm:text-2xl font-semibold tracking-tight text-gray-900 `}
          >
            ₹{Math.round(product.price * (1 - product.discount * 0.01))}
          </p>
          <p
            className={`text-2xl tracking-tight text-gray-500 line-through ${
              product.discount > 0 ? "" : "hidden"
            }`}
          >
            ₹{product?.price}
          </p>
          {/* sizes and colors section */}
          <div className="mt-10">
            {[
              {
                name: "color",
                child: (
                  <ColorsSection
                    product={product}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    user={user}
                  />
                ),
              },
              {
                name: "size",
                child: (
                  <SizesSection
                    product={product}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                  />
                ),
              },
            ].map(({ name, child }) => (
              <div key={name} className="mt-10">
                <h3 className="text-sm  text-gray-900 capitalize font-semibold">
                  {name}
                </h3>
                <fieldset aria-label={`Choose a ${name}`} className="mt-4">
                  {child}
                </fieldset>
              </div>
            ))}

            {/* add to cart or go to cart */}
            {!isProductInCart ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 max-sm:text-sm"
              >
                Add to Cart
              </button>
            ) : (
              <Link
                to="/cart"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Go To Cart
              </Link>
            )}

            {/* wishlist add button */}
            <button
              type="button"
              className={`mt-5 flex w-full capitalize items-center justify-center rounded-md border  px-4 py-3 text-base font-medium ${
                isInWishlist ? "text-red-500" : "text-black"
              } hover:bg-gray-600-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 max-sm:text-sm`}
              onClick={() => handleWishlistProduct()}
            >
              <HeartIcon
                className={`${
                  isInWishlist ? "text-red-500" : "text-black"
                } size-7`}
              />
              {isInWishlist ? "remove from wishlist" : " Add To WishList"}
            </button>
            <div
              className={`${
                user?.role === "admin" || user?._id === product?.owner?._id
                  ? ""
                  : "hidden"
              }`}
            >
              <Link
                to={`/edit-product/${product._id}`}
                className="mt-3 font-semibold mx-auto cursor-pointer flex capitalize"
              >
                <PencilSquareIcon className="size-5 text-yellow-700" />
                edit Product
              </Link>
              <Link
                to={`/edit-product-colors/${product._id}`}
                className="mt-3 font-semibold mx-auto cursor-pointer capitalize flex items-center"
              >
                <PencilIcon className="size-4 text-yellow-700" />
                edit colors
              </Link>
            </div>
          </div>
        </div>
        <DescriptionDetailsAndHighlights product={product} />
      </div>
      <div>
        {/* memoised */}
        <ReviewComponent />
      </div>
    </Container>
  );
}
