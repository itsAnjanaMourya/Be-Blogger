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
    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 3,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 4,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //   ];
    
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