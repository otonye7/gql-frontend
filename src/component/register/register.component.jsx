import  React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import "../register/register.css";
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../utils/custom-hooks';
import { AuthContext } from "../context/auth"

const Register = () => {
  const context = useContext(AuthContext)
  const history = useNavigate(); 
  const [errors, setErrors] = useState({});
  const { handleChange, handleSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { username, email, password, confirmPassword } = values
 
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }){
      context.login(userData)
      history('/')
    },
    onError(err){
      console.log(errors)
      setErrors(err.graphQLErrors[0].extensions.password)
    },
    variables: values
  })
  function registerUser(){
    addUser()
  }
  return (
    <>
    <form onSubmit={handleSubmit} className='register-container'>
        <div className='title-container'>
            <h2 className='title-text'>Register</h2>
        </div>
        
        <div className="input-form">
           <TextField 
           className="text-field"
           label="Username"
           name="username"
           type="text"
           value={username}
           onChange={handleChange}
           variant="outlined" />
        </div>
        <br />
        <div className="input-form">
           <TextField
            className="text-field"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            variant="outlined" />
        </div>
        <br />
        <div className="input-form">
            <TextField 
            className="text-field"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            variant="outlined" />
        </div>
        <br />
        <div className="input-form">
            <TextField 
             className="text-field"
             label="Confirm Password"
             name="confirmPassword"
             type="password"
             value={confirmPassword}
             onChange={handleChange}
             variant="outlined" />
        </div> 
        <br />
        <div className="input-form">
          <button>Register</button>
        </div>
    </form>
    {/* {Object.keys(errors).length > 0 && (
        <div className="">
          <ul className="">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
}

const REGISTER_USER = gql`
   mutation register(
     $username: String!
     $email: String!
     $password: String!
     $confirmPassword: String!
   ) {
     register(
       registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
       }
     ) {
       id email username createdAt token
     }
   }
`

export default Register;




