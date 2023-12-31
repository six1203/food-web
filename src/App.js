import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 导入页面组件
import Login from './pages/login/Login';
import Layout from './pages/layout/Layout';
import Food from './pages/food/Food';
import Cookbook from './pages/cookbook/Cookbook';
import Wheel from './pages/wheel/Wheel';
import Order from './pages/order/order';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/layout" element={<Layout />}>
          <Route path="food" element={<Food />} />
          <Route path="cookbook" element={<Cookbook />} />
          <Route path="wheel" element={<Wheel />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
