import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { ReactComponent as Icon } from "../static/icon.svg";

const StyledDiv = styled.div`
  background-color: white;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  display: flex;
  height: 48px;
  margin: 0px;
  padding: 0px;

  .logo {
    text-decoration: none;
    fill: deepskyblue;
    color: #424242;
    display: flex;
    align-self: center;
    line-height: 48px;
    text-align: left;
    padding: 0 8px 0 8px;
  }
  
  .logo:hover {
    fill: #101010;
    color: #101010;
    background-color: #cfcfcf;
  }

  #logo-icon {
    height: 38px;
    width: 38px;
    align-self: center;
  }

  #logo-sign {
    padding: 0 8px 0 8px;
    align-self: center;
  }
`

function NavBar() {
  return (
    <StyledDiv>
      <a className="logo" href="/">
        <Icon id="logo-icon" />
        <div id="logo-sign">Masonry dogs</div>
      </a>
    </StyledDiv>
  );
}

export default NavBar;
