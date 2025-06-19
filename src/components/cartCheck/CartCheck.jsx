import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/feature/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import Humo from "../../assets/Pay carta/Humo.webp";
import Click from "../../assets/Pay carta/click.webp";
import Payme from "../../assets/Pay carta/payme.webp";
import Uzum from "../../assets/Pay carta/uzum.webp";

const CartCheck = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm flex flex-col sm:flex-row items-center p-4 gap-4"
              >
                <img
                  src={item.img}
                  alt="rasm"
                  className="w-32 h-32 object-contain border rounded-lg p-2 bg-white"
                />

                <div className="flex-1 w-full">
                  <h3 className="text-md font-medium text-gray-900">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center border rounded overflow-hidden">
                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity({ id: item.id }))
                        }
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 bg-white text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(increaseQuantity({ id: item.id }))
                        }
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right font-bold text-lg text-blue-700">
                      {(item.price * item.quantity).toLocaleString()} $
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-24 text-lg">
              Savatcha bo‘sh 😔
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Umumiy:</h2>
              <span className="text-xl font-bold text-green-600">
                {totalPrice.toLocaleString()} $
              </span>
            </div>

            <h3 className="text-sm text-gray-500 mb-2">To‘lov turlari:</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <img src={Humo} alt="Humo" className="w-18 h-8 object-contain" />
              <img
                src={Click}
                alt="Click"
                className="w-30 h-20 object-contain"
              />
              <img
                src={Payme}
                alt="Payme"
                className="w-30 h-16 object-contain"
              />
              <img src={Uzum} alt="Uzum" className="w-20 h-12 object-contain" />
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold transition">
              To‘lovni davom ettirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartCheck;
