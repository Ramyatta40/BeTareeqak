import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { UserAuth } from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import WalkerSound from '../assets/Jony-Love-your-Voice-Official-Lyrical-video-_-My-baby-I-love-my-baby-i-love-your-voice_Luvmp.com_.mp3';
import playImage from '../assets/play.png';
import pauseImage from '../assets/pause.png';
import arrowImage from '../assets/arrow.png';

function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const { logout } = UserAuth();
  const secondSectionRef = useRef(null);

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

  const handleClick = () => {
    navigate("/Rode");
  };

  const togglePlay = () => {
    const audioElement = document.getElementById("mysong");
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  };

  const scrollToSection = () => {
    secondSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home_disgin">
      <nav className="home_nav">
        {/*<h1 className="home_logo"><img src="https://www.animatedimages.org/data/media/532/animated-chicken-image-0135.gif" alt="" /></h1>*/}
        <ul className="home_ul">
          <li><a href='/About'>About</a></li>
          <li><a href='/Map'>Map</a></li>
          <li><a href='/Rode'>Rode</a></li>
        </ul>
      </nav>

      <div className="home_text">
        <p>Welcome to</p>
        <h1>BeTareeqak</h1>
        <button onClick={handleClick} className="home_button">
          Start the journey now
        </button>
      </div>

      <div className="audio_player">
        <audio id="mysong" src={WalkerSound} type="audio/mp3" />

        <div className="player_controls">
          <button id="icon" onClick={togglePlay}>
            {isPlaying ? (
              <img src={pauseImage} alt="Pause" />
            ) : (
              <img src={playImage} alt="Play" />
            )}
          </button>
          <span className={isPlaying ? 'song_title playing' : 'song_title'}>
          love your voice          </span>
        </div>
      </div>

      <button className="scroll_button" onClick={scrollToSection}>
        <img src={arrowImage} alt="Scroll Down" />
      </button>

      <div ref={secondSectionRef} className="second_section">
  <h2>Second Section</h2>
  <div className="boxes_container">
    <div className="box">
      <img src="https://media1.giphy.com/media/TrJpi4kQ8WnTy/giphy.gif?cid=ecf05e47dniccp5z7s7me3cxw5kv2exr8um5ll7hpfj5z2ki&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Image 1" />
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
