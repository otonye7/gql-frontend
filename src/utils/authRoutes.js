import React, { useContext } from "react";
import { Route, Navigate  } from "react-router-dom";
import { AuthContext } from "../component/context/auth";

const AuthRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    
    return(
        <Route 
          {...rest}
          render={props => user ? <Navigate to="/" /> : <Component {...props} /> }
        />
    )
}

export default AuthRoute