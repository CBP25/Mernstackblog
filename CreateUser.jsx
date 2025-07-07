import { createUser } from "../Api";
import { useState } from "react";

export function CreateUser() {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response = await createUser(user);

      if (response.status === 200) {
        alert(response.data.message); // Success alert
        window.location.reload(); // reloads the page
      }
    } catch (error) {
      // Handle validation error or server error
      if (error.response.status === 400) {
        alert(error.response.data.message); // Alert for "Email already exists"
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={handleChange}
          name="Name"
          required
          maxLength={30}
        />
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
