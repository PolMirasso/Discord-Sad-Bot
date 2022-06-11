module.exports = {
    ayuda: "Canvia el estilo de letra de tu frase.",
    ejemplo: "ascii Sad",
    uso : "ascii (Texto)",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
const Discord = require("discord.js");
const figlet = require('figlet');
var maxLen = 15;

const embedmaxcaracteres = new Discord.MessageEmbed() 
embedmaxcaracteres.setColor("ORANGE")
embedmaxcaracteres.setDescription("⚠️ || El máximo de caracteres que puedes poner es 15")

if(args.join(' ').length > maxLen) return message.channel.send(embedmaxcaracteres); 

const embednotexto= new Discord.MessageEmbed() 
embednotexto.setColor("ORANGE")
embednotexto.setDescription("⚠️ || Tienes que introducir un texto.")

if(!args.join(" ")) return message.channel.send(embednotexto);
figlet(`${args.join(' ')}`, function(err, data) {
    if (err) {

        const embederror = new Discord.MessageEmbed() 
        embederror.setColor("RED")
        embederror.setDescription("🚫 || Ha ocurido un error no esperado, intentelo en unos segundos.")
        return message.channel.send(embederror);
    }
    message.channel.send(`${data}`, {code: 'AsciiArt'});
});
}};