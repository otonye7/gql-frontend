import { useState, useEffect } from "react";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const LikeButton = ({ user, likes, id}) => {
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes])
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    })
    return(
        <div>
            {user && liked ? <button onClick={likePost}>Liked Post</button> :  <button onClick={likePost}>Not Like Post</button>  }
        </div>
    )
}

const LIKE_POST_MUTATION = gql `
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes {
                id username
            }
        }
    }
`

export default LikeButton