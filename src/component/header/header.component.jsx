import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import "./header.css";

const Header = () => {
    const { user, logout } = useContext(AuthContext)
    return(
        <div className="container">
            <Link to="/" className="header">Home</Link>
            <div className="bottom">
                <Link className="register" to="/register">REGISTER</Link>
                {
                    user ? <Link onClick={logout} className='login' to="/login">LOGOUT</Link> : <Link className="login" to="/login">LOGIN</Link>
                }
            </div>
        </div>
    )
}

export default Header