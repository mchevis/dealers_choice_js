import axios from "axios";

const petList = document.querySelector("#pets-list");
const petProfile = document.querySelector("#pet-profile");

let pets, profile;

const renderPets = async () => {
  try {
    pets = (await axios.get("/api/pets")).data;
    const petId = window.location.hash.slice(1);
    const html = pets
      .map(
        (pet) =>
          `
                  <li class='pet-item ${pet.id === petId ? "selected" : ""}'>
                      <a href='#${pet.id}'> <img src="${pet.picture}" /> </a>
                      <a href='#${pet.id}'> ${pet.name} </a> 
                      <button pet-id='${pet.id}'> x </button>
                  </li>
              `
      )
      .join("");
    petList.innerHTML = html;
  } catch (err) {
    console.log(err);
  }
};

petList.addEventListener("click", async (ev) => {
  try {
    const target = ev.target;
    if (target.tagName === "BUTTON") {
      const response = await axios.delete(
        `/api/pets/${target.getAttribute("pet-id")}`
      );
      await renderPets();
      fetchPetProfile();
    }
  } catch (err) {
    console.log(err);
  }
});

const renderPetProfile = async () => {
  try {
    const html = `
        <img src="${profile.picture}" />
        <h2>${profile.name}</h2>
        <div class="pet-info">
            <p> <span class="key"> DOB: </span> ${profile.dob} </p>
            <p> <span class="key"> Owner: </span> ${profile.owner.firstName} ${profile.owner.lastInitial} </p>
            <p> <span class="key"> Breed: </span> ${profile.breed.name} </p>
        </div>
        `;
    petProfile.innerHTML = html;
  } catch (err) {
    console.log(err);
  }
};

const fetchPetProfile = async () => {
  try {
    const petId = window.location.hash.slice(1);
    console.log(pets);
    if (pets.find((pet) => pet.id === petId)) {
      const url = `/api/pets/${petId}`;
      profile = (await axios(url)).data;
      renderPetProfile();
    } else {
      petProfile.innerHTML = "";
    }
  } catch (err) {
    console.log(err);
  }
};

const init = async () => {
  try {
    renderPets();
    fetchPetProfile();
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("hashchange", async () => {
  renderPets();
  fetchPetProfile();
});

init();
