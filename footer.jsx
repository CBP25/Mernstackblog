import React from "react";
import { Link } from "react-router-dom";
import { SocialLinks } from "./Datas"; 

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="social-text">
          My Portfoiios:
          {SocialLinks.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="social-btn">
              {social.name === "Behance" ? "B" : "N"}
            </a>
          ))}
        </p>
      </div>

      <p className="footer-rights">
        &copy; {new Date().getFullYear()} <Link className="footer-rights-text" to="/home">Learning Blogs</Link>. All rights reserved.
      </p>
    </footer>
  );
}
