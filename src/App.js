import { Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import { useEffect, useState } from 'react';
import Navi from "./Components/Navi"
import {useNavigate} from "react-router-dom";
import HomePage from './Pages/HomePage';
import UserAppPost from './Pages/UserAppPost';
import AddPost from './Pages/AddPost';
import CompanyPosts from './Pages/CompanyPosts';
import Register from './Pages/Register';

function App() {

  const [isUser,setIsUser] = useState(true);
  const [login , setLogin] = useState(false);
  const [isRegister,setIsRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!login) {
      navigate("/login")
    }
  },[login])



  return (
    <>
    <Navi isUser={isUser} setIsUser={setIsUser} login={login} setLogin={setLogin} isRegister={isRegister}/>
    <Routes>
      <Route path='/login' element={ <Login isUser={isUser} setIsUser={setIsUser} login={login} setLogin={setLogin} isRegister={isRegister} setIsRegister = {setIsRegister}/>}></Route>
      <Route path='/' element={<HomePage isUser={isUser}/>}></Route>
      <Route path="/myapppost" element={<UserAppPost/>}></Route>
      <Route path="/addpost" element={<AddPost/>}></Route>
      <Route path="/mycompanypost" element={<CompanyPosts/>}></Route>
      <Route path="/register" element={<Register  isRegister={isRegister} setIsRegister = {setIsRegister} isUser={isUser}/>}></Route>
    </Routes>


    
    </>
  );
}

export default App;
