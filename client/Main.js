import React from "react";
import axios from "axios";
import Nav from "./Nav";
import PetsList from "./PetsList";
import SinglePet from "./SinglePet";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      pets: [],
      selectedPet: {},
    };
    this.selectPet = this.selectPet.bind(this);
    this.clearPet = this.clearPet.bind(this);
    this.deletePet = this.deletePet.bind(this);
  }

  async selectPet(petId) {
    try {
      if (!petId) {
        this.setState({ selectedPet: {} });
      } else {
        const selectedPet = (await axios.get(`/api/pets/${petId}`)).data;
        this.setState({ selectedPet });
      }
    } catch (err) {
      console.log(err);
    }
  }

  clearPet() {
    this.setState({ selectedPet: {} });
  }

  async deletePet(petId) {
    try {
      await axios.delete(`/api/pets/${petId}`);
      const pets = this.state.pets.filter((pet) => pet.id !== petId);
      this.setState({ pets });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    this.setState({
      pets: (await axios.get("/api/pets")).data,
    });
  }

  render() {
    const { pets, selectedPet } = this.state;
    return (
      <div id="main">
        <Nav clearPet={this.clearPet} />
        {selectedPet.id ? (
          <SinglePet selectedPet={selectedPet} />
        ) : (
          <PetsList
            pets={pets}
            selectPet={this.selectPet}
            deletePet={this.deletePet}
          />
        )}
      </div>
    );
  }
}
