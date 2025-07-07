import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../Api";
import * as jwtDecode from "jwt-decode";
import "../../Sass/_Profile.scss";

export function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // State to hold filtered posts
  let date = new Date(user.JoinDate);
  let stringDate = date.toString();

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      if (token) {
        const decodedUser = jwtDecode.jwtDecode(token);
        setUser(decodedUser);
      }
    }

    async function loadAllPosts() {
      let data = await getPosts();
      if (data) {
        // Sort the posts by date in descending order
        data.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

        // Filter posts by the logged-in user’s name (assuming posts have an 'author' field)
        const filtered = data.filter(post => post.Author === user.Name);
        setPosts(data); // Store all posts
        setFilteredPosts(filtered); // Store filtered posts
      } else {
        setPosts([]);
        setFilteredPosts([]);
      }
    }

    loadUserData(); // Load user data
    loadAllPosts(); // Load posts

  }, [user.Name]); // The effect will re-run when user.Name changes

  return (
    <div className="profileWrapper">
    <div className="profileHeader"><h1>Profile</h1></div>
    <div className="profileContainer">
      <div className="wrapperProfile">
          <div className="profileDetails"> 
            <p>Name:</p>
            <span className="profileInfo">{user.Name}</span>
            <p>Email:</p>
            <span>{user.Email}</span>
            <p>Join Date:</p>
            <span>{stringDate.slice(4, 15)}</span>
          </div>
          <div className="userPosts">
            <p>{user.Name}'s Recent Posts</p>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post._id}>
                  <Link className="postLinks" to={`/readblog/${post._id}`}>
                  <span>{post.Title}</span>
                  </Link>
                </div>
              ))
            ) : (
              <p>No posts Created yet for {user.Name?.split(" ")[0]}.</p>
            )}
          </div>
      </div>
      
    </div>
     
      <br></br>
      
    </div>
  );
}
