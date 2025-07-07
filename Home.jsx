import { useEffect, useState } from "react";
import { getPosts } from "../Api";
import { Link } from "react-router-dom";
import { ArchiveCard } from "../Components/ArchiveCard";
import { BannerSlider } from "../Components/BannerSlider";
import "../../Sass/_home.scss";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadAllPosts() {
      let data = await getPosts();
      if (data) {
        data.sort(
          (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
        );
        setPosts(data);
      } else {
        setPosts([]);
      }
    }
    loadAllPosts();
  }, []);

  return (
    <div>
      <BannerSlider></BannerSlider>
      <div className="homeHeader"><h1>Welcome to My Learning Blogsite</h1></div>
    <div className="Main-wrapper">
      <div className="Intro-Container">
        <div className="Col">
          <h2>Explore. Learn. Grow.</h2>
          <p>
            Dive into insightful articles and tutorials to
            enhance your knowledge.
          </p>
        </div>
        <div className="Col">
          <img src="https://myblogbucketlist.s3.ap-southeast-1.amazonaws.com/A9Rh7764s_yz4ekn_ep8.png" />
        </div>
      </div>
    </div>
    <div className="homeHeader2"><h2>Latest Posts</h2></div>
      <div className="archive-wrapper">
        <div className="archive-container">
          {posts.map((post) => (
            <div key={post._id}>
              <ArchiveCard Property={post} />
            </div>
          ))}
        </div>
      </div>
    <div className="Contact-section">
    <p>Have questions or ideas to share? We'd love to hear from you!</p>
    <Link to="/contact">
      <button className="Contact-us-button">Get in Touch</button>
    </Link>
  </div>
  </div>
  );
}
