const sqlite = require("sqlite3");
const db = new sqlite.Database("../mydash.sqlite3");

const getUser = id =>
  new Promise((resolve, reject) => {
    db.get("SELECT * FROM perfiles WHERE idusu = ?", id, async (err, filas) => {
      if (err) {
        return reject(err);
      }
      resolve(filas);
    });
  });

module.exports = {
  getUser
};
