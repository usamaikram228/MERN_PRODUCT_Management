
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './Components/Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import Login from './Components/login';
import AddProduct from './Components/AddProduct';
import Home from './Components/Home';
import MyProducts from './Components/MyProducts';
import PrivateComponent from './Components/Private';
function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path='/my-products' element ={<MyProducts/>} />
          <Route path='/add-product' element ={<AddProduct/>} />
          <Route path='/update' element ={<h1>This is update page</h1>} />
          </Route>

          <Route path='/' element ={<Home/>} />
          <Route path='/login' element ={<Login/>} />
          <Route path='/signup' element ={<SignUp/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
