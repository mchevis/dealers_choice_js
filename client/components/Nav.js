import React from "react";
import { connect } from "react-redux";

import { clearSelectedPet } from "../store";

const Hero = (props) => {
  return (
    <>
      <div id="hero">
        <h1>
          <a onClick={() => props.clearSelectedPet()}>
            Marina's Pets Directory{" "}
          </a>
        </h1>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSelectedPet: () => dispatch(clearSelectedPet()),
  };
};

export default connect(null, mapDispatchToProps)(Hero);
