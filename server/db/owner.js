const db = require("./db");
const { STRING, UUID, UUIDV4, DATEONLY, ENUM } = db.Sequelize;

const Owner = db.define("tblOwner", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING(20),
    allowNull: false,
  },
  lastInitial: {
    type: STRING(1),
    allowNull: false,
  },
});

module.exports = Owner;
