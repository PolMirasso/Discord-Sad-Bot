//ANTISPAM BY MEGASTAR 2/04/19, last edit 2/11/19

const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');


let pos_mentions = ["@everyone", "@here"]
let Collect = new Map();
let regex = /(https?:\/\/)?(www\.)?((discord|invite)\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-zA-Z]/ //REGEX HERMOSO

function roundUp(data, precision) {
    let resultado = data
    var decimal = Math.pow(10, precision);
    return (Math.round(resultado * decimal) / decimal).toFixed(precision)
};


function Caracteres(mensaje) {
    mensaje = mensaje.replace(/\s+/g,"_");
    return /(\S)(\1{5,})/g.test(mensaje);
}

module.exports = {
  verificar: async (message, opciones) => {

        let MAX_WARNING = opciones && opciones.max_advertencias && typeof opciones.max_advertencias == "number" && opciones.max_advertencias > 0 ? opciones.max_advertencias : 10
        let warn_point = opciones && opciones.flood_puntos && typeof opciones.flood_puntos == "number" && opciones.flood_puntos > 0 ? opciones.flood_puntos : 1
        let mention_point = opciones && opciones.mencion_puntos && typeof opciones.mencion_puntos == "number" && opciones.mencion_puntos > 0 ? opciones.mencion_puntos : 5
        let user_list = opciones && opciones.usuarios && Array.isArray(opciones.usuarios) ? opciones.usuarios : []
        let channel_list = opciones && opciones.canales && Array.isArray(opciones.canales) ? opciones.canales : []
        let invites = opciones && opciones.invitaciones && opciones.invitaciones == true ? true : false
        let invite_point = opciones && opciones.invite_puntos && typeof opciones.invite_puntos == "number" ? opciones.invite_puntos : 1

        if(message.author.id == message.client.user.id) return false; //SI EL AUTOR DEL MENSAJE ES EL BOT
        if(user_list.includes(message.author.id)) return false; //SI EL USUARIO ESTA EN LA LISTA DE USUARIOS IGNORADOS
        if(channel_list.includes(message.channel.id)) return false; //SI EL CANAL ESTA EN LA LISTA DE CANALES IGNORADOS

        if(!Collect.has(message.guild.id)) Collect.set(message.guild.id, {});
        if(!Collect.get(message.guild.id)[message.author.id]) Collect.get(message.guild.id)[message.author.id] = {msg: [], globalwarns: 0, floodwarns: 0, floodtime: 0};
        Collect.get(message.guild.id)[message.author.id].msg.push(message);
        let msg = Collect.get(message.guild.id)[message.author.id].msg;

        //INVITACIONES
        if(invites) {
          let final_regex = message.content.match(regex);
          if(final_regex) {
            Collect.get(message.guild.id)[message.author.id].globalwarns += invite_point;
                        
            let admin = "Automod";
            let motivo = "Poner Invitacion";
            db.prepare(`INSERT INTO warns(idserver, idusuario, motivo, dia, mod) VALUES(${message.guild.id},${message.author.id}, '${motivo}', ${Date.now()}, '${admin}')`).run();    
            
            let link = final_regex[0].split(" ")[0];
            let datos = await message.client.fetchInvite(link).then(inv => {
              return {
                duplicado: false,
                mencion: false,
                flood: false,
                invitacion: {
                  servidor: inv.guild.name,
                  advertencias: `${Collect.get(message.guild.id)[message.author.id].globalwarns}/${MAX_WARNING}`,
                  id: inv.guild.id,
                  url: inv.url,
                  detectado: false
                  }
                };
            }).catch(error => {
              return {
                duplicado: false,
                mencion: false,
                flood: false,
                invitacion: {
                  servidor: "invalido",
                  advertencias: `${Collect.get(message.guild.id)[message.author.id].globalwarns}/${MAX_WARNING}`,
                  id: "invalido",
                  url: link,
                  detectado: false
                }
              };
            });
            if(Collect.get(message.guild.id)[message.author.id].globalwarns >= MAX_WARNING) {
              datos.invitacion.detectado = true;
              Collect.get(message.guild.id)[message.author.id].msg = [];
              Collect.get(message.guild.id)[message.author.id].globalwarns = 0;
            };
            return datos;
          };
        };


        //SPAM MEDIANTE MENCION
        if(message.mentions.roles.size > 0 || message.mentions.members.size > 0 || pos_mentions.some(r => message.content.includes(r))) {
          let cantidad = message.mentions.roles.size + message.mentions.members.size;
          pos_mentions.map(r => {
            if(message.content.includes(r)) cantidad++;
          });

          //ADVERTENCIA
          if(cantidad >= 5) {
            Collect.get(message.guild.id)[message.author.id].globalwarns += mention_point;
                        
            let admin = "Spam Menciones";
            let motivo = "Poner Invitacion";
            db.prepare(`INSERT INTO warns(idserver, idusuario, motivo, dia, mod) VALUES(${message.guild.id},${message.author.id}, '${motivo}', ${Date.now()}, '${admin}')`).run();    
            
            let datos = {
              duplicado: false,
              mencion: {
                cantidad: cantidad,
                advertencias: `${Collect.get(message.guild.id)[message.author.id].globalwarns}/${MAX_WARNING}`,
                detectado: false
              },
              flood: false,
              invitacion: false
            };

            //DETECCION
            if(Collect.get(message.guild.id)[message.author.id].globalwarns >= MAX_WARNING) {
              datos.mencion.detectado = true;
              Collect.get(message.guild.id)[message.author.id].msg = [];
              Collect.get(message.guild.id)[message.author.id].globalwarns = 0;
            };
            return datos;
          };
        };

        //CARACTERES CONSECUTIVOS
        if(Caracteres(message.content)) {

          let datos = {
            duplicado: true,
            mencion: false,
            flood: false,
            invitacion: false
          };
          return datos;
        };


        //FLOOD CON UN INTERVALO DE 0 A 1.7 SEGUNDOS CONSECUTIVOS EN CADA MENSAJE, ES EL TIEMPO PERFECTO :D
        if(msg.length > 1) {
          if((msg[msg.length -1].createdTimestamp - msg[msg.length - 2].createdTimestamp) >= 0 && (msg[msg.length -1].createdTimestamp - msg[msg.length - 2].createdTimestamp) <= 1700) {
            Collect.get(message.guild.id)[message.author.id].floodwarns++;
            Collect.get(message.guild.  id)[message.author.id].floodtime += msg[msg.length -1].createdTimestamp - msg[msg.length - 2].createdTimestamp;
          }else{
            Collect.get(message.guild.id)[message.author.id].floodwarns = 0;
            Collect.get(message.guild.id)[message.author.id].floodtime = 0;
          };
        };


        //ADVERTENCIA
        if(Collect.get(message.guild.id)[message.author.id].floodwarns > 3) {
          Collect.get(message.guild.id)[message.author.id].globalwarns += warn_point;
          
            let admin = "Spam Menciones";
            let motivo = "Flood";
            db.prepare(`INSERT INTO warns(idserver, idusuario, motivo, dia, mod) VALUES(${message.guild.id},${message.author.id}, '${motivo}', ${Date.now()}, '${admin}')`).run();            
                      
          let datos = {
            duplicado: false,
            mencion: false,
            flood: {
              tiempo: `${roundUp(Collect.get(message.guild.id)[message.author.id].floodtime/1000, 1)}s`,
              cantidad: Collect.get(message.guild.id)[message.author.id].floodwarns,
              advertencias: `${Collect.get(message.guild.id)[message.author.id].globalwarns}/${MAX_WARNING}`,
              detectado: false
            },
            invitacion: false
          };

          //DETECCION
          if(Collect.get(message.guild.id)[message.author.id].globalwarns >= MAX_WARNING) {
            datos.flood.detectado = true;
            Collect.get(message.guild.id)[message.author.id].msg = [];
            Collect.get(message.guild.id)[message.author.id].globalwarns = 0;
          };
          Collect.get(message.guild.id)[message.author.id].floodwarns = 0;
          Collect.get(message.guild.id)[message.author.id].floodtime = 0;
          return datos;
        };

        //RESETEAMOS LA LISTA DE MENSAJES DEL USUARIO, ESTO HARA QUE LA DETECCION SEA MAS FLUIDA
        if(Collect.get(message.guild.id)[message.author.id].msg.length > 20) {
          Collect.get(message.guild.id)[message.author.id].msg = [];
        };

        return false;
    }
};