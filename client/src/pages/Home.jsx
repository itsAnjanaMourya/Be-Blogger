
import React, { useEffect, useState  } from "react"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useLocation} from "react-router-dom";
import axios from "axios";
const Home = () => {
   const [posts,setPosts] = useState([])
   const [expand, setExpand] = useState({})
   const { currentUser } = useContext(AuthContext)
   

   const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

  const cat = useLocation().search
    useEffect(()=>{
      console.log("from d",apiUrl)
      const fetchData = async ()=>{
        try{
          let res;
          if(cat=="?cat=myBlog"){
            let access_token="";
            console.log(document.cookie)
            document.cookie.split(";").map(s=>{access_token=s.startsWith("access")?s.substring("access_token=".length):""});
            console.log("token",access_token)
            res=await axios.post(`${apiUrl}/posts/myBlog`, {access_token:access_token}, { withCredentials: true })
          }
          else{
            res = await axios.get(`${apiUrl}/posts/${cat}`, { withCredentials: true })
          }
          console.log("Home",res)
          
        setPosts(res.data)
      } catch (err) {
        console.log(err);
      }
      }
      fetchData();
    }, [cat])
    
    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
    }
    

    return(
          <div className='home'>
          <div className="posts">
          {currentUser&&cat=="?cat=myBlog"?
            <span style={{marginLeft: "20px", fontSize: "40px", fontWeight: "800", color:"#128585"}}>{currentUser.username}'s Posts</span>
            :<></>
          }
          {posts.map((post) => (
            <div className="post" key={post.id}>
            <Link className="img" to={`/post/${post.id}`}>
              <div className="img">
                 <img src={post?.img?.startsWith('http') ? post.img : `http://localhost:5173/upload/${post.img}`} alt="" id="HomePost"/>
              </div>
              </Link>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1 id="titlePost">{post.title}</h1>
                </Link>
                <div id={`${expand==post.id?"postContentExpand":"postContent"}`}>
                <p>{getText(post.desc)}</p>
                </div>
                <button onClick={()=>expand==post.id?setExpand(""):setExpand(post.id)} id="readMoreBtn" >{`${expand==post.id?"Read Less":"Read More"}`}</button>
              </div>
            </div>
          ))}
          </div>
          </div>
  );
};
export default Home
