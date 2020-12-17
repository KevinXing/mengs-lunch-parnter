import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Meng's
      </Link>
      <Link to="/" className="item">
        Videos
      </Link>
      <Link to="/subscriptions" className="item">
        Subscriptions
      </Link>
    </div>
  );
};

export default Header;
