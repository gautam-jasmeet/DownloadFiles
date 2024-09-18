import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"
import 'bootstrap-icons/font/bootstrap-icons.css';


function Footer() {
    return (
      <div className='footer'>
        <footer>
          <h5 className='footer_head'>
            © Gautam Solar Pvt. Ltd.
          </h5>
          <div className='footer_container'>
            <div className='container_left'>
              <Link to="https://gautamsolar.com/">
                <img src={require('../images/GSolarLogo.png')} alt="Gautam Solar Logo" width={"150px"} />
              </Link>
            </div>
            <div className='container_right'>
              <h4 className="contact_header">Contact</h4>
              <div className='container_right-list'>
                <a href='https://maps.app.goo.gl/DhV4nVN86Henkkxv7'>
                  <i className="bi bi-geo-alt"></i> D-120-121, Okhla Industrial Area, Phase-1, New Delhi-110020
                </a><br />
                <a href='tel:+91123456789'>
                  <i className="bi bi-telephone"></i> +91 93117 97248 
                </a><br />
                <a href='mailto:info@gautamsolar.com'>
                  <i className="bi bi-envelope"></i> info@gautamsolar.com
                </a>
              </div>
            </div>
          </div>
          {/* <p className='footer_copyright'>Copyright © 2023 | All Rights Reserved</p> */}
        </footer>
      </div>
    );
  }

export default Footer