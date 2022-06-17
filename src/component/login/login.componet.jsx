import  React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import "../register/register.css";
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../utils/custom-hooks';
import { AuthContext } from "../context/auth"

const Login = () => {
  const context = useContext(AuthContext)
  const history = useNavigate(); 
  const [errors, setErrors] = useState({});
  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
    email:"",
    password:""
  })
  const { email, password } = values

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }){
      context.login(userData)
      history('/')
    },
    onError(err){
      console.log(errors)
      // setErrors(err.graphQLErrors[0].extensions.password)
    },
    variables: values
  })
  function loginUserCallback(){
    loginUser()
  }
  
  return (
    <>
    <form onSubmit={handleSubmit} className='register-container'>
        <div className='title-container'>
            <h2 className='title-text'>Login</h2>
        </div>
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
          <button>Login</button>
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

const LOGIN_USER = gql`
   mutation login(
     $email: String!
     $password: String!
   ) {
     login(
        email: $email
        password: $password
     ) {
       id email username createdAt token
     }
   }
`

export default Login;

