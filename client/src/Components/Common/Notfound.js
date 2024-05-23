import React from "react";
import notfoundimage from "../Assets/Images/404.png";

const Notfound = () => {
  return (
    <div className="vh-100 bg-white d-flex align-items-center justify-content-center">
      <img className="h-100" src={notfoundimage} alt="404-image" />
    </div>
  );
};

export default Notfound;
