import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Write = () => {

  const state = useLocation().state

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");


  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const upload = async ()=>{
    try{
      const formData = new FormData()
      formData.append("file",file)
      const res = await axios.post(`${apiUrl}/upload`,formData)
      return res.data
    }catch(err){
      console.log(err)
    }
  }

  const handleClick = async e=>{
    e.preventDefault()
    const imgUrl = await upload()
    try{
      let access_token=""
      document.cookie.split(";").map(s=>{access_token=s.startsWith("access")?s.substring("access_token=".length):""});
      console.log("oooooooooo",document.cookie)
      console.log("tokeni", access_token)

      state? await axios.put(`${apiUrl}/posts/${state.id}`,{
        title, desc:value, cat, img:file ? imgUrl: "",  access_token,
      } ):  await axios.post(`${apiUrl}/api/posts/`,{        
        title, desc:value, cat, img:file ? imgUrl: "", access_token,
        date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    })
      navigate("/")

    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
      if(!state){
        setTitle("")
        setValue("")
        setCat("")
      }
  },[state])

  console.log(value)
  return(
    <div className="add">
    <div className="content">
    <input type="text" value={title} placeholder="Title" onChange={e=>setTitle(e.target.value)}></input>

    <div className="editorContainer">
    <ReactQuill className="editor"
            theme="snow"
            value={value}
            onChange={setValue} 
          />
    </div>
    </div>
    <div className="menu">
      <div className="item">
      <h1>Publish</h1>
      <span>
      <b>Status: </b> Draft
      </span>
      <span>
      <b>Visbility: </b> Public
      </span>
      <input style={{display: "none"}} type="file" id="files" name="" onChange={e=>setFile(e.target.files[0])}></input>
      <div style={{fontSize:"15px", color:"#128585", cursor: "pointer"} }><label htmlFor="files">Upload Image</label></div>
      <div className="buttons">
      <button onClick={handleClick}>Publish</button>
      </div>
      </div>
      <div className="item">
      <h1>Category</h1>
      <div className="cat">
      <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}></input>
      <label htmlFor="art">Art</label>
      </div>
      <div className="cat">
      <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)}></input>
      <label htmlFor="science">Science</label>
      </div>
      <div className="cat">
      <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}></input>
      <label htmlFor="technology">Technology</label></div>
      <div className="cat">
      <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}></input>
      <label htmlFor="cinema">Cinema</label></div>
      <div className="cat">
      <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e=>setCat(e.target.value)}></input>
      <label htmlFor="design">Design</label></div>
      <div className="cat">
      <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)}></input>
      <label htmlFor="food">Food</label></div>
      </div>
    </div>
    </div>
  )
}
export default Write