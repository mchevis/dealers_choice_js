import React from "react";
import { connect } from "react-redux";

import { clearSelectedPet } from "../store";

const SinglePet = ({ selectedPet, clearSelectedPet }) => {
  return (
    <>
      <div className="pet-profile">
        <img src={selectedPet.picture} />
        <h2>{selectedPet.name}</h2>
        <div className="pet-info">
          <p>
            <span className="key"> DOB: </span> {selectedPet.dob}
          </p>
          <p>
            <span className="key"> Owner: </span> {selectedPet.owner.firstName}{" "}
            {selectedPet.owner.lastInitial}
          </p>
          <p>
            <span className="key"> Breed: </span> {selectedPet.breed.name}
          </p>
        </div>
      </div>
      <a href="" onClick={() => clearSelectedPet()}>
        <p id="back"> Back to Pets Directory</p>
      </a>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedPet: state.selectedPet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSelectedPet: () => dispatch(clearSelectedPet()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePet);
