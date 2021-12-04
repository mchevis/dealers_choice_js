const PORT = process.env.PORT || 1337;
const server = require("./index");
const { db } = require("./db");

const init = async () => {
  try {
    await db.sync();
    server.listen(PORT, () => {
      console.log(`
        
        App listening in port ${PORT}
        
        http://localhost:${PORT}/
        `);
    });
  } catch (err) {
    console.log("There was an error during initialization!", err);
  }
};

init();
