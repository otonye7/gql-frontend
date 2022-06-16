import './App.css';
import Home from './pages/home/home.page';
import { Routes, Route } from 'react-router-dom';
import Register from './component/register/register.component';
import Login from './component/login/login.componet';

function App() {
  return (
    <div className="App">
        <Routes>
        <Route  path={'/'} exact={true}  element={<Home />} />
        <Route  path={'/register'} exact={true}  element={<Register />} />
        <Route  path={'/login'} exact={true}  element={<Login />} />
     </Routes>
    </div>
  );
}

export default App;
