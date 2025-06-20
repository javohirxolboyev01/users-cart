import React from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/feature/wishlistSlice";
import { TfiUser } from "react-icons/tfi";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItem = useSelector((state) => state.wishlist.item);
  console.log(wishlistItem);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-10">
      {wishlistItem.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
        >
          <div className="relative h-[200px] w-full">
            <img
              src={user.img}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />

            <div className="absolute top-2 right-2">
              <button
                onClick={() => dispatch(removeFromWishlist(user))}
                className="absolute top-2 right-2 bg-white p-1 rounded-full text-gray-600 hover:text-red-500 shadow"
              >
                <CiHeart className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3 text-gray-800">
            <h2 className="text-xl font-bold text-gray-900 truncate">
              {user.name}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-red-100 text-red-600 font-medium rounded">
                {user.age} yosh
              </span>
              <span
                className={`px-2 py-1 rounded font-medium ${
                  user.isMarried
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user.isMarried ? "Married" : "unMarried"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TfiUser className="text-blue-500 w-4 h-4" />
              <span className="font-medium">{user.profession}</span>
            </div>

            <label className="inline-flex items-center gap-2 text-sm pt-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={user.isMarried}
                onChange={() => toggleMarried(user.id)}
                className="rounded border-gray-300 text-red-500 focus:ring-0"
              />
              {user.isMarried ? "Married" : "unMarried"}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
