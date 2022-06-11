module.exports = {
    ayuda: `Recibes un meme, no tengo mucho que decir.`,
    ejemplo: "meme",
    permiso : "Ninguno",
    run: async (client, message, args) => {
      
  const Discord = require("discord.js")
  const Weez = require('weez')
  const weez = new Weez.WeezAPI((process.env.API));
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  client.memesURL = JSON.parse(require('fs').readFileSync('./memes.json', 'utf8'));

let meme = Math.round(Math.random() * (2 - 1) + 1);

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

if(meme == 1){
 //let imagenes = ["https://cdn.discordapp.com/attachments/619151139295985697/619151627764498442/FB_IMG_1567020904405.png","https://cdn.discordapp.com/attachments/619151139295985697/619151607065739275/IMG-20180408-WA0007.png","https://cdn.discordapp.com/attachments/619151139295985697/619151570268979221/5d6d4cd05a5fe.png","https://cdn.discordapp.com/attachments/619151139295985697/619151594910384148/IMG_20190830_231025.png","https://cdn.discordapp.com/attachments/619151139295985697/619151535808577557/5d48375426925.png","https://cdn.discordapp.com/attachments/618499994185629696/618897033167896616/20190830_012711-1.jpg","https://cdn.discordapp.com/attachments/566644512064274453/612628920961073163/IMG-20190817-WA0001.png","https://cdn.discordapp.com/attachments/571750424881922050/607432750072594451/IMG-20190802-WA0013.jpg","https://cdn.discordapp.com/attachments/571750424881922050/607432722331336704/61613843_2939128509438502_8773064515668410368_n.png","https://cdn.discordapp.com/attachments/571750424881922050/607432656728358945/67423227_2475379479211184_4780513258618486784_n.png","https://cdn.discordapp.com/attachments/571750424881922050/606600618316005383/67964424_2475385322543933_2871880640393904128_n.png","https://cdn.discordapp.com/attachments/446050303809159168/605745861892374528/tumblr_ow4zc8UgqH1skbvu3o1_1280.png","https://cdn.discordapp.com/attachments/491363577576554496/557429074545344522/FB_IMG_1552971374542.jpg","https://cdn.discordapp.com/attachments/517668585871769600/526148841205006357/IMG_20181221_131748.png","https://media.discordapp.net/attachments/399228355066724353/555047532292472890/FB_IMG_1552142220603.jpg?width=663&height=663","https://cdn.discordapp.com/attachments/446050303809159168/547895996131311626/VRU_22128_algunos_pokemon_no_deberian_aprender_surf.png","https://images3.memedroid.com/images/UPLOADED445/5819248058470.jpeg","https://images7.memedroid.com/images/UPLOADED671/58010bd9574ae.jpeg","https://images7.memedroid.com/images/UPLOADED216/580108925d9c4.jpeg","https://images7.memedroid.com/images/UPLOADED735/58438d037bc43.jpeg","https://images3.memedroid.com/images/UPLOADED708/58010c8a0ba9d.jpeg","https://images3.memedroid.com/images/UPLOADED464/5b5ec9453d9bc.jpeg","https://images7.memedroid.com/images/UPLOADED905/5b5edc64b2138.jpeg","https://images7.memedroid.com/images/UPLOADED900/584390b066afd.jpeg","https://images3.memedroid.com/images/UPLOADED306/57a80be354a08.jpeg","https://images7.memedroid.com/images/UPLOADED172/5504be2f3020a.jpeg","https://images7.memedroid.com/images/UPLOADED497/57a8036453197.jpeg","https://images7.memedroid.com/images/UPLOADED180/5504bc8a25bec.jpeg","https://images3.memedroid.com/images/UPLOADED107/59862c45910b1.jpeg","https://images3.memedroid.com/images/UPLOADED426/59862da607a5f.jpeg","https://images7.memedroid.com/images/UPLOADED723/57a0fd1e77eb2.jpeg","https://images7.memedroid.com/images/UPLOADED896/57a0fa42d9373.jpeg","https://images7.memedroid.com/images/UPLOADED993/57a0f8f2bb9fc.jpeg","https://images7.memedroid.com/images/UPLOADED720/5819189543ca4.jpeg","https://images3.memedroid.com/images/UPLOADED297/5b5ea78ceb1fe.jpeg","https://images7.memedroid.com/images/UPLOADED191/56bf057ecbf7a.jpeg","https://images3.memedroid.com/images/UPLOADED113/56bf11f8b2e89.jpeg","https://images3.memedroid.com/images/UPLOADED48/56bf167f67af5.jpeg","https://pbs.twimg.com/media/DwV4xitW0AALBHp.jpg","https://pbs.twimg.com/media/Dv_yRNoWkAAEFIC.jpg","https://pbs.twimg.com/media/DwbL2x1XcAAZlk4.jpg","https://pbs.twimg.com/media/DwemYGGWoAEDlpW.jpg","https://pbs.twimg.com/media/DwZb4CYXgAIgBsB.jpg","https://pbs.twimg.com/media/Dwo4JyvXcAEFMAi.jpg","https://pbs.twimg.com/media/DwqaSx1WkAE6Ab1.jpg","https://pbs.twimg.com/media/DwuHRVVWkAANuqy.jpg","https://pbs.twimg.com/media/DwvoVhoW0AAZvgR.jpg","https://cdn.discordapp.com/attachments/508207002497974272/528315160587141131/image0_1.jpg","https://media.discordapp.net/attachments/529773110761750539/530155641231245313/IMG-20181213-WA0000.jpg","https://cdn.discordapp.com/attachments/446050303809159168/528348116949401610/94bd1a62e5e6df67f87802a657da9077d3bc2856_00.png","https://pbs.twimg.com/media/DsS64XQWkAAqnyR.jpg:large","https://cdn.discordapp.com/attachments/491363577576554496/493864873738895422/42111191_338464000223724_5264160514979659776_n.png","https://cdn.discordapp.com/attachments/491363577576554496/504843078956482570/images_8.jpeg","https://pbs.twimg.com/media/DsPOeNdWsAYKY7x.jpg","https://gm1.ggpht.com/IQqS7EFttMe_PY6xVqpIN3MsKeg2Af6Fz8AcLRVaicaEhUIIBUnSiNULlAjt0Ej81FUy0BDR03wJlnZDOg2LBg-nZTPBhcx5N4I3bv5Y0LVRQdeMa5PdtIam-tiUogm1wVjFYVVVcR6AionvxezkzK3nSV8HSaOaMGlGa0sd-A-MYExomctosjw4TAW0-PfKF9XfSDSPFzi7Q1G6E8wHlSPgs3v0l9waACQQ1Jspfx4lpVyGRkZwzb-7NQ7pfiV-M_aJqNeRJ074qKSL0xtIsPi3je_4HVmZHQ88U0nf3bz82Kokb4vU4rHTsBiYOd6lekZo0ju5SoIdXW2pq2kiwQuYFO7ZIeOvMGGSAjVYysrFOQ-nRjC9SPpSYbu0swNvVLZ7wjtJIWUugb04WozdDp47MSHEbLMu4Esf3fuzW-acHyMF2dv6UILbiUbAa8FTPmNEuCafa5gBwmgA7Lidie1uihNIrJHLZe4KYtGqw1RS_0J7LIc2LejiijmeEJz4mllU0FhZCwV-RrHy01sU5YS5qrUlHlDgxUG1X67ksZG9tKYqKlhj_-T3U9FPdFg18Bl1q4IVk_QOMLBEEZvKVS2HUgAeIiAZ7Nh2uOrnkkTw3_Kp8Sq9Frg5xsdT8GsghtTGhj7WhjXXAXP3xtHb-7jtJLtBbJyqOqyyB8ZCK7IMgONKbZ0K-1l3j068j_YEZN4wwht6UriDx8I=s0-l75-ft-l75-ft","https://pbs.twimg.com/media/DsNyBMUX4AAyfME.jpg","https://pbs.twimg.com/media/DsKDZ02WoAA-Tqk.jpg:large","https://cdn.discordapp.com/attachments/446050303809159168/513797915794341898/descarga.jpg","https://cdn.discordapp.com/attachments/446050303809159168/513798050423242773/a-dor-este-medicamento-do-puedo-tomar-con-diarrea-pues-17612412.png","https://static01.heraldo.es/uploads/imagenes/8col/2018/05/18/_16_25738d5a.jpg?c81e728d9d4c2f636f067f89cc14862c","https://pbs.twimg.com/media/DsIfis3WoAgmJ4I.jpg:large","https://images7.memedroid.com/images/UPLOADED825/58190099edd85.jpeg","https://images2.memedroid.com/images/UPLOADED61/53711d420f5e0.jpeg","https://i.pinimg.com/originals/bf/b5/c8/bfb5c81319179ada91e2db4e780f527d.jpg","https://i.pinimg.com/originals/da/aa/52/daaa52a4da4fee72524ca659f5afac94.jpg","https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmRdfwn763K48H1t2qaGtQDGP34Ao9EXaYKdMjysku5Vy6/462e94f552eb6f8fb0e532937abb1dbd.png","https://pics.me.me/yasi-se-hacen-los-huevos-de-pascua-chiste-geniales-ya-25534598.png","https://i.pinimg.com/originals/5b/85/07/5b8507948937c765646c513543bfbe5a.jpg","https://pbs.twimg.com/media/CaFxbkvWkAARtkr.jpg","https://i.pinimg.com/originals/df/79/0a/df790a50bcdddc926539cd629ac1e589.jpg","https://pics.me.me/despues-de-los-primeros-5-minutos-en-tu-examen-de-22115868.png"]
// let imagen = imagenes[Math.floor(Math.random() * imagenes.length)]

let randomImage = client.memesURL[Math.floor(Math.random() * client.memesURL.length)];

const embed = new Discord.MessageEmbed() 
.setColor(cembed)
.attachFiles([{
  attachment: randomImage,
  name: "meme.png"
}])
.setImage("attachment://meme.png")

return message.channel.send(embed);
}else{
 let link = await weez.randomMeme()
 let embed2 = new Discord.MessageEmbed()
 embed2.setColor(cembed)
 embed2.setImage(link)
 return message.channel.send(embed2);
  };
}};