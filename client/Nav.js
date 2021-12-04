import React from "react";

const Hero = ({ clearPet }) => {
  return (
    <>
      <div id="hero">
        <h1>
          <a onClick={() => clearPet()}>Marina's Pets Directory </a>
        </h1>
      </div>
    </>
  );
};

export default Hero;
