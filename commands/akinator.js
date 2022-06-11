module.exports = {
    ayuda: "Akinator puede leer tu mente y decirte en que personaje estás pensando, solo haciéndote algunas preguntas. Piensa en un personaje real o ficticio y Akinator intentará adivinar quién es. \n ¿Te atreverás a desafiar al genio? ¿Y qué hay de otros temas como películas, animales ...?",
    ejemplo: "akinator",
    uso : null,
    permiso : "Ninguno",
    run: async (client, message, args) => {

 const akinator = require("mech-aki");
const discord = require("discord.js");
   
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };
      
     var embed = new discord.MessageEmbed().setColor(cembed);
    var aki = new akinator();
    var pregunta = await aki.empezar();
    embed.setTitle(pregunta.pregunta);
    var respuestas = new Map([["✅", 0], ["❌", 1], ["❓", 2], ["🤔", 3], ["😞", 4], ["🔙", -9]]);
    var array_respuestas = ["✅", "❌", "❓", "🤔", "😞", "🔙"];
    embed.addField("Opciones", `✅: Sí\n❌: No\n❓: No lo sé\n🤔: Probablemente sí\n😞: Probablemente no\n🔙: Atrás`, false);
    var msg = await message.reply(embed);
    for (let index = 0; index < array_respuestas.length; index++) await msg.react(array_respuestas[index]);
    while (aki.progreso < 85) {
        var respuesta = await new Promise((resolve, reject) => {
                var collector = msg.createReactionCollector((reaction, user) =>
                !user.bot &&
                user.id === message.author.id &&
                reaction.message.channel.id === msg.channel.id
                , {time: 60000});
                    collector.on("collect", r => {
                        resolve(r.emoji.name);
                        collector.stop();
                    });
                    collector.on("end", collected => resolve(null))
            });
        if (!respuesta) return msg.delete();
        var respuesta_num = respuestas.get(respuesta);
        pregunta = respuesta_num != -9 ? await aki.siguiente(respuesta_num) : await aki.atras();
        embed.setTitle(pregunta.pregunta);
        await msg.edit(embed);
    };
    var personajes = await aki.respuestas();
    var personaje = personajes.get(0);
    embed.setTitle("✅Tu personaje es: " + personaje.nombre);
    embed.setDescription(personaje.descripcion);
    embed.setImage(personaje.foto);
    embed.fields = [];
    msg.delete();
    message.reply(embed);    
    }
};