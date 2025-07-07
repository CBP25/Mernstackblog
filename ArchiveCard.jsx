import { Link } from "react-router-dom";
import "../../Sass/_archiveCard.scss";

export function ArchiveCard({ Property }) {
  return (
    <Link to={`/readblog/${Property._id}`} className="archive-link">
      <div className="blog-image-container">
        <img
          src={`https://myblogbucketlist.s3.ap-southeast-1.amazonaws.com/${Property.imageId}`}
          alt="IMAGE"
          className="blog-image"
        />
      </div>
      <h3>{Property.Title}</h3>
      <p>Author: {Property.Author?.split(" ")[0]}</p>
    </Link>
  );
}
