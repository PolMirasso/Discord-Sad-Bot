module.exports = {
    ayuda: `Te envia el emoji en formato imagen.`,
    ejemplo: "jumbo 😀",
    permiso : "Ninguno",

    run: async (client, message, args) => {
        const Discord = require("discord.js");
 
const emojiNames = require("emoji-unicode-map");
const emojiImages = require("emoji-img");

var embednoemoji = new Discord.MessageEmbed() 
embednoemoji.setColor("ORANGE")
embednoemoji.setDescription(`⚠️ || Debes introducir un emoji.`)  

var embednoemojiencontrado = new Discord.MessageEmbed() 
embednoemojiencontrado.setColor("ORANGE")
embednoemojiencontrado.setDescription(`⚠️ || No se ha encontrado el emoji.`)  

if (!args[0]) return  message.channel.send(embednoemoji);
        
 
    let emojiRegExp = /<a?:[^:]+:(\d+)>/gm, 
        emoji, 
        unicodeEmojiName = emojiNames.get(args[0]);
 
    if (!unicodeEmojiName) {
        if (args[0].startsWith("<")) { 
            let emojiID = emojiRegExp.exec(args[0])[1];
            emoji = client.emojis.cache.get(emojiID);
        }else{
            emoji = client.emojis.cache.get(args[0]);
        };
 
        if (!emoji) { 
            return message.channel.send(embednoemojiencontrado);
        };
 
        message.channel.send({
            files: [
                `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
            ]
        });
        return;
    };
  
    let unicodeEmojiImage = emojiImages.get(unicodeEmojiName); 
 
    if (!unicodeEmojiImage) { 
        message.channel.send(embednoemojiencontrado);
        return;
    };
 
    message.channel.send({ 
        files: [
            {
                attachment: unicodeEmojiImage,
                name: unicodeEmojiName + ".png"
            }
        ]
    });
  
}};