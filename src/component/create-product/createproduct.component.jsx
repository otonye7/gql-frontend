import React, { useState } from "react";
import { useForm } from "../../utils/custom-hooks";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';

const CreateProduct = () => {
    return(
        <>
        <form  className='register-container'>
            <div className='title-container'>
                <h2 className='title-text'>Create Product</h2>
            </div>
            
            <div className="input-form">
               <TextField 
               className="text-field"
               label="Username"
               name="username"
               type="text"
            //    value={body}
            //    onChange={handleChange}
               variant="outlined" />
            </div>
            <br />
            <div className="input-form">
              <button>Create Post</button>
            </div>
        </form>
        </>
    )
}
export default CreateProduct