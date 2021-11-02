const html = require("html-template-tag");

module.exports = () =>
  html`
    <html>
      <head>
        <title>Pet Not Found - Marina's Pets</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div id="errorPage">
          <img src="404corgi.jpg" />
          <h1>We don't have any pets with that ID :(</h1>
          <p id="back">&#128062 <a href="/">Back to Pets Directory</p>
        </div>
      </body>
    </html>
  `;
