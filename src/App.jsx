import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Layout from "./components/Layout/Layout";
import Wishlist from "./components/Wishlist/Wishlist";
import CartCheck from "./components/cartCheck/CartCheck";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="wish" element={<Wishlist />} />
          <Route path="cart" element={<CartCheck />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
