import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { UserAuth } from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

import arrowImage from '../assets/arrow.png';
import photo1 from '../image/photo1.gif';
import photo2 from '../image/photo2.gif';
import photo3 from '../image/photo3.gif';

function Home() {
  const navigate = useNavigate();
  const { logout } = UserAuth();
  const secondSectionRef = useRef(null);




  const handleClick = () => {
    navigate("/Rode");
  };

 

  const scrollToSection = () => {
    secondSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  /*https://media1.giphy.com/media/TrJpi4kQ8WnTy/giphy.gif?cid=ecf05e47dniccp5z7s7me3cxw5kv2exr8um5ll7hpfj5z2ki&ep=v1_gifs_search&rid=giphy.gif&ct=g*/
/*<img src="https://www.animatedimages.org/data/media/532/animated-chicken-image-0135.gif" alt="" />*/
  return (
    <div className="home_disgin">
      <nav className="home_nav">
        <h1 className="home_logo">BeTareeqak</h1>
        <ul className="home_ul">
          <li><a href='/About'>About</a></li>
          <li><a href='/Map'>Map</a></li>
          <li><a href='/Rode'>Road</a></li>
        </ul>
      </nav>

      <div className="home_text">
        <p>Welcome to</p>
        <h1>BeTareeqak</h1>
        <button onClick={handleClick} className="home_button">
          Start the journey now
        </button>
      </div>

     

      <button className="scroll_button" onClick={scrollToSection}>
        <img src={arrowImage} alt="Scroll Down" />
      </button>

      <div ref={secondSectionRef} className="second_section">
  <h2>Second Section</h2>
  <div className="boxes_container">
    
    <div className="box">
      <img src={ photo1} alt="" />
      <p>Enjoy the freedom to choose the driver and the trip</p>
    </div>
    <div className="box">
      <img src={ photo2} alt="Image 2" />
      <p>A huge group of trips and important places that people frequent are in advance trips</p>
    </div>
    <div className="box">
      <img src={photo3} alt="Image 3" />
      <p>Privacy is the basis for the application's work. Don't worry, all your data is safe</p>
    </div>
  </div>
</div>



    </div>
  );
}

export default Home;
