import React from 'react';
import './Home.css';

//https://source.unsplash.com/random/1920x1080//
//https://wallpapershome.com/images/pages/pic_h/17125.jpg
//https://wallpapershome.com/images/pages/pic_h/1673.jpg
//https://wallpapercave.com/wp/wp9181205.jpg
function Home() {
  return (
    <div className="App">
      <div className="container-fluid p-0">
       <img className="bg-image" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjUzMzJmMDgxYmJiZTM4NmE3OTQ2MzgwYTUxZjNhOTVlMDBlYTA3ZiZjdD1n/pFkbkttdEBnSo/giphy.gif" alt="background" />
        <div className="row h-100 m-0">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-white mb-4">Welcome to BeTareeqak</h1>




            <button className='buttonhome'>Start the journey now</button>


            

          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;
