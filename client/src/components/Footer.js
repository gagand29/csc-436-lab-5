import React from "react";
import '../Styles.css'

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>ⓒ {currentYear} Gagan Doddanna</p>
    </footer>
  );
}

export default Footer;
