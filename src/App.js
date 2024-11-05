import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import injectContext from './store/context';
import Principal from './views/Principal/Principal';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Navbar from './components/Navbar';
import Home from './views/Home/Home';

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Principal />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default injectContext(App);
