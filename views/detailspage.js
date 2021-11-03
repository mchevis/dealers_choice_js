const html = require("html-template-tag");

module.exports = (pet) =>
  html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${pet.name} (${pet.breed}) - Marina's Pets</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="pet-page">
          <div class="hero">
            <h1>Marina's Pets Directory</h1>
          </div>
          <div class="pet-details">
            <img src="/${pet.name}.jpg" />
            <h2>${pet.name}</h2>
            <div class="pet-info">
              <p> <span class="key"> ID: </span> ${pet.id} </p> 
              <p> <span class="key"> DOB: </span> ${pet.dob} </p>
              <p> <span class="key"> Owner: </span> ${pet.ownerName} </p>
              <p> <span class="key"> Breed: </span> ${pet.breed} </p>
</div>
            </p>
          </div>
          <p id="back">&#128062 <a href="/">Back to Pets Directory</p>
        </div>
      </body>
    </html>
  `;
