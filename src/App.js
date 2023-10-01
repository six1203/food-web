import {BrowserRouter,Routes,Route} from 'react-router-dom'

// 导入页面组件
import Login from "./views/login/Login";
import Layout from "./views/layout/Layout";
import Food from "./views/Food/Food";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/layout" element={<Layout/>}>
            <Route path='food' element={<Food/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
