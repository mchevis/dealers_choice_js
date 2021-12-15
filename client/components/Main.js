import React from "react";
import { connect } from "react-redux";
import { fetchPets } from "../store";
import Hero from "./Nav";
import PetsList from "./PetsList";
import SinglePet from "./SinglePet";

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchPets();
  }

  render() {
    return (
      <div id="main">
        <Hero />
        {this.props.selectedPet.id ? <SinglePet /> : <PetsList />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPet: state.selectedPet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPets: () => dispatch(fetchPets()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
