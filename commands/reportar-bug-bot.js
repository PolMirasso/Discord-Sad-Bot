module.exports = {
    ayuda: `Reportas un bug al creador del bot.`,
    ejemplo: "reportarbug No funciona el comando prefix",
    run: async (client, message, args) => {
      const Discord = require("discord.js");
 const content = args.join(" ")
let canal = client.channels.cache.get("626454815853117503")
if (!content) return message.channel.send("Introduzca el bug del bot")
const embed = new Discord.MessageEmbed()
.setColor(0xefb810)
.addField("➤Usuario:",message.author.username)
.addField("➤Usuario ID:",message.author.id)
.addField("➤Bug:",content)
.addField("➤Servidor:", message.guild.name)
.addField("➤Servidor ID:", message.guild.id)

.setFooter(client.user.username, client.user.avatarURL)
canal.send(embed)
message.delete();

const embedenviado = new Discord.MessageEmbed()
embedenviado.setColor("GREEN")
embedenviado.setDescription(`<:tick:613820461675053066> || El bug ha sido enviado a la asistencia del bot, se solucionara pronto.`)

message.channel.send(embedenviado);

}};