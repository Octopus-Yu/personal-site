import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/Yu.jpg`} alt="" />
      </Link>
      <header>
        <h2>Yu Zhang</h2>
        <p><a href="yuzhang0912@outlook.com">yuzhang0912@outlook.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Yu. I like creating things.
        I am a <a href="https://masterschool.eitdigital.eu/">EIT </a> graduate, <a href="https://www.kth.se/">KTH</a> and <a href="https://www.aalto.fi">Aalto</a> University Alumni.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Yu Zhang <Link to="/">mldangelo.com</Link>.</p>
    </section>
  </section>
);

export default SideBar;
