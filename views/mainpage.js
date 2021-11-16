const html = require("html-template-tag");

module.exports = (petsData, owners, breeds) =>
  `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Marina's Pets</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div id="homepage">
          <div class="hero">
            <h1>Marina's Pets Directory</h1>
          </div>
          <div id="addPet">
            <p>New pet?</p>
            <form method="POST">
              <div id="formFields">
                <input
                  class="addPetField"
                  type="text"
                  name="petName"
                  placeholder="Pet Name"
                />
                <input
                  class="addPetField"
                  type="text"
                  name="dob"
                  placeholder="DOB (MM/DD/YYYY)"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                />
                <select class="addPetField" name="ownerId" default="null">
                  <option value="" disabled selected>Owner</option>
                  ${owners
                    .map((owner) => {
                      return `
                        <option value=${owner.id}>${owner.firstName} ${owner.lastInitial}</option>
                      `;
                    })
                    .join("")}
                </select>
                <select class="addPetField" name="breedId">
                  <option value="" disabled selected>Breed</option>
                  ${breeds
                    .map((breed) => {
                      return `
                        <option value=${breed.id}>${breed.type} - ${breed.name}</option>
                      `;
                    })
                    .join("")}
                </select>
                <input
                  class="addPetField"
                  type="text"
                  name="petPic"
                  placeholder="Picture URL (e.g. Imgur)"
                />
              </div>
              <button>Add Pet</button>
            </form>
          </div>
          <div class="pets-list">
            ${petsData.map(
              (pet) => `
            <div class='pet-item'>
            <a href='/pets/${pet.id}'><img src="${pet.picture}" />
              <p>
                ${pet.name} (${pet.breed.name})</a>
              </p>
            </div>`
            )}
          </div>
        </div>
      </body>
    </html>
  `;
