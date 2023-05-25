import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { UserAuth } from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import playImage from '../assets/play.png';
import pauseImage from '../assets/pause.png';
import arrowImage from '../assets/arrow.png';

function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const { logout } = UserAuth();
  const {user} =  UserAuth();
  const secondSectionRef = useRef(null);


  //window.location.reload();
 /* useEffect(() => {
    const audioElement = document.getElementById("mysong");
    audioElement.addEventListener("ended", () => setIsPlaying(false));

    // تشغيل الأغنية عند فتح الصفحة
    audioElement.play();
    setIsPlaying(true);

    return () => {
      audioElement.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);*/

  // useEffect(()=>{
  //   window.location.reload();
  // },[user])
  const handleClick = () => {
    navigate("/Rode");
  };


  const scrollToSection = () => {
    secondSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home_disgin">
      <nav className="home_nav">
        {/*<h1 className="home_logo"><img src="https://www.animatedimages.org/data/media/532/animated-chicken-image-0135.gif" alt="" /></h1>*/}
        <ul className="home_ul">
          <li><a className='anchor-tag' href='/About'>About</a></li>
          <li><a className='anchor-tag' href='/Map'>Map</a></li>
          <li><a className='anchor-tag' href='/Rode'>Ride</a></li>
          
          {!user && (<li><a className='anchor-tag' href='/Login'>Login</a></li>)}
          {!user && (<li><a className='anchor-tag' href='/Register'>Sign up</a></li>)}
          
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
  <h2>About Our Website</h2>
  <div className="boxes_container">
    <div className="box">
      <img src="https://i.insider.com/55cbed0769bedd17108b9520?width=400&format=jpeg&auto=webp" alt="Image 1" />
      <p>Enjoy the freedom to choose the driver and the trip</p>
    </div>
    <div className="box">
      <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTVkZmQyNzljNzJhZWNmZjhkOTJiNTNkNjQ1NjJiYzcxMjk3Y2NiNCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/xUNd9H0CFkQEhKjkiI/giphy.gif" alt="Image 2" />
      <p>A huge group of trips and important places that people frequent are in advance trips</p>
    </div>
    <div className="box">
      <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY5OGZmNTQyNmE5MjY5MzE5OWIwMjI3ZTg5OTljOWUzNWZlOGExOSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/PFcs9Cg7T3It2scVlN/giphy.gif" alt="Image 3" />
      <p>Privacy is the basis for the application's work. Don't worry, all your data is safe</p>
    </div>
  </div>
</div>



    </div>
  );
}

export default Home;
