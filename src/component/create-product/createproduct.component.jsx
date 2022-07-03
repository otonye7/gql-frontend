import React, { useState } from "react";
import { useForm } from "../../utils/custom-hooks";
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from "../../utils/graphql";
import { useMutation } from '@apollo/client';
import TextArea from '@mui/material/TextField';

const CreateProduct = () => {
    const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
        body: ""
    })

    const { body } = values

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
            values.body = ""
        }
    })

    function createPostCallback(){
        createPost()
    }

    return(
        <>
        <form onSubmit={handleSubmit} className='register-container'>
            <div className='title-container'>
                <h2 className='title-text'>Create Product</h2>
            </div>
            
            <div className="input-form">
               <TextArea 
               className="text-field"
               label="Post"
               name="body"
               type="text"
               value={body}
               onChange={handleChange}
               variant="outlined" 
               />
            </div>
            <br />
            <div className="input-form">
              <button>Create Post</button>
            </div>
        </form>
        </>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes {
                id username createdAt
            }
            comments {
                id body username createdAt
            }
        }
    }
`

export default CreateProduct
