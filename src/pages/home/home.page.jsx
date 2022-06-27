import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { AuthContext } from "../../component/context/auth";
import CreateProduct from "../../component/create-product/createproduct.component";
import PostCard from "../../component/postcard/postcard.component";
import { FETCH_POST_QUERY } from "../../utils/graphql";

const Home = () => {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POST_QUERY)

    return(
        <>
        {user && (
            <CreateProduct />
        )}
        <br />
        <br />
        <div>
            {
                loading ? (
                    <h1>Loading Posts</h1>
                ) : (
                    <div>
                        {
                            data.getPosts && data.getPosts.map((post) => (
                                <div key={post.id}>
                                    <PostCard post={post} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
        </>
      
    )
}
export default Home
