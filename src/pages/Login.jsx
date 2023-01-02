import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [isRegistering, setIsRegistering] = useState(true)
const navigate = useNavigate()

useEffect(()=>{
  auth.onAuthStateChanged(user=>{
    if(user){
      navigate('/mytodos')
    }
  })
}, [])

const handleEmailChange = (event) =>{
  setEmail(event.target.value)
}

const handlePasswordChange = (event) =>{
  setPassword(event.target.value)
}

const handleConfirmPasswordChange = (event) =>{
  setConfirmPassword(event.target.value)
}

const handleSignIn = (event)=>{
  event.preventDefault()
  signInWithEmailAndPassword(auth, email, password)
  .then(()=>{
    navigate('/mytodos')
  })
  .catch(err => alert(err.message))
}


const handleRegister = (event) => {
  event.preventDefault()
  if(password===confirmPassword){
    createUserWithEmailAndPassword(auth, email, password)
    .then('/mytodos').catch(err=> alert(err.message))
  }else alert("Passwords don't match!")
}

  return (
   isRegistering ?( <div className='login'>
        <h1>Log In</h1>
        <form action="">
           
            <input onChange={handleEmailChange} type="email" name='email' placeholder='Email' value={email}/>
            
            <input onChange={handlePasswordChange} type="password" placeholder='Password' value={password}/>
            <button onClick={handleSignIn}>Log in</button>
        </form>
        <span>Not registered yet? </span>
        <span onClick={()=>{setIsRegistering(false)}} className='register-link'>Sign Up</span>
    </div>) :
    (
      <div className='register'>
      <h1>Sign Up</h1>
      <form action="">
         
          <input onChange={handleEmailChange} type="email" name='email' placeholder='Email' value={email}/>
          
          <input onChange={handlePasswordChange} type="password" placeholder='Password' value={password}/>
          <input onChange={handleConfirmPasswordChange} type="password" placeholder='Confirm password' value={confirmPassword}/>
          <button onClick={handleRegister}>Sign up</button>
      </form>
      <span>Already have an account?</span>
      <span onClick={()=>{setIsRegistering(true)}}  className='login-link'>Sign in</span>
  </div>
    )
  )
}


export default Login;