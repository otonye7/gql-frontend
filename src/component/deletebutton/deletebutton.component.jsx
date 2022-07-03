import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import ConfirmModal from "../confirmModal/confirmModal.component";

const DeleteButton = ({ postId }) => {
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(){

        },
        variables: {
            postId
        }
    })
    return(
        <div>
            <button>Delete Trash</button>
            <ConfirmModal />
        </div>
    )
}

const DELETE_POST_MUTATION  = gql `
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton