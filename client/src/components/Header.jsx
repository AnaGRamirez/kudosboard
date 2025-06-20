import React from "react";
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img className="logo" src="/logo.png" alt="kudos board logo" />
      </div>
      <div className="header-text">
        <h1 className="title"> KUDOSBOARD</h1>
        <h3 className="slogan">Because life is better when we recognize others </h3>
      </div>
    </header>
  );
};

export default Header;
