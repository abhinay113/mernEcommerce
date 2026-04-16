import React,{useState} from 'react'
import API from '../api/axios'
import {useNavigate} from 'react-router-dom'
import "./Login.css"
export default function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    function handleLogin(e){
        e.preventDefault()
        API.post("/auth/login",{email,password})
            .then((res)=>{
                if(res.status==200){
                    alert("Login successful")
                    localStorage.setItem("token",res.data.token)
                    navigate("/")
                }
            })
            .catch(err=>{
                console.log(err)
                if(err.status==401){
                    alert(err.response.data.message)
                    return
                }
            })
    }
  return (
    <div className="login-container ">
  <form onSubmit={handleLogin}>
    <h2>Login</h2>

    <div className="mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button className="btn btn-primary">Login</button>
  </form>
</div>
  )
}