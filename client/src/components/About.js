import React from 'react';
import './About.css';


function About() {
return (
/*<container className="zaraki">/*/
<div>
<div>
<div className="animated-bg"></div> {/* Add the animated background */}

<div className="contact-wrap">
<div className="contact-in">
<h1>Contact Info</h1>
<h2><i className="fa fa-phone" aria-hidden="true" /> Phone</h2>
<p>123-456-789</p>
<h2><i className="fa fa-envelope" aria-hidden="true" /> Email</h2>
<p>info@democompany.com</p>
<h2><i className="fa fa-map-marker" aria-hidden="true" /> Address</h2>
<p>jordan,amman</p>
    <ul class="social-icons">
        <li><a href="https://www.instagram.com"><i class="fa fa-instagram"></i></a></li>
        <li><a href="https://twitter.com"><i class="fa fa-twitter"></i></a></li>
        <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
        <li><a href="#"><i class="fa fa-codepen"></i></a></li>
    </ul>
</div>
<div className="contact-in">
<h1>Send a Message</h1>
<form>
<input type="text" placeholder="Full Name" className="contact-in-input" />
<input type="text" placeholder="Email" className="contact-in-input" />
<input type="text" placeholder="Subject" className="contact-in-input" />
<textarea placeholder="Message" className="contact-in-textarea" defaultValue={""} />
<input type="submit" defaultValue="SUBMIT" className="contact-in-btn" />
</form>
</div>
<div className="contact-in">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d433870.82680541975!2d36.22782280681774!3d31.835453330186578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d7981af%3A0x631c30c0f8dc65e8!2z2LnZhdmR2KfZhg!5e0!3m2!1sar!2sjo!4v1679332473724!5m2!1sar!2sjo" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  </div></div>
  </div>

  );
}

export default About;
