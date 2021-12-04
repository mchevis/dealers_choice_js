import React from "react";

const PetIcon = ({ pet, selectPet, deletePet }) => {
  return (
    <div className="pet-item">
      <a onClick={() => selectPet(pet.id)}>
        <img src={pet.picture} />
      </a>
      <p> {pet.name}</p>

      <button pet-id={pet.id} onClick={() => deletePet(pet.id)}>
        {" "}
        x{" "}
      </button>
    </div>
  );
};

export default PetIcon;
