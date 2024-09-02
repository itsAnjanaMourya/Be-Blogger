import React, {useState, useEffect, useContext} from "react"
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment"
import { AuthContext } from "../context/authContext";
import { Link, useLocation, useNavigate} from "react-router-dom";

const Single = () => {
  const [post,setPost] = useState([])
   
  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2]
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
  console.log(post)
  const {currentUser} = useContext(AuthContext)

    useEffect(()=>{
      const fetchData = async ()=>{
        try{
          const res = await axios.get(`${apiUrl}/posts/${postId}`)
          console.log("SINGLE", res.data)
          setPost(res.data)

        }catch(err){
          console.log(err)
        }
      }
      fetchData();
    }, [postId])
  
  const handleDelete = async ()=>{
    try{
      let access_token="";
      document.cookie.split(";").map(s=>{access_token=s.startsWith("access")?s.substring("access_token=".length):""});
      console.log("token", access_token)
     
      await axios.delete(`${apiUrl}/posts/${postId}` ,{data:{access_token: access_token}})
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return(
    <div className="single">
      <div className="content">
            <img src={post?.img?.startsWith('http') ? post.img : `/upload/${post.img}`} alt=""/>
        <div className="user">
          <img className="userPic" src={post?.userImg?`/upload/${post.userImg}`:"/abc.png"} alt=""/>
            
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
          {currentUser?.username === post?.username && (<div className="edit">
            <Link to={`/write?edit=2`} state={post}>
            <img src={Edit} alt=""></img>
            </Link>
          <img onClick={()=>handleDelete()} src={Delete} alt=""></img>
          </div>
          )}
          </div>
          <h1>{post.title}</h1>
          {getText(post.desc)}
          </div>
          <Menu cat={post.cat}/>
    </div>
  );
};
export default Single