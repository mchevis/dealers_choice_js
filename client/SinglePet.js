import React from "react";

const SinglePet = ({ selectedPet }) => {
  return (
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
  );
};

export default SinglePet;
