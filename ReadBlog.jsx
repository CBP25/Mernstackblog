import { getPost, updatePost, deletePost,  } from "../Api";
import { getImage } from "../Api";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import "../../Sass/_readBlog.scss";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${month}-${day}-${year}`;
}

export function ReadBlog() {
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [user, setUser] = useState({});

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPost() {
      let data = await getPost(id);
      setPost(data);
      setEditedPost(data);
    }
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      if (token) {
        try {
          const decodedUser = jwtDecode.jwtDecode(token);
          setUser(decodedUser);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
    loadPost();
    loadUserData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      alert("Blog Deleted successfully!");
      navigate("/home");
    } catch (e) {
      console.error("Error deleting post:", e);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  function handleChange(e) {
    setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const updatedPost = { ...editedPost, Author: post.Author };
    const response = await updatePost(id, updatedPost);
    if (response.status === 200) {
      alert("Post updated successfully!");
      setPost(updatedPost);
      setIsEditing(false);
    }
  }

  return (
      <div className="readContainer">
      <div className="readHeader">
          <h1>{post.Title}</h1>
          {post.image ? <img src={post.image.data} alt="Blog Image" className="headImage" draggable={false}
          /> : <p>No Image Available</p>}
      </div>
      <div className="contentWrapper">
      <div className="credentials"><p><strong>Written By: </strong>{post.Author?.split(" ")[0]}</p>
      <p><strong>Posted: </strong>{formatDate(post.Date)}</p>
      </div>
      <p className="blogBodydesc"><strong>Description: </strong>{post.Description}</p>
      <div className="blogBody" dangerouslySetInnerHTML={{ __html: post.Content }} />
      </div>
      
      <div className="editButtons">
        {user && user.Name === post.Author && (
          <button onClick={() => setIsEditing(true)}>Edit This Article</button>
        )}
        {user && user.Name === post.Author && (
          <button onClick={handleDelete}>Delete this Blog</button>
        )}
        <button onClick={() => navigate(-1)}>Back to Home Page</button>
      </div>
      
      {isEditing && (
        <div className="form-container">
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="Title"
              id="Title"
              value={editedPost.Title}
              onChange={handleChange}
              required
              placeholder="Enter the title"
              maxLength={75}
            />
          </div>
          
          <div>
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              name="Description"
              id="Description"
              value={editedPost.Description}
              onChange={handleChange}
              required
              placeholder="Enter the description"
            />
          </div>
          
          <div>
            <label htmlFor="Content">Content</label>
            <textarea
              name="Content"
              id="Content"
              value={editedPost.Content}
              onChange={handleChange}
              required
              placeholder="Enter the Content[can also paste html tag here for customization]"
            />
          </div>
  
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
</form>
        </div>
      )}

      
    </div>
  );
}
