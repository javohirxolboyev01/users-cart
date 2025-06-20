import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { FiShoppingCart } from "react-icons/fi";
import { Button, Modal, Popconfirm } from "antd";
import { addToCart } from "../components/redux/feature/cartSlice";
import { TfiUser } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import {
  removeFromWishlist,
  wishlist,
} from "../components/redux/feature/wishlistSlice";

const Home = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const wishlistItem = useSelector((state) => state.wishlist.item);
  console.log(wishlistItem);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users").then((res) => res.data),
  });

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  const toggleMarried = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isMarried: !user.isMarried } : user
      )
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const postMutation = useMutation({
    mutationFn: (body) => api.post("/users", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const editMutation = useMutation({
    mutationFn: (body) => api.post("/users", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    postMutation.mutate(body, {
      onSuccess: () => {
        e.target.reset();
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading)
    return <p className="text-center text-gray-500 py-10">Yuklanmoqda...</p>;

  if (isError)
    return <p className="text-center text-red-500 py-10">Xatolik yuz berdi!</p>;

  return (
    <div className="">
      <div className="flex justify-center mt-20">
        <Button type="primary" onClick={showModal}>
          Create
        </Button>
        {isModalOpen && (
          <Modal
            title="Create Users"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={false}
          >
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700">
                Rasmi
                <input
                  type="text"
                  name="img"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Rasm kiriting"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Ism
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Ismingizni kiriting"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Yoshi
                <input
                  type="text"
                  name="age"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Yoshini kiriting"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Kasbi
                <input
                  type="text"
                  name="profession"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Kasbini kiriting"
                />
              </label>
              <button className="w-full mt-3 bg-blue-800 text-white px-2 py-1 border rounded">
                Create
              </button>
            </form>
          </Modal>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-10">
        {users.map((user) => (
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

              <div className="absolute top-2 left-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-red-100 transition">
                  <FiShoppingCart
                    onClick={() => dispatch(addToCart(user))}
                    className="text-gray-700 w-4 h-4"
                  />
                </button>
              </div>

              <div className="absolute top-2 right-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-red-100 transition">
                  {wishlistItem.some((wish) => wish.id === user.id) ? (
                    <FaHeart
                      className=" w-4 h-4  text-red-600"
                      onClick={() => dispatch(removeFromWishlist(user))}
                    />
                  ) : (
                    <CiHeart
                      className="w-4 h-4"
                      onClick={() => dispatch(wishlist(user))}
                    />
                  )}
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
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => alert(`Edit: ${user.name}`)}
                  className="px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  Edit
                </button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => handleDelete(user.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
