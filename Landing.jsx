import { CreateUser } from "../Components/createUser";
import { Login } from "../Components/Login";
import { logoImg } from "../Components/Datas";
import { useState } from "react";
import "../../Sass/_landingPage.scss";
export function Landing() {
  const [view, setView] = useState(0);

  return (
    <div className="landing-container">
      <img className="logo" src={logoImg} alt="Logo" />
      <p>Inspire to learn new things</p>
      <div className="form-container">
        {!view ? (
          <div>
            <h2>Sign In</h2>
            <Login />
            <p  className="buttom-page"  >Don't have an account?
            <button className="switch-btn"
              onClick={() => setView(!view)}
            >
             Click here
            </button>
            </p>
          </div>
        ) : (
          <div>
            <h2>Sign Up</h2>
            <CreateUser />
            <p  className="buttom-page">Already have an account?
            <button className="switch-btn"
              onClick={() => setView(!view)}
            >
             Login here
            </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
