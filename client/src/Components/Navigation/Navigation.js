import "../Navigation/Navigation.css";

import React from "react";

const Navigation = () => {
  return (
    <header className="dropShadow">
      <div className="headerWrapper">
        <div className="headerContainer flex">
          <div className="headerLogoLinkWrapper">
            <div className="headerLogoLink">
              <a href="/">
                <div className="headerLogo flex flex-row">
                  <div className="logoText">React app</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navigation;
