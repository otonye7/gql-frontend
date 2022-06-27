import './App.css';
import Home from './pages/home/home.page';
import { Routes, Route } from 'react-router-dom';
import Register from './component/register/register.component';
import Login from './component/login/login.componet';
import Header from './component/header/header.component';
import SinglePost from './component/singlepost/singlepost.component';
import { AuthProvider } from "../src/component/context/auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Header />
        <Routes>
        <Route  path={'/'} exact={true}  element={<Home />} />
        <Route  path={'/register'} exact={true}  element={<Register />} />
        <Route  path={'/login'} exact={true}  element={<Login />} />
        <Route exact path={'/posts/:postId'} element={<SinglePost />} />
       </Routes>
      </AuthProvider>
    
    </div>
  );
}

export default App;
