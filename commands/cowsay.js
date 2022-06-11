module.exports = {
    ayuda: `Digamos que lo dice una vaca.`,
    ejemplo: "cowsay Sad",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
const Discord = require("discord.js");
const cowsay = require("cowsay");
let texto = args.join(" ")

const embednotexto = new Discord.MessageEmbed() 
embednotexto.setColor("ORANGE")
embednotexto.setDescription("⚠️ || Introduzca un texto.")

if (!texto) return message.channel.send(embednotexto);
message.channel.send('```\n'+cowsay.think({   
	text :(texto),
	e : "oO",
	T : "U "
})+'\n```');  
  }
};