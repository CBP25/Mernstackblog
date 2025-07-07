import { Link, NavLink } from "react-router-dom";

export default function mobileMenu({ user, datapages, setIsMenuOpen, handleLogout }) {
  return (
    
    <div className="mobile-menu nav-links user-section2">
     <button className="close-btn" onClick={() => setIsMenuOpen(false)}>X</button>
      <p>
        <strong>
          Hello,{" "}
          <Link to="/profile" className="profile2" onClick={() => setIsMenuOpen(false)}>
            {user?.Name?.split(" ")[0]}
          </Link>
        </strong>
      </p>

      {datapages.map((datapage) => (
        <NavLink
          to={datapage.path}
          key={datapage.path}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setIsMenuOpen(false)} // Close menu when clicked
        >
          {datapage.name}
        </NavLink>
      ))}

      <button onClick={handleLogout} className="logout-btn2">Log out</button>
    </div>
  );
}
