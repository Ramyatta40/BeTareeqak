import React from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';

//https://source.unsplash.com/random/1920x1080//
//https://wallpapershome.com/images/pages/pic_h/17125.jpg
//https://wallpapershome.com/images/pages/pic_h/1673.jpg
function Home() {
  return (
    <div className="App">
      <div className="container-fluid p-0">
       <img className="bg-image" src="https://wallpapercave.com/wp/wp9181205.jpg" alt="background" />
        <div className="row h-100 m-0">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-white mb-4">Welcome to BeTareeqak</h1>
            <Button variant="outline-danger" className="btn">Start the journey now</Button>


          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;
