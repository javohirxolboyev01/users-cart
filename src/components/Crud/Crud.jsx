import { api } from "../../api";
//  Get
export const getDrinks = async () => {
  const res = await api.get("/users");
  return res.data;
};
// Post
export const createDrink = async (newDrink) => {
  const res = await api.post("/users", newDrink);
  return res.data;
};
// Put
export const updateDrink = async (updatedDrink) => {
  const res = await api.put(`users/${updatedDrink.id}`, updatedDrink);
  return res.data;
};
// Delete
export const deleteDrink = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
