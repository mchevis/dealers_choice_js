const html = require("html-template-tag");

module.exports = (petsData) =>
  html`
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
          <div class="pets-list">
            ${petsData.map(
              (pet) => `
            <div class='pet-item'>
            <a href='/pet/${pet.id}'><img src="/${pet.name}.jpg" />
              <p>
                ${pet.name} (${pet.breed})</a>
              </p>
            </div>`
            )}
          </div>
        </div>
      </body>
    </html>
  `;
