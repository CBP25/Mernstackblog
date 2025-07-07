import { NavLink, Link, useNavigate } from "react-router-dom";
import { Datas, logoImg } from "./Datas";
import MobileMenu from "./mobileMenu";
import { useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";

export function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 🔥 Mobile Menu State

  // Disable scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // Check token expiration on component mount
  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      if (token) {
        try {
          const decodedUser = jwtDecode.jwtDecode(token);

          // Check token expiration
          const currentTime = Date.now() / 1000;
          if (decodedUser.exp < currentTime) {
            sessionStorage.removeItem("User");
            alert("Your session has expired. Please log in again.");
            navigate("/"); // Redirect to landing page if token is expired
          } else {
            setUser(decodedUser);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        navigate("/"); // Redirect if no token found
      }
    }
    loadUserData();
  }, [navigate]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  function handleLogout() {
    sessionStorage.removeItem("User");
    setShowLogoutMessage(true);
    setTimeout(() => {
      setShowLogoutMessage(false);
      navigate("/"); // Redirect to landing page after logout
    }, 1500);
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? "fixed" : ""}`}>
        <div className="logo">
          <Link to="/home">
            <img src={logoImg} alt="Logo" />
          </Link>
        </div>

        {/* 🔥 Mobile Hamburger Button */}
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        {isMenuOpen && (
          <MobileMenu user={user} datapages={Datas} setIsMenuOpen={setIsMenuOpen} handleLogout={handleLogout} />
        )}

        {/* 🔥 Nav Links - Show on Desktop / Toggle on Mobile */}
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {Datas.map((datapage) => (
            <NavLink
              to={datapage.path}
              key={datapage.path}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={() => setIsMenuOpen(false)} // Close menu when a link is clicked
            >
              {datapage.name}
            </NavLink>
          ))}
        </div>

        {/* 🔥 User Section - Show on Desktop / Hide on Mobile */}
        <div className="user-section">
          <p>
            <strong>
              Hello, <Link to="/profile" className="profile">{user.Name?.split(" ")[0]}</Link>
            </strong>
          </p>
          <button onClick={handleLogout} className="logout-btn">
            Log out
          </button>
        </div>
      </nav>

      {/* 🔥 Custom Logout Notification */}
      {showLogoutMessage && (
        <div className="logout-toast">
          <p><strong>{user.Name?.split(" ")[0]}</strong><br />is Logged out</p>
        </div>
      )}
    </>
  );
}
