import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Made by <a href="https://www.linkedin.com/in/muneel-haider/" target="_blank" rel="noopener noreferrer">Muneel Haider</a></p>
      <p>Tech Stack: React, ASP.NET Core, SQL Server</p>
      <div className="footer-icons">
        <a href="https://www.linkedin.com/in/muneel-haider/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="icon" />
        </a>
        <a href="https://github.com/MuneelHaider" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
