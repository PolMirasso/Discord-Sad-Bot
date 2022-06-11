module.exports = {
    ayuda: `Envía una sugerencia para mejorar a Sad Bot.`,
    ejemplo: "sugerencia Poner mas comandos de diversion en el Sad Bot",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
 const Discord = require("discord.js");
 const content = args.join(" ");
let canal = client.channels.cache.get("626454501074665482");
      

    const embederrorkey = new Discord.MessageEmbed() 
    embederrorkey.setColor("ORANGE")
    embederrorkey.setDescription("⚠️ || Introduzca la sugerencia para el bot")

      
if (!content) return message.channel.send(embederrorkey);
const embed = new Discord.MessageEmbed()
.setColor(0xefb810)
.addField("Usuario:",message.author.username)
.addField("Usuario ID:",message.author.id)
.addField("Sugerencia:",content)
.addField("Servidor:", message.guild.name)
.addField("Servidor ID:", message.guild.id)
.setFooter(`Código de la sugerencia : ${Math.random().toString(36).substring(2, 15).slice(0, 8)}`)
//.setFooter(client.user.username, client.user.displayAvatarURL()) , client.user.displayAvatarURL()
canal.send(embed).then(async m => {
           await m.react("✅");
           await m.react("❓");  
           await m.react("❎");  
});
message.delete();
      
const embedenviado = new Discord.MessageEmbed() 
embedenviado.setColor("ORANGE")
embedenviado.setDescription(`⚠️ || La sugerencia ha sido enviada.`)      
      
message.channel.send(embedenviado);

}};