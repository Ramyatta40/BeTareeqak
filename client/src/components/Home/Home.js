import React from 'react';
import './Home.css';

function Home() {
  return (
 
<div className="home_disgin">

<nav className="home_nav">

  <h1 className="home_logo">Be Tareeqak</h1>

  <ul className="home_ul">
<li><a href='/About'>About</a></li>
<li><a href='/Map'>Map</a></li>
<li><a href='/Rode'>Rode</a></li>

  </ul>
</nav>

<div className="home_text">
<p>Welcome to </p>
<h1>BeTareeqak</h1>
<button className="home_button">Start the journey now</button>

</div>


</div>

  );
}


export default Home;
