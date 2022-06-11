module.exports = {
    ayuda: "Evita que te toque 💥.",
    ejemplo: "buscaminas",
    uso : null,
    permiso : "Ninguno",

    run: async (client, message, args) => {

const Minesweeper = require('discord.js-minesweeper');

    const rows = 10;
    const columns = 10;
    const mines = 20;
    const minesweeper = new Minesweeper({ rows, columns, mines });
    const matrix = minesweeper.start();
 
    return matrix
      ? message.channel.send(matrix).then( message.channel.send("Si te toca :boom: pierdes ;c"))
      : message.channel.send(':warning: Error.');
}};