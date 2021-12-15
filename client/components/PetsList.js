import React from "react";
import { connect } from "react-redux";

import PetIcon from "./PetIcon";

const PetsList = ({ pets }) => {
  return (
    <div id="pets-list">
      {pets.map((pet) => (
        <PetIcon key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pets: state.pets,
  };
};

export default connect(mapStateToProps)(PetsList);
