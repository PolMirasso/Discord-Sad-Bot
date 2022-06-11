const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

module.exports = {
    ayuda: `Juegas una partida al pacman.`,
    ejemplo: "pacman",
    permiso : "Ninguno",
    run: async (client, message, args) => {

let statsv = db.prepare(`SELECT victorias_pacman FROM user_confi WHERE idusuario = ${message.author.id}`).get();
let statsd = db.prepare(`SELECT derrotas_pacman FROM user_confi WHERE idusuario = ${message.author.id}`).get();



const game = require("../pacman-djs.js");  

      
    let mapa = [ 
  "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
  "⬛⬜⭐⭐⭐⬜⬜👻⬜⬜⭐⭐⭐⬜⬛",
  "⬛⬜⬛⬛⭐⬜⬜⬛⬜⬜⭐⬛⬛⬜⬛",
  "⬛⬜⬛⬜⬜⬜⬛⬛⬛⬜⬜⬜⬛⬜⬛",
  "⬛⬜⬜⬜⬛⬜⬜⬛⬜⬜⬛⬜⬜⬜⬛",
  "⬛⭐⬜⬜⬜⬜⬜👻⬜⬜⬜⬜⬜⭐⬛",
  "⬛⭐⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⭐⬛",
  "⬛⬜⬜⬜⬛⬜⬜⬛⬜⬜⬛⬜⬜⬜⬛",
  "⬛⬜⬛⬜⬜⬜⬛⬛⬛⬜⬜⬜⬛⬜⬛",
  "⬛⬜⬛⬛⭐⬜⬜⬛⬜⬜⭐⬛⬛⬜⬛",
  "⬛⬜⭐⭐⭐⬜⬜🤖⬜⬜⭐⭐⭐⬜⬛",
  "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
];

let start = new game.PacGame(mapa, 3, {
  win_text: message.author.username + " ganaste! 🎉",
  to_lose_text: message.author.username + " perdiste!",
  time_out_text: "Se acabo el tiempo!",
  coin_points: 20,
  coin_text: "💰",
  time_text: "⏲"
});
 
start.start_game(message);

start.on("end",async (type, monedas, tiempo) => {
  if(type == "ghost") {
    if(!statsd || statsd == null || statsd == undefined){
      db.prepare(`INSERT INTO user_confi(idusuario, derrotas_pacman) VALUES(${message.author.id}, ${1})`).run();        
    }else{
      let derrotas = statsv.derrotas_pacman;
      if(derrotas == null) derrotas = 0;
      db.prepare(`UPDATE user_confi SET derrotas_pacman = ${derrotas + 1} WHERE idusuario = ${message.author.id}`).run();
    };
    return;

  }else if(type == "player") {

    if(!statsv || statsv == null || statsv == undefined){
      db.prepare(`INSERT INTO user_confi(idusuario, victorias_pacman) VALUES(${message.author.id}, ${1})`).run();        
    }else{
      let victorias = statsv.victorias_pacman;
      if(victorias == null) victorias = 0;
      db.prepare(`UPDATE user_confi SET victorias_pacman = ${victorias + 1} WHERE idusuario = ${message.author.id}`).run();
    };
    return;

  } else if(type == "time") {
    if(!statsd || statsd == null || statsd == undefined){
      db.prepare(`INSERT INTO user_confi(idusuario, derrotas_pacman) VALUES(${message.author.id}, ${1})`).run();        
    }else{
      let derrotas = statsv.derrotas_pacman;
      if(derrotas == null) derrotas = 0;
      db.prepare(`UPDATE user_confi SET derrotas_pacman = ${derrotas + 1} WHERE idusuario = ${message.author.id}`).run();
    };
    return;
  } else if(type == "error") {
    message.channel.send("Ha ocurido un error")
  }
})
     
      
    }
};

