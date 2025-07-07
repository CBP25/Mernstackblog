import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Contact } from "./Pages/Contact";
import { CreateBlog } from "./Pages/CreateBlog";
import { Home } from "./Pages/Home";
import { Landing } from "./Pages/Landing";
import { Profile } from "./Pages/Profile";
import { ReadBlog } from "./Pages/ReadBlog";
import { About } from "./Pages/About";
import { Layout } from "./Components/Layout";
import "../Sass/Style.scss"
import axios from "axios";
import { useEffect } from "react";

function App() {

      useEffect(() => {
        let token = sessionStorage.getItem("User")
        if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
        
    }, [])
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home/>} />
              <Route path="/createblog" element={<CreateBlog/>} />
              <Route path="/readblog/:id" element={<ReadBlog/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
            </Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
