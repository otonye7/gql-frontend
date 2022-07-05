import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import ConfirmModal from "../confirmModal/confirmModal.component";
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

const DeleteButton = ({ postId, commentId, callback }) => {
    const [show, setShow] = useState(false);
    const showModal = () => {
        setShow(!show)
    }
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy){
            setShow(false);
            if(!commentId){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                data.getPosts = data.getPosts.filter(p  => p.id !== postId);
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
            }
            if(callback) callback()
        },
        variables: {
            postId,
            commentId
        }
    })
    return(
        <div>
            <button onClick={showModal}>Delete Trash</button>
            { show ? <ConfirmModal deletePost={deletePostOrMutation} /> : null }
        </div>
    )
}

const DELETE_POST_MUTATION = gql `
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql `
     mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments {
                id
                username
                createdAt
                body
            }
        }
     }
`

export default DeleteButton