import React from "react"
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    userImg:"",
  })

  const [err,setError] = useState(null)

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const handleChange = (e) =>{
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.post(`${apiUrl}/auth/register`,inputs) 
      navigate("/login");
      console.log(res);
    }
    catch(err){
      console.log(err)
      setError(err.response.data);
      
    }
  };
  
  const addUserImg= async(e)=>{
    e.preventDefault();
    try{
      let access_token=""
      document.cookie.split(";").map(s=>{access_token=s.startsWith("access")?s.substring("access_token=".length):""});
      console.log("oooooooooo",document.cookie)
      navigate("/")
        const formData = new FormData()
          formData.append("userImg",userImg)
          const res = axios.post(`${apiUrl}/upload`,formData)
          return res.data
    }
    catch(err){
      console.log(err)
    }
  };
  console.log(inputs)
  return(
    <div className="auth">
    <h1>Register</h1>
    <form>
      <input required type="text" placeholder="username" name="username" onChange={handleChange} />
      <input required type="email" placeholder="email" name="email" onChange={handleChange} />
      <input required type="password" placeholder="password" name="password" onChange={handleChange} />
      <input onClick={"addUserImg"} style={{display: "none"}} type="file" id="userImg" value="" name="userImg" onChange={e=>"setUserImg"(e.target.value)}></input>
      <button onClick={handleSubmit}>Register</button>
      {err && <p>{err}</p>}
      <span>
          Do you have an account? <Link to="/login">Login</Link>
      </span>
    </form>
    </div>
  )
}
export default Register

