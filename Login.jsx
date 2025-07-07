import { verifyLogin } from "../Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  axios from "axios";

export function Login() {
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  const navigate = useNavigate()
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value }); // Spread all the attributes of an object
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    let response = await verifyLogin(user);
    if (response) {
      alert("Log in successfully");
      sessionStorage.setItem("User",response)
      axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
      navigate("/home");
    }
  } catch (err) {
    // Display the error message to the user
    alert(err.message);
    console.error("Login Error:", err.message);
  }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="Email"
          required
          maxLength={30}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="Password"
          required
          maxLength={30}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
