import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDrinks,
  createDrink,
  updateDrink,
  deleteDrink,
} from "../../components/Crud/Crud";
import { Button, Modal, Form, Input, Checkbox } from "antd";
import { TfiUser } from "react-icons/tfi";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../components/redux/feature/cartSlice";
import {
  wishlist,
  removeFromWishlist,
} from "../../components/redux/feature/wishlistSlice";

const Carts = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDrink, setEditingDrink] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const wishlistItem = useSelector((state) => state.wishlist.item);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getDrinks,
  });

  const createMutation = useMutation({
    mutationFn: createDrink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateDrink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDrink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleFinish = (values) => {
    if (editingDrink) {
      updateMutation.mutate({ ...editingDrink, ...values });
    } else {
      createMutation.mutate(values);
    }
    setIsModalOpen(false);
    form.resetFields();
    setEditingDrink(null);
  };

  const openEditModal = (drink) => {
    setEditingDrink(drink);
    form.setFieldsValue(drink);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Yuklanmoqda...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6  mt-20">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Create
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

              {/* Cart icon */}
              <div className="absolute top-2 left-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition">
                  <FiShoppingCart
                    onClick={() => dispatch(addToCart(user))}
                    className="text-gray-700 w-4 h-4"
                  />
                </button>
              </div>

              {/* Wishlist icon */}
              <div className="absolute top-2 right-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-red-100 transition">
                  {wishlistItem.some((w) => w.id === user.id) ? (
                    <FaHeart
                      className="text-red-600 w-4 h-4"
                      onClick={() => dispatch(removeFromWishlist(user))}
                    />
                  ) : (
                    <CiHeart
                      className="text-gray-700 w-4 h-4"
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
                  onChange={() =>
                    updateMutation.mutate({
                      ...user,
                      isMarried: !user.isMarried,
                    })
                  }
                  className="rounded border-gray-300 text-red-500 focus:ring-0"
                />
                {user.isMarried ? "Married" : "unMarried"}
              </label>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => openEditModal(user)}
                  className="px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}

      {isModalOpen && (
        <Modal
          title={editingDrink ? "userni tahrirlash" : "Yangi user qoshish"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          okText="Saqlash"
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item name="img" label="Rasmi" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Ism" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="age" label="Yosh" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="isMarried"
              valuePropName="checked"
              label="Uylanganmi"
            >
              <Checkbox>Uylangan</Checkbox>
            </Form.Item>
            <Form.Item
              name="profession"
              label="Kasbi"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default Carts;
