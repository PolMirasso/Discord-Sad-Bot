module.exports = {
    ayuda: `Muestra las 10 personas con mas monedas del servidor.`,
    ejemplo: "top",
    permiso : "Ninguno",

    run: async (client, message, args) => {
const Discord = require("discord.js")    
const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
      
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  
  let onoff = db.prepare(`SELECT economia FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

  const embedecodes = new Discord.MessageEmbed() 
  embedecodes.setColor("RED")
  embedecodes.setDescription("🚫 || La economía está desactivada en este servidor.")

    if (!onoff|| !onoff.economia || onoff.economia == null || onoff.economia == undefined) {

    if(!economia_act_des.tiene(`${message.guild.id}`)) {
      return message.channel.send(embedecodes);
      };
      let activar = await economia_act_des.obtener(`${message.guild.id}`);
      if (activar == "off") return message.channel.send(embedecodes).then(economia_act_des.eliminar(message.guild.id));
      if (activar == "on") {
        db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, 1)`);
        economia_act_des.eliminar(message.guild.id);
       };
    };
    

    if(onoff.economia == 0) return message.channel.send(embedecodes);
    

let filas = db.prepare(`SELECT * FROM economia WHERE idserver = ${message.guild.id}`).all();

    let ranking = [];
    for(var key in filas) {
       if(!message.guild.members.cache.get(filas[key].idusuario)) continue;
       let user = message.guild.members.cache.get(filas[key].idusuario);
       ranking.push([user.user.username, filas[key].dinero]);
    };
    if(ranking.length <= 0) return message.channel.send("No hay ranklist.");
    ranking.sort(function(a, b)  { return b[1] - a[1] });
    let index = 1;
    let top = ranking.slice(0, 10).map(m => `${index++} : ${m[0]} | ${m[1]}\n`);
      
   var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
   if(!color || color.colorembed == null) {
     var cembed = "#7289D9";
   }else{
     var cembed = color.colorembed;
   };
   
    let embed = new Discord.MessageEmbed()
    embed.setColor(cembed)
    embed.setTitle("Top 10")
    embed.setDescription(top) 
   return message.channel.send(embed);
  }
};