import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../img/logo.png"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios"

const Navbar = () => {
  const [profileShow, setProfileShow] = useState(false)
  const { currentUser, logout } = useContext(AuthContext)

  const [userImg, setUserImg] = useState(currentUser?.userImg?currentUser.userImg:null)

      const updateProfile = (e)=>{
        const update =async()=>{
          let access_token=""
          document.cookie.split(";").map(s=>{access_token=s.startsWith("access")?s.substring("access_token=".length):""});
          console.log("oooooooooo",document.cookie)
          console.log(userImg)
          const formData = new FormData()
          formData.append("file",e.target.files[0])
          formData.append("access_token", access_token)
          const res = await axios.post("http://localhost:8800/api/profileUpload",formData, {access_token})
         console.log("response data", res.data)
         console.log("response data", res.data.msg)
          setUserImg(res.data.filename)
        }
          update();
      }

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {currentUser?<>
            <div style={{zIndex:1000}}>
            <img onClick={()=>setProfileShow(!profileShow)} className="userProfile" src={userImg?`/upload/${userImg}`:"abc.png"} alt=""></img>
            </div>
            <div className={profileShow?"profile":"profileHide"}>
              <div style={{display:"flex", flexDirection: "column", gap: "8px"}}>
                <input style={{display: "none"}} accept="image/*" type="file" id="file" onChange={updateProfile}></input>
                <label htmlFor="file"><img className="" src={userImg?`/upload/${userImg}`:"abc.png"} alt=""></img></label>
                <span><div style={{fontSize:"20px", color:"#087171"}}>{currentUser.username}</div></span>
                <span><Link onClick={()=>setProfileShow(!profileShow)} className="link" to="/?cat=myBlog">MyBlog</Link></span>
                <span><Link className="link" onClick={() => logout()} to="/">Logout</Link></span>
              </div>
            </div> 
          </>:<></>}
          {!currentUser ?
            <Link className="link" to="/login"><h6>Login</h6></Link>
            :<></>
          }
           <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>

        </div>
      </div>
    </div>
  );
};

export default Navbar