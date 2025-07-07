import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import { sendMessage } from "../Api";
import "../../Sass/_contactUs.scss";


export function Contact() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    Subject: "",
    Sender: "",
    Email:  "",
    Date: new Date(),
    Message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUser(decodedUser);
          setFormData((prev) => ({ ...prev, Sender: decodedUser.Name })); // Set sender name
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
    loadUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("User"); // Get token here
      if (!token) {
        throw new Error("User not authenticated");
      }

      await sendMessage(formData, token);
      setIsSubmitted(true); // Hide the form and show success message
      setFormData({
        Subject: "",
        Sender: user.Name,
        Email: user.Email,
        Date: new Date(),
        Message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <div>
          <div className="contactUs-container">
            <div className="div_header">
                <h1 className="header">Contact Us</h1>
            </div>
            <div className="content-successful">
              <h2 className="header2">The message was sent successfully!</h2>
                <p>Please wait for the administrator to reach you via email.</p>
                <div className="button-container">
                  <button className="button2" 
                    onClick={() => setIsSubmitted(false)}>
                      Send Another Email
                  </button>
                  <button className="button2" 
                    onClick={() => navigate("/home")}>
                      Go Back to Home Page
                  </button>
                </div>
                
             </div>  
    
          </div>
        </div>  
        
      ) : (
        <div className="contactUs-container">
          <div className="div_header">
            <h1 className="header">Contact Us</h1>
          </div>
          <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>
              Subject:
              <input type="text" name="Subject" value={formData.Subject} onChange={handleChange} required />
            </label>
            <label>
              Message:
            </label>
            <textarea name="Message" value={formData.Message} onChange={handleChange} required />
            <button type="submit">Send Message</button>
          </form>
          </div>
        </div>
      )}
    </div>
  );
}
