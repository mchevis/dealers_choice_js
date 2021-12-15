import React from "react";
import { connect } from "react-redux";
import { createPet } from "../store";

const AddPet = (props) => {
  return (
    <div id="addNewPet">
      <button onClick={() => props.createPet()}>Add Random Pet</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPet: () => dispatch(createPet()),
  };
};

export default connect(null, mapDispatchToProps)(AddPet);
