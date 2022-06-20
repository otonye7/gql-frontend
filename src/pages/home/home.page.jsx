import React, { useContext } from "react";
import { AuthContext } from "../../component/context/auth";
import CreateProduct from "../../component/create-product";

const Home = () => {
    const { user } = useContext(AuthContext)
    return(
        <>
        {user && (
            <CreateProduct />
        )}
        <div>
            This is the Home page
        </div>
        </>
      
    )
}
export default Home