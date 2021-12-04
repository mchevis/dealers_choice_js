import React from "react";
import PetIcon from "./PetIcon";

const PetsList = ({ pets, selectPet, deletePet }) => {
  return (
    <div id="pets-list">
      {pets.map((pet) => (
        <PetIcon
          pet={pet}
          selectPet={selectPet}
          deletePet={deletePet}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default PetsList;

// {
//   /* <main>
//
//         <section id="profiles">
//           <h2>Pet Profile</h2>
//           <div id="pet-profile"></div>
//         </section>
//       </main> */
// }
