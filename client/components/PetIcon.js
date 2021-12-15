import React from "react";
import { connect } from "react-redux";

import { selectPet, deletePet } from "../store";

const PetIcon = ({ pet, selectPet, deletePet }) => {
  return (
    <div className="pet-item">
      <a onClick={() => selectPet(pet)}>
        <img src={pet.picture} />
      </a>
      <p> {pet.name}</p>

      <button pet-id={pet.id} onClick={() => deletePet(pet)}>
        x
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectPet: (pet) => dispatch(selectPet(pet)),
    deletePet: (pet) => dispatch(deletePet(pet)),
  };
};

export default connect(null, mapDispatchToProps)(PetIcon);
