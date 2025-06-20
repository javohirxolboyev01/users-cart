import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Wishlist from "./components/Wishlist/Wishlist";
import CartCheck from "./components/cartCheck/CartCheck";
import Carts from "./pages/Carts/Carts";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Carts />} />
          <Route path="wish" element={<Wishlist />} />
          <Route path="cart" element={<CartCheck />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
