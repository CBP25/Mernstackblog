import "../../Sass/_about.scss"; // Import SCSS properly


export function About() {
  return (
    <div>
      <div className="aboutHeader"><h1>About This Blog</h1></div>
      <div className="aboutWrapper">
        <div className="aboutContent">
          <div className="rowabout">
            <p className="larger">
            This blog is a personal learning space where I document my 
            journey through my master's degree, along with other knowledge 
            I gather along the way. From coding and technology to cooking 
            and creative design, this platform serves as a reflection of my 
            continuous growth and curiosity.
            </p>
           <img src="https://myblogbucketlist.s3.ap-southeast-1.amazonaws.com/received_1357643782028278.jpeg">
           </img>
          </div>
          <div className="rowabout">
          <p className="centerP largest">
            You can collaborate with me to add your own learnings by creating 
            blogs and sharing them on this platform. Together, we can build a 
            rich collection of knowledge that benefits everyone—whether it's 
            for reviews, reference, or simply to learn something new. 
            Let's create an engaging and informative space where we 
            all grow together!
          </p>
          </div>
          <div className="aboutWrapper">
          <h2>About Me</h2>
            <div className="rowabout">
          <img src="https://myblogbucketlist.s3.ap-southeast-1.amazonaws.com/received_1357643782028278.jpeg">
          </img>
          <p className="larger">
            I am a graphic designer working in a pharmaceutical company, 
            focusing on creating visual content that aligns with our 
            mission of improving healthcare outcomes. My role involves 
            collaborating with various departments to design materials 
            that are both visually appealing and effective in communicating 
            medical information to diverse audiences. This includes a 
            range of materials such as marketing collateral, educational 
            brochures, digital assets, and social media graphics.
          </p>
            </div>
          </div>
          <div className="aboutWrapper">
            <div className="rowabout">
              <p className="larger">
              Prior to this, I spent five years as a web designer in a BPO 
              company. During this time, I gained experience in creating 
              user-friendly websites and digital interfaces. This role 
              helped me develop a keen eye for detail and a solid foundation 
              in design principles, such as color theory, typography, 
              and layout. I worked on a variety of projects, including 
              corporate websites and e-commerce platforms, which allowed 
              me to build a versatile skill set and adapt to different 
              design challenges.
            </p>
              <img src="https://myblogbucketlist.s3.ap-southeast-1.amazonaws.com/received_1357643782028278.jpeg">
            </img>
            </div>
          </div>
          <div className="rowabout">
            <p className="largest centerP">
              I enjoy the process of blending creativity with 
              functionality to create visual communications that 
              are both effective and engaging. Good design, 
              in my view, is not only about aesthetics but 
              also about solving problems and enhancing user 
              experiences. Whether working on websites, brochures, 
              or social media content, I aim to ensure that my 
              work is both attractive and purposeful. 
              I continue to learn and stay updated with the 
              latest design trends and technologies to contribute 
              effectively to my team and our projects.
            </p>
          </div>
          <div className="aboutWrapper">
              <h3>Portfolio</h3>
              <ul>
                <li><a href="https://christianpaulbaron.netlify.app/" 
                target="_blank" rel="noopener noreferrer">
                  <img src="https://myblogbucketlist.s3.ap-southeast-1.amazonaws.com/received_1357643782028278.jpeg">
                  </img>
                  </a></li>
                <li><a href="https://www.behance.net/v1varo" target="_blank" 
                rel="noopener noreferrer">
                  <img src="https://myblogbucketlist.s3.ap-southeast-1.amazonaws.com/received_1357643782028278.jpeg">
                  </img>
                  </a></li>
              </ul>
          </div>
          </div>
      </div>
    </div>
  );
}
