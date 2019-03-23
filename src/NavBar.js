import React, { useState, useEffect } from "react";
import { ReactComponent as Icon } from "./static/icon.svg";

function NavBar() {
  return (
    <div className="navbar">
      <a className="logo" href="/">
        <Icon id="logo-icon" />
        <div id="logo-sign">Masonry dogs</div>
      </a>
    </div>
  );
}

export default NavBar;
