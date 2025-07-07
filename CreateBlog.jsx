import { createPost } from "../Api";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import * as jwtDecode from "jwt-decode";
import "../../Sass/_createBlog.scss";


export function CreateBlog() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [user, setUser] = useState({});
  const [Content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  const navigate = useNavigate(); // Initialize navigate
  const [file, setFile] = useState();
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

  const inputFile = useRef(null);
  useEffect(() => {
      async function loadUserData() {
        const token = sessionStorage.getItem("User");
        if (token) {
          const decodedUser = jwtDecode.jwtDecode(token);
          setUser(decodedUser);
        }
      }

      loadUserData(); // Load posts
  
    }, [user.Name]);
  
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true); // Block further submissions until the current one is done

    let submitObj = {
      Title: Title,
      Description: Description,
      Content: Content,
      Author: user.Name,
      Date: new Date(),
      file: file
    };

    try {
      await createPost(submitObj);
      alert("Blog submitted successfully!");
      setTitle("");
      setDescription("");
      setContent("");

      // Redirect to home page after successful submission
      navigate("/home"); // Redirects to "http://localhost:5173/#/home"
    } catch (error) {
      console.error("Error submitting the blog:", error);
    } finally {
      setIsSubmitting(false); // Allow submission again
    }
  }
  function handFileUpload(e){
      const file = e.target.files[0]
      const fileExtension = file.name.substring(file.name.lastIndexOf("."));

      if(fileExtension!=".jpg" && fileExtension!=".png" && fileExtension!=".jpeg"){
        alert ("File must be jpg, jpeg, or png");
        inputFile.current.value = "";
        inputFile.current.type = "file";
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        alert("Hanggang 2 mb lng po")
        inputFile.current.value = "";
        inputFile.current.type = "file";
        return
      }
      setFile(file)
  }
  return (
    <div className="createBlog-container">
      <div className="div_header"><h1 className="header">Create a Blog</h1></div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Blog Title: </label>
          <input
            name="Title"
            value={Title}
            placeholder="Enter the title"
            onChange={(c) => setTitle(c.target.value)}
            maxLength={75}
            required
          />
          <label>Blog Description: </label>
          <input
            name="Description"
            placeholder="Enter the Description"
            value={Description}
            onChange={(c) => setDescription(c.target.value)}
            maxLength={200}
            required
          />
          <label>Blog Content: </label>
          <textarea
            name="Content"
            placeholder="Enter the Content[can also paste html tag here for customization]"
            value={Content}
            onChange={(c) => setContent(c.target.value)}
            maxLength={1000}
            required
          />
          <label>Insert Header Image</label>
          <input className="file_style" type="file" onChange={handFileUpload} ref={inputFile} required/>
          <button type="submit" disabled={isSubmitting} className="button">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      
    </div>
  );
}
