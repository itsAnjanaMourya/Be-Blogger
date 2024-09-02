import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

const Menu = ({cat}) => {
  const [posts,setPost] = useState([])


  const id = location.pathname.split("/")[2]
    useEffect(()=>{
      const fetchData = async ()=>{
        try{
          const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`)
          setPost(res.data)

        }catch(err){
          console.log(err)
        }
      }
      fetchData();
    }, [cat])
   
    return (
        <div className='menu'>
        <h1>Other post you may like</h1>
        {posts.filter(post=>post.id!=id).map((post) => (
          <Link className="link" to={`/post/${post.id}`}>
            <div className="post" key={post.id} >
            <img src={post?.img?.startsWith('http') ? post.img : `/upload/${post.img}`} id="menuPost"></img>
            <h2>{post.title}</h2>
            <button>Read More</button>
            </div>
        </Link>
    ))}
    </div>
);
};
export default Menu