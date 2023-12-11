import React, { useEffect, useState  } from "react"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useLocation} from "react-router-dom";
import axios from "axios";
const Home = () => {
   const [posts,setPosts] = useState([])
   const [expand, setExpand] = useState({})
   const { currentUser } = useContext(AuthContext)
   
  const cat = useLocation().search
    useEffect(()=>{
      const fetchData = async ()=>{
        try{
          let res;
          if(cat=="?cat=myBlog"){
            let access_token="";
            console.log(document.cookie)
            document.cookie.split(";").map(s=>{access_token=s.startsWith("access")?s.substring("access_token=".length):""});
            console.log("token",access_token)
            res=await axios.post(`http://localhost:8800/api/posts/myBlog`, {access_token:access_token})
          }
          else{
            res = await axios.get(`http://localhost:8800/api/posts/${cat}`)
          }
          console.log("Home",res)
          
        // Decode BLOB data before setting the state
        // const postsWithDecodedDesc = res.data.map(post => ({
        //   ...post,
        //   desc: getText(post.desc),
        // }));

        // setPosts(postsWithDecodedDesc);
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


// const readFunction=(e)=>{
  //     console.log("readadadadadadad")
  //     const readMoreBtn = document.getElementById('readMoreBtn');
  //      let postContent = document.getElementById('postContent');  
  //   //  console.log("iiiiiiiiiii",postContent.style.maxHeight)
  //   //  console.log("..............",postContent.textContent.length)
  //   //  console.log("..............",postContent.textContent)
  //         // Toggle the 'read more' state by changing the max-height property
  //         if (postContent.style.maxHeight) {
  //           postContent.style.maxHeight = null;// Show full content
  //           readMoreBtn.textContent = 'Read Less';
  //       } else {
           
  //           postContent.style.maxHeight = "100px"; 
  //           readMoreBtn.textContent = 'Read More';// Show partial content
  //       }
  
  // }
  

// const posts = [
//       {
//         id: 1,
//         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//         img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       },
//       {
//         id: 2,
//         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//         img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       },
//       {
//         id: 3,
//         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//         img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       },
//       {
//         id: 4,
//         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//         img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       },
//     ];
