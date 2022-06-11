const express = require('express');
const app = express();
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-discord");
const bodyparser = require("body-parser");

const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
});

const path = require("path");
const fs = require("fs");

const DBL = require("dblapi.js");
const dbl = new DBL(process.env.dblapi, client);

const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.setMaxListeners(1000);
EventEmitter.defaultMaxListeners = 1000;

const Antispam = require("./Antispam.js");
const ms = require("ms");
const Weez = require('weez');
const weez = new Weez.WeezAPI((process.env.API));
var Jimp = require('jimp');

client.on('ready', () => {
    console.log(`Conectado como ${client.user.tag}!`);
    client.user.setPresence({
        status: "online",
        activity: {
            name: `??ayuda || ${client.guilds.cache.size} servidores`,
            type: "WATCHING"
        }
    })

});


function T_convertor(ms) {
    let años = Math.floor((ms) / (1000 * 60 * 60 * 24 * 365));
    let meses = Math.floor(((ms) % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    let dias = Math.floor(((ms) % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    let horas = Math.floor(((ms) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutos = Math.floor(((ms) % (1000 * 60 * 60)) / (1000 * 60));
    let segundos = Math.floor(((ms) % (1000 * 60)) / 1000);

    let final = ""
    if (meses > 0) final += meses > 1 ? `${meses} meses, ` : `${meses} mes, `
    if (dias > 0) final += dias > 1 ? `${dias} dias, ` : `${dias} dia, `
    if (horas > 0) final += horas > 1 ? `${horas} horas, ` : `${horas} hora, `
    if (minutos > 0) final += minutos > 1 ? `${minutos} minutos y ` : `${minutos} minuto y `
    if (segundos > 0) final += segundos > 1 ? `${segundos} segundos.` : `${segundos} segundo.`
    return final
};


db.prepare(`CREATE TABLE IF NOT EXISTS economia(idserver TEXT, idusuario TEXT, dinero INTEGER)`).run();
db.prepare("CREATE TABLE IF NOT EXISTS tiempo_economia(idserver TEXT, idusuario TEXT, tiempo_crime INTEGER, tiempo_trabajar INTEGER, tiempo_daily INTEGER, tiempo_ruleta INTEGER)").run();
db.prepare("CREATE TABLE IF NOT EXISTS tienda (idserver TEXT, idrol TEXT, precio INTEGER)").run();
db.prepare("CREATE TABLE IF NOT EXISTS recompensas_niveles (idserver TEXT, idrol TEXT, nivel INTEGER)").run();
db.prepare("CREATE TABLE IF NOT EXISTS activar_desactivar (idserver TEXT, economia INTEGER, niveles INTEGER,automod INTEGER, entrada1 INTEGER, entrada2 INTEGER, entrada3 INTEGER, entrada4 INTEGER, salida1 INTEGER, salida2 INTEGER, salida3 INTEGER, salida4 INTEGER, confignombre INTEGER, log INTEGER)").run();
db.prepare("CREATE TABLE IF NOT EXISTS niveles (idserver TEXT, idusuario TEXT, xp INTEGER, nivel INTEGER)").run();
db.prepare("CREATE TABLE IF NOT EXISTS personalizar_comandos (idserver TEXT, colorembed TEXT, prefix TEXT, canal_niv TEXT, mensaje_niv TEXT, canalautomod TEXT, canalsugerencias TEXT, config_nombre TEXT, canal_entrada1 TEXT, texto_entrada1 TEXT, canal_entrada2 TEXT,canal_entrada3 TEXT, canal_entrada4 TEXT, canal_salida1 TEXT, texto_salida1 TEXT, canal_salida2 TEXT,canal_salida3 TEXT, canal_salida4 TEXT, crime_max TEXT, crime_min TEXT, crime_msgV TEXT, crime_msgD TEXT, crime_tiempo TEXT, trabajar_max TEXT, trabajar_min TEXT, trabajar_msg TEXT, trabajar_tiempo TEXT, log_canal TEXT, entrada3_color TEXT, entrada3_titulo TEXT, entrada3_descripcion TEXT, entrada3_fondo TEXT, salida3_color TEXT, salida3_titulo TEXT, salida3_descripcion TEXT, salida3_fondo TEXT, entrada4_texto TEXT, salida4_texto TEXT, monedas_ahorcado TEXT, monedas_pacman TEXT)").run();
db.prepare(`CREATE TABLE IF NOT EXISTS user_confi (idusuario TEXT, afk_motivo TEXT, victorias_ahorcado INTEGER, derrotas_ahorcado INTEGER, victorias_pacman INTEGER, derrotas_pacman INTEGER)`).run();
db.prepare("CREATE TABLE IF NOT EXISTS lista_blanca_automod (idserver TEXT, canal TEXT)").run();
db.prepare("CREATE TABLE IF NOT EXISTS warns (idserver TEXT,idusuario TEXT,motivo TEXT,dia TEXT,mod TEXT)").run();
db.prepare("CREATE TABLE IF NOT EXISTS dbmigrar (idserver TEXT,idusuario TEXT)").run();

db.prepare("CREATE TABLE IF NOT EXISTS cooldown (idserver TEXT,idusuario TEXT, cooldowncom TEXT, cooldownniv TEXT)").run();

client.on("guildCreate", (guild) => {
    let upchan;

    for (var x = 0; x < guild.channels.cache.array().length; x++) {
        if (guild.channels.cache.array()[x].type == "text") {
            if (!upchan) {
                upchan = guild.channels.cache.array()[x];
                continue;
            };
            if (guild.channels.cache.array()[x].position < upchan.position) {
                upchan = guild.channels.cache.array()[x];
            };
        };
    };
    if (!upchan) return;

    let embed = new Discord.MessageEmbed()
    embed.setColor("#7289D9")
    embed.setDescription("**Hola me presento, soy Sad Bot.** \n \n Soy un bot que tiene como objetivo facilitar a los usuarios su estancia en el servidor, si desea ver mis comandos tan sólo escriba ``??ayuda`` y le atenderé con mucho gusto. ^^")
    return upchan.send(embed)
});


client.on("guildMemberRemove", member => {
    let modosalida = db.prepare(`SELECT salida1 FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!modosalida || modosalida.salida1 == 0) return;

    let canal_id = db.prepare(`SELECT canal_salida1 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!canal_id || !canal_id.canal_salida1) return;
    if (canal_id.canal_salida1) {

        let dbselect = db.prepare(`SELECT texto_salida1 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
        if (dbselect && dbselect.texto_salida1 !== null) {
            var mensaje = dbselect.texto_salida1;
        } else {
            var mensaje = "Ha dejado el servidor."
        };

        let canal = member.guild.channels.cache.get(canal_id.canal_salida1)
        if (!canal) return;
        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setThumbnail(member.user.avatarURL())
            .addField('Nombre:', member.user.username)
            .setDescription(mensaje)
        return canal.send(embed);
    };
});

client.on("guildMemberRemove", member => {
    let modosalida = db.prepare(`SELECT salida2 FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!modosalida || modosalida.salida2 == 0) return;

    let canal_id = db.prepare(`SELECT canal_salida2 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!canal_id || !canal_id.canal_salida2) return;
    if (canal_id.canal_salida2) {
        let canal = member.guild.channels.cache.get(canal_id.canal_salida2);
        if (!canal) return;
        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(member.user.username, member.user.avatarURL())
            .setFooter(`Salida de usuario detectado`)
            .setTimestamp()
        return canal.send(embed);
    };
});

client.on("guildMemberRemove", async member => {
    let modosalida = db.prepare(`SELECT salida4 FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!modosalida || modosalida.salida4 == 0) return;

    let canal_id = db.prepare(`SELECT canal_salida4 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!canal_id || !canal_id.canal_salida4) return;

    let canal = member.guild.channels.cache.get(canal_id.canal_salida4);
    if (!canal) return;
    let usuario = member.user.username;

    let textodes;

    let dbtexto = db.prepare(`SELECT salida4_texto FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!dbtexto || !dbtexto.salida4_texto) {
        textodes = `Se fue ${usuario}`;
    } else {
        textodes = dbtexto.salida4_texto;
    };
    textodes = textodes.replace(/{usuario}/g, `${member.user.username }`);
    textodes = textodes.replace(/{servidor}/g, `${member.guild.name}`);
    return canal.send(textodes)
});

client.on("guildMemberAdd", async member => {
    let filas = db.prepare(`SELECT confignombre FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!filas || filas.confignombre == 0 || filas.confignombre == null || filas.confignombre == undefined) return;

    let filasdb = db.prepare(`SELECT config_nombre FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();

    let x = member.user.username;
    let texto = filasdb.config_nombre;
    await member.guild.members.cache.get(member.user.id).setNickname(`${texto} ${x}`);

    return;
});

client.on("guildMemberAdd", (member) => {
    let modosalida = db.prepare(`SELECT entrada4 FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!modosalida || modosalida.entrada4 == 0) return;

    let canal_id = db.prepare(`SELECT canal_entrada4 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!canal_id || !canal_id.canal_entrada4) return;
    if (canal_id.canal_entrada4) {

        let canal = member.guild.channels.cache.get(canal_id.canal_entrada4);
        if (!canal) return;
        let usuario = member.user.username;

        let textodes;
        let dbtexto = db.prepare(`SELECT entrada4_texto FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
        if (!dbtexto || !dbtexto.entrada4_texto) {
            textodes = `Bienvenido ${usuario}`;
        } else {
            textodes = dbtexto.entrada4_texto;
        };

        textodes = textodes.replace(/{usuario}/g, `${member.user.username }`);
        textodes = textodes.replace(/{servidor}/g, `${member.guild.name}`);
        return canal.send(textodes);
    };
});




client.on("guildMemberAdd", async member => {

    let modosalida = db.prepare(`SELECT entrada3 FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!modosalida || modosalida.entrada3 == 0) return;

    let canal_id = db.prepare(`SELECT canal_entrada3 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!canal_id || !canal_id.canal_entrada3) return;

    let canal = member.guild.channels.cache.get(canal_id.canal_entrada3);
    let usuario = member.user.username;

    let personalizarentrada3 = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();


    let lista;
    if (!personalizarentrada3 || !personalizarentrada3.entrada3_fondo) {
        lista = "https://cdn.discordapp.com/attachments/527103273048604672/527103304774189057/Entrada1.png"
    } else {
        lista = personalizarentrada3.entrada3_fondo;
    };

    let color;
    if (!personalizarentrada3 || !personalizarentrada3.entrada3_color) {
        color = "ffffff";
    } else {
        color = personalizarentrada3.entrada3_color;
    };

    let textoent;
    if (!personalizarentrada3 || !personalizarentrada3.entrada3_titulo) {
        textoent = "BIENVENIDO - BIENVENIDA";
    } else {
        textoent = personalizarentrada3.entrada3_titulo;
    };

    textoent = textoent.replace(/{usuario}/g, `${member.user.username}`)
    textoent = textoent.replace(/{servidor}/g, `${member.guild.name}`)

    let textodes;
    if (!personalizarentrada3 || !personalizarentrada3.entrada3_descripcion) {
        textodes = `${usuario}`;
    } else {
        textodes = personalizarentrada3.entrada3_descripcion;
    };

    textodes = textodes.replace(/{usuario}/g, `${member.user.username }`);
    textodes = textodes.replace(/{servidor}/g, `${member.guild.name}`);

    let textocol = color.replace(/#/g, ``);

    console.log(lista)
    console.log(textocol)
    console.log(textoent)
    console.log(textodes)

    let bienvenida = new Weez.Bienvenida()
        .avatar(member.user.displayAvatarURL({
            format: "png"
        }))
        .fondo(lista)
        .textoColor(textocol)
        .textoTitulo(textoent)
        .textoDesc(textodes)
    let img = await weez.getBienvenida(bienvenida);
    canal.send({
        files: [img]
    });
})
client.on("guildMemberRemove", async member => {

    let modosalida = db.prepare(`SELECT salida3 FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!modosalida || modosalida.salida3 == 0) return;

    let canal_id = db.prepare(`SELECT canal_salida3 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!canal_id || !canal_id.canal_salida3) return;

    let canal = member.guild.channels.cache.get(canal_id.canal_salida3);
    if (!canal) return;
    let usuario = member.user.username;

    let personalizarsalida3 = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();

    let lista;
    if (!personalizarsalida3 || !personalizarsalida3.salida3_fondo) {
        lista = "https://cdn.discordapp.com/attachments/527103273048604672/527103435494129674/Salida1.png"
    } else {
        lista = personalizarsalida3.salida3_fondo;
    };

    let color;
    if (!personalizarsalida3 || !personalizarsalida3.salida3_color) {
        color = "ffffff";
    } else {
        color = personalizarsalida3.salida3_color;
    };

    let textoent;
    if (!personalizarsalida3 || !personalizarsalida3.salida3_titulo) {
        textoent = "SE FUE DEL SERVIDOR";
    } else {
        textoent = personalizarsalida3.salida3_titulo;
    };

    textoent = textoent.replace(/{usuario}/g, `${member.user.username}`)
    textoent = textoent.replace(/{servidor}/g, `${member.guild.name}`)

    let textodes;
    if (!personalizarsalida3 || !personalizarsalida3.salida3_descripcion) {
        textodes = `${usuario}`;
    } else {
        textodes = personalizarsalida3.salida3_descripcion;
    };

    textodes = textodes.replace(/{usuario}/g, `${member.user.username}`)
    textodes = textodes.replace(/{servidor}/g, `${member.guild.name}`)

    let textocol = color.replace(/#/g, ``);

    console.log(lista)
    console.log(textocol)
    console.log(textoent)
    console.log(textodes)

    let bienvenida = new Weez.Bienvenida()
        .avatar(member.user.displayAvatarURL({
            format: "png"
        }))
        .fondo(lista)
        .textoColor(textocol)
        .textoTitulo(textoent)
        .textoDesc(textodes)
    let img = await weez.getBienvenida(bienvenida);
    member.guild.channels.cache.get(canal.id).send({
        files: [img]
    })
})
client.on("guildMemberAdd", (member) => {
    let modosalida = db.prepare(`SELECT entrada2 FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!modosalida || modosalida.entrada2 == 0) return;

    let canal_id = db.prepare(`SELECT canal_entrada2 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!canal_id || !canal_id.canal_entrada2) return;

    let canal = member.guild.channels.cache.get(canal_id.canal_entrada2);
    if (!canal) return;
    let embed = new Discord.MessageEmbed()
        .setColor(0x15ff00)
        .setAuthor(member.user.username, member.user.avatarURL())
        .setFooter(`Nuevo usuario detectado`)
        .setTimestamp()
    return canal.send(embed);
});
client.on("guildMemberAdd", member => {

    let modosalida = db.prepare(`SELECT entrada1 FROM activar_desactivar WHERE idserver = ${member.guild.id}`).get();
    if (!modosalida || modosalida.entrada1 == 0) return;

    let canal_id = db.prepare(`SELECT canal_entrada1 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (!canal_id || !canal_id.canal_entrada1) return;

    let dbselect = db.prepare(`SELECT texto_entrada1 FROM personalizar_comandos WHERE idserver = ${member.guild.id}`).get();
    if (dbselect && dbselect.texto_entrada1 !== null) {
        var mensaje = dbselect.texto_entrada1;
    } else {
        var mensaje = "Se ha unido al servidor.";
    };

    let canal = member.guild.channels.cache.get(canal_id.canal_entrada1);
    if (!canal) return;
    let embed = new Discord.MessageEmbed()
        .setColor(0x15ff00)
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Nombre:', member.user.username)
        .setDescription(mensaje)
    return canal.send(embed)
})
client.on('voiceStateUpdate', async (oldState, newState) => {

    let modosalida = db.prepare(`SELECT log FROM activar_desactivar WHERE idserver = ${oldState.guild.id}`).get();
    if (!modosalida || modosalida.log == 0) return;

    let canal_id = db.prepare(`SELECT log_canal FROM personalizar_comandos WHERE idserver = ${oldState.guild.id}`).get();
    if (!canal_id || !canal_id.log_canal) return;

    let canal = oldState.guild.channels.cache.get(canal_id.log_canal);
    if (!canal) return;

    if (oldState.channelID === null || newState.channelID !== (oldState.channelID && null)) {
        let embed = new Discord.MessageEmbed()
            .setColor("ffa700")
            .setTitle(":left_right_arrow: Nuevo cambio de canal de voz detectado")
            .setDescription("**" + newState.member.user.username + "** se ha unido en el canal, **" + newState.channel.name + "**.");
        canal.send(embed);
    } else if (newState.channelID === null) {
        let embed = new Discord.MessageEmbed()
            .setColor("ffa700")
            .setTitle(":left_right_arrow: Nuevo cambio de canal de voz detectado")
            .setDescription("**" + oldState.member.user.username + "** ha salido del canal, **" + oldState.channel.name + "**.");
        canal.send(embed);
    };
});


client.on("messageDelete", (messageDelete) => {
    if (messageDelete.channel.type == "dm") return;

    let modosalida = db.prepare(`SELECT log FROM activar_desactivar WHERE idserver = ${messageDelete.guild.id}`).get();
    if (!modosalida || modosalida.log == 0) return;

    let canal_id = db.prepare(`SELECT log_canal FROM personalizar_comandos WHERE idserver = ${messageDelete.guild.id}`).get();
    if (!canal_id || !canal_id.log_canal) return;

    let canal = messageDelete.guild.channels.cache.get(canal_id.log_canal);
    if (!canal) return;

    let embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("Se ha eliminado un mensaje")
        .setDescription(`Mensaje de **${messageDelete.author.tag}** \n Canal del Mensaje **${messageDelete.channel}** \n Contenido del mensaje ** ${messageDelete.content} **`)
    canal.send(embed);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    if (oldMessage.channel.type == "dm") return;

    if (newMessage.author.bot) return;
    let modosalida = db.prepare(`SELECT log FROM activar_desactivar WHERE idserver = ${oldMessage.guild.id}`).get();
    if (!modosalida || modosalida.log == 0) return;

    let canal_id = db.prepare(`SELECT log_canal FROM personalizar_comandos WHERE idserver = ${oldMessage.guild.id}`).get();
    if (!canal_id || !canal_id.log_canal) return;
    let canal = oldMessage.guild.channels.cache.get(canal_id.log_canal);
    if (!canal) return;
    let embed = new Discord.MessageEmbed()
        .setColor("#32CD32")
        .setTitle("Se ha modificado un mensaje")
        .setDescription(`Mensaje de **${oldMessage.author.tag}** \n Contenido del mensaje **${newMessage.content}** \n Contenido del mensaje antes de ser modificado **${oldMessage.content}** \n Canal del Mensaje **${oldMessage.channel}**`)
    canal.send(embed)
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
    let modosalida = db.prepare(`SELECT log FROM activar_desactivar WHERE idserver = ${oldMember.guild.id}`).get();
    if (!modosalida || modosalida.log == 0) return;

    let canal_id = db.prepare(`SELECT log_canal FROM personalizar_comandos WHERE idserver = ${oldMember.guild.id}`).get();
    if (!canal_id || !canal_id.log_canal) return;
    let canal = oldMember.guild.channels.cache.get(canal_id.log_canal);
    if (!canal) return;

    if (newMember._roles.length > oldMember._roles.length) {
        let after_roles = newMember._roles;
        let before_roles = oldMember._roles;
        let final = after_roles.filter(r => !before_roles.includes(r))

        let rolfinal = newMember.guild.roles.cache.find(r => r.id === final[0]);

        let embed = new Discord.MessageEmbed()
            .setColor("#FFA500")
            .setTitle("Se ha añadido un rol a un usuario")
            .setDescription(`Miembro: **${newMember.user.username}** \n Rol agregado: **${rolfinal.name}**`)

        canal.send(embed)
    };

});

client.on("guildMemberUpdate", (oldMember, newMember) => {
    let modosalida = db.prepare(`SELECT log FROM activar_desactivar WHERE idserver = ${oldMember.guild.id}`).get();
    if (!modosalida || modosalida.log == 0) return;

    let canal_id = db.prepare(`SELECT log_canal FROM personalizar_comandos WHERE idserver = ${oldMember.guild.id}`).get();
    if (!canal_id || !canal_id.log_canal) return;
    let canal = oldMember.guild.channels.cache.get(canal_id.log_canal);
    if (!canal) return;

    if (oldMember._roles.length > newMember._roles.length) {
        let after_roles = oldMember._roles;
        let before_roles = newMember._roles;
        let final = after_roles.filter(r => !before_roles.includes(r))
        let rolfinal = newMember.guild.roles.cache.find(r => r.id === final[0]);

        let embed = new Discord.MessageEmbed()
            .setColor("#FFFF00")
            .setTitle("Se ha eliminado un rol a un usuario")
            .setDescription(`Miembro: **${newMember.user.username}** \n Rol eliminado: **${rolfinal.name}**`)
        canal.send(embed)
    };
});




client.on("message", async message => {

    if (message.channel.id == "264445053596991498") return;

    if (message.author.bot) return;
    if (message.channel.type == "dm") return message.channel.send("¿¿¿Quién soy??? \n Oh, espera, soy un bot y no funciono por privado");

    let onoff = db.prepare(`SELECT * FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

    if (onoff !== undefined && onoff && (onoff.automod == 1 || onoff.automod == 0)) {
        if (onoff.automod == 1) {

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                if (!message.guild.me.hasPermission("MANAGE_ROLES")) return;


                let canaldb = db.prepare(`SELECT canalautomod FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

                let datoslb = [];

                let listablancadb = db.prepare(`SELECT canal FROM lista_blanca_automod WHERE idserver = ${message.guild.id}`).all();

                listablancadb.map(ls => {
                    datoslb.push(ls.canal);
                });

                if (canaldb) {
                    var canal_id = canaldb.canalautomod;
                };

                let canal = message.guild.channels.cache.get(canal_id);

                const admax = db.prepare(`SELECT advertencias_max FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
                if (admax && admax.advertencias_max !== null) {
                    var tadmax = admax.advertencias_max;
                } else {
                    var tadmax = "10";
                };

                const adflood = db.prepare(`SELECT advertencias_flood FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
                if (adflood && adflood.advertencias_flood !== null) {
                    var tadflood = adflood.advertencias_flood;
                } else {
                    var tadflood = "3";
                };

                const adinf = db.prepare(`SELECT advertencias_inv FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
                if (adinf && adinf.advertencias_inv !== null) {
                    var tadinf = adinf.advertencias_inv;
                } else {
                    var tadinf = "5";
                };

                const admen = db.prepare(`SELECT advertencias_men FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
                if (admen && admen.advertencias_men !== null) {
                    var tadmen = admen.advertencias_men;
                } else {
                    var tadmen = "5";
                };

                let datos = await Antispam.verificar(message, {
                    max_advertencias: +tadmax,
                    flood_puntos: +tadflood,
                    mencion_puntos: +tadmen,
                    invitaciones: true,
                    invite_puntos: +tadinf,
                    usuarios: [],
                    canales: datoslb.slice()
                });

                var admin = "Automod";

                var warnembed = new Discord.MessageEmbed();
                var mutedembed = new Discord.MessageEmbed();
                warnembed.setColor("#ff5f00")
                warnembed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                mutedembed.setColor("#cc0000")
                mutedembed.setAuthor(message.author.tag, message.author.displayAvatarURL())

                if (datos) {
                    let muted_rol = message.guild.roles.cache.find(r => r.name == "Muteado");
                    if (!muted_rol) {
                        let x = message.guild.member("512185944451973123").roles.highest.position;
                        muted_rol = await message.guild.roles.create({
                            name: "Muteado",
                            color: "#2E2C2C",
                            permissions: []
                        });
                        await muted_rol.setPosition(x - 2);
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muted_rol, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            });
                        });
                    };
                    if (datos.duplicado) {
                        message.delete();
                        warnembed.setDescription(`**${message.author.tag}** envio un mensaje en ${message.channel} que contenia multiples caracteres iguales.\n**Mensaje:**\n${message.content.length < 1000 ? message.content : message.content.slice(0, 500)+".."}`)
                        return canal.send(warnembed);
                    } else if (datos.mencion) {
                        message.delete();
                        let cantidad = datos.mencion.cantidad;
                        let advertencias = datos.mencion.advertencias;
                        let detectado = datos.mencion.detectado;
                        warnembed.setDescription(`**${message.author.tag}** hizo ${cantidad} menciones en el canal ${message.channel}.\n**Advertencias:** ${advertencias}\n**Mensaje:**\n${message.content.length < 1000 ? message.content : message.content.slice(0, 500)+".."}`)
                        await canal.send(warnembed);

                        if (detectado) {
                            if (!muted_rol) return;
                            message.member.roles.add(muted_rol.id);
                            mutedembed.setDescription(`**__SPAMMER DETECTADO__**\n**${message.author.tag}** llego al limite de advertencias: **${advertencias}**\nSe ejecuto la prevencion.`)
                            await canal.send(mutedembed);
                        };
                        return;
                    } else if (datos.flood) {
                        let tiempo = datos.flood.tiempo;
                        let cantidad = datos.flood.cantidad;
                        let advertencias = datos.flood.advertencias;
                        let detectado = datos.flood.detectado;

                        warnembed.setDescription(`**${message.author.tag}** envio **${cantidad}** mensajes en ${message.channel} con un tiempo de ${tiempo}.\n**Advertencias:** ${advertencias}`)
                        canal.send(warnembed);

                        if (detectado) {
                            if (!muted_rol) return;
                            message.member.roles.add(muted_rol.id);
                            mutedembed.setDescription(`**__SPAMMER DETECTADO__**\n**${message.author.tag}** llego al limite de advertencias: **${advertencias}**\nSe ejecuto la prevencion.`)
                            canal.send(mutedembed);
                        };
                        return;
                    } else if (datos.invitacion) {
                        message.delete();
                        let link = datos.invitacion.url;
                        let servidor = datos.invitacion.servidor;
                        let serverid = datos.invitacion.id;
                        let advertencias = datos.invitacion.advertencias;
                        let detectado = datos.invitacion.detectado;
                        warnembed.setDescription(`**${message.author.tag}** envio una invitacion en el canal ${message.channel}\n**Link:** ${link}\n**Servidor:** ${servidor}\n**ID del servidor:** ${serverid}.\n**Advertencias:** ${advertencias}`)
                        canal.send(warnembed);

                        if (detectado == true) {
                            if (!muted_rol) return;
                            message.member.roles.add(muted_rol.id);

                            mutedembed.setDescription(`**__SPAMMER DETECTADO__**\n**${message.author.tag}** llego al limite de advertencias: **${advertencias}**\nSe ejecuto la prevencion.`)
                            canal.send(mutedembed);
                        };
                        return;
                    }
                };
            };
        };
    };



    const palabras = ["hola", "Hola", "HOLA"];
    if (palabras.some(p => message.content.includes(p))) {
        if (message.content.toLowerCase().startsWith("holanda")) return
        for (var x = 0; x < palabras.length; x++) {
            if (message.content.toLowerCase().startsWith(palabras[x])) {
                message.react("👋")
            };
        };
    };

    var color = db.prepare(`SELECT colorembed FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
    if (!color || color.colorembed == null) {
        var cembed = "#7289D9";
    } else {
        var cembed = color.colorembed;
    };

    let afk = db.prepare(`SELECT afk_motivo FROM user_confi WHERE idusuario = ${message.author.id}`).get();
    if (afk && afk.afk_motivo !== null && afk.afk_motivo !== undefined) {
        db.prepare(`UPDATE user_confi SET afk_motivo = ${null} WHERE idusuario = ${message.author.id}`).run();
        let embed = new Discord.MessageEmbed()
            .setColor(cembed)
            .setDescription(`${message.author}, Has salido del modo AFK`)
        message.channel.send(embed).then(msg => msg.delete({
            timeout: 5000,
            reason: 'Mensaje de propio bot eliminado a los 5seg.'
        }));
    };


    if (message.mentions.members.first()) {
        let user_mention = message.mentions.members.first();
        let afk = db.prepare(`SELECT afk_motivo FROM user_confi WHERE idusuario = ${user_mention.id}`).get();
        if (afk && afk.afk_motivo !== null && afk.afk_motivo !== undefined) {
            const embed = new Discord.MessageEmbed()
                .setColor(cembed)
                .setDescription(`${message.author}, ${user_mention.user.username} actualmente se encuentra AFK,por el siguiente motivo: *${afk.afk_motivo}* .`)
            message.channel.send(embed);
        };
    };

    var selectprefix = db.prepare(`SELECT prefix FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

    if (!selectprefix || !selectprefix.prefix || selectprefix.prefix == null || selectprefix.prefix == undefined) {
        var prefix = "??";
    } else {
        var prefix = selectprefix.prefix;
    };

    let args = message.content.slice(prefix.length).trim().split(' ');
    let command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) {

        if (onoff) {
            if (onoff.niveles == 0) return;

            if (onoff.niveles == 1) {

                if (message.content.lenght <= 5) return;

                let cooldowndb = db.prepare(`SELECT * FROM cooldown WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).get();

                let cooldownnivr;
                if (!cooldowndb) {
                    cooldownnivr = 0;
                } else {
                    cooldownnivr = cooldowndb.cooldownniv;
                }


                if (Date.now() < cooldownnivr) {
                    return;
                };

                let filas = db.prepare(`SELECT * FROM niveles WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).get();
                if (filas == null || !filas) {
                    var xp = 0;
                    var nivel = 1;
                    return db.prepare(`INSERT INTO niveles VALUES(${message.guild.id},${message.author.id},${xp},${nivel})`).run();
                };

                if (filas) {

                    const cantidadxp = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
                    if (cantidadxp && cantidadxp.min_xp_niv !== null) {
                        var tminxp = cantidadxp.min_xp_niv;
                    } else {
                        var tminxp = 10;
                    };

                    if (cantidadxp && cantidadxp.max_xp_niv !== null) {
                        var tmaxxp = cantidadxp.max_xp_niv;
                    } else {
                        var tmaxxp = 15;
                    };


                    let randomxp = Math.round(Math.random() * (tmaxxp - tminxp) + tminxp); //Math.round(Math.random() * (max - min) + min);
                    let levelup = 5 * (filas.nivel ** 2) + 50 * filas.nivel + 100;

                    let filasset = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
                    if (!filasset) {

                        var iniv = null;
                        var itext = "{usuario} has subido a nivel {nivel}";

                        db.prepare(`INSERT INTO personalizar_comandos(idserver, canal_niv, mensaje_niv) VALUES(${message.guild.id}, ${iniv}, '${itext}')`).run();

                    };

                    if ((filas.xp + randomxp) >= levelup) {
                        db.prepare(`UPDATE niveles SET nivel = ${parseInt(filas.nivel+1)} WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).run();
                        db.prepare(`UPDATE niveles SET xp = ${1} WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).run();

                        let user = message.author;


                        let ua = await Jimp.read(user.displayAvatarURL({
                            format: 'png'
                        }));
                        Jimp.read('https://cdn.discordapp.com/attachments/508030929571282964/613698741635121173/img.png', (e, img) => {

                            ua.resize(210, 210);
                            img.blit(ua, 110, 60);
                            img.getBuffer(Jimp.MIME_PNG, async (e, image) => {


                                let mensajerepla;
                                let filasniv = db.prepare(`SELECT mensaje_niv FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

                                if (!filasniv || filasniv.mensaje_niv == null || filasniv.mensaje_niv == undefined) {
                                    mensajerepla = `${message.author} has subido a nivel ${parseInt(filas.nivel+1)}`;
                                } else {
                                    mensajerepla = filasniv.mensaje_niv
                                    mensajerepla = mensajerepla.replace(/{usuario}/g, `${message.author}`);
                                    mensajerepla = mensajerepla.replace(/{servidor}/g, `${message.guild.name}`);
                                    mensajerepla = mensajerepla.replace(/{nivel}/g, `${parseInt(filas.nivel+1)}`);
                                    mensajerepla = mensajerepla.replace(/undefined/g, `${parseInt(filas.nivel+1)}`);
                                };

                                let filascan = db.prepare(`SELECT canal_niv FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

                                if (filascan.canal_niv) {

                                    let niv_canal = filascan.canal_niv;
                                    let canal = await message.guild.channels.cache.get(niv_canal);
                                    await canal.send(`${mensajerepla}`, {
                                        files: [image]
                                    });
                                } else {
                                    message.channel.send(`${mensajerepla}`, {
                                        files: [image]
                                    });
                                };

                            });

                            db.prepare(`SELECT idrol FROM recompensas_niveles WHERE idserver = ${message.guild.id} AND nivel = ${parseInt(filas.nivel+1)}`, async (err, filas1) => {
                                if (err) return console.error("41" + err.message);

                                if (filas1) {
                                    message.member.roles.add(filas1.idrol).catch(err => message.channel.send("Ha ocurido un error al poner el rol, no tengo permisos suficientes"));
                                    message.channel.send(`Ganaste el la recompensa de nivel ${parseInt(filas.nivel+1)}`);
                                };

                            });
                        });
                    };

                    const tiemniv = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
                    if (tiemniv && tiemniv.tiempo_niv !== undefined) {
                        var ttiemniv = tiemniv.tiempo_niv;
                    } else {
                        var ttiemniv = 10;
                    };

                    if(ttiemniv == null) ttiemniv = 5
                  
                    let tiempofinal = ttiemniv + "000";

                    if (tiempofinal >= 5000) tiempofinal = 5000

                    console.log("tiempofinal " + tiempofinal)

                  
                    if (!cooldowndb) {
                        db.prepare(`INSERT INTO cooldown(idserver, idusuario, cooldownniv) VALUES(${message.guild.id}, ${message.author.id},${Date.now() + parseInt(tiempofinal)})`).run();
                    } else {
                        db.prepare(`UPDATE cooldown SET cooldownniv = ${Date.now() + parseInt(tiempofinal)} WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).run();
                    };

                    if ((filas.xp + randomxp) < levelup) {
                        db.prepare(`UPDATE niveles SET xp = ${filas.xp + randomxp} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id} `).run();
                    };
                };
            };
        }
    };


    if (!message.content.startsWith(prefix)) return;
    if (command === "eval") {
        if (message.author.id !== "445334027512315915") return;
        let limit = 1950;
        try {
            let code = args.join(' ');
            let evalued = eval(code);
            if (typeof evalued !== "string")
                evalued = require("util").inspect(evalued);
            let txt = "" + evalued;
            if (txt.length > limit) {
                message.channel.send(`\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``);
            } else
                message.channel.send(`\`\`\`js\n ${txt}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
        }
    }


    if (command == "reiniciar-ahorcado") {
        if (message.author.id !== "445334027512315915") return;
        db.prepare(`UPDATE user_confi SET derrotas_ahorcado = ${null}`).run();
        db.prepare(`UPDATE user_confi SET victorias_ahorcado = ${null}`).run();

        const embed0 = new Discord.MessageEmbed()
        embed0.setColor("GREEN")
        embed0.setDescription(`<:tick:613820461675053066> || Se ha reiniciado el top del ahorcado`)

        message.channel.send(embed0)

    };

    let cooldowndb = db.prepare(`SELECT * FROM cooldown WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).get();

    console.log(cooldowndb)

    let cooldowncomr;
    if (!cooldowndb) {
        cooldowncomr = 0;
    } else {
        cooldowncomr = cooldowndb.cooldowncom;
    }


    if (Date.now() < cooldowncomr) {
        let embed = new Discord.MessageEmbed()
            .setColor(cembed)
            .setDescription(`** ${message.author.username}**, el comando volverá a estar disponible en ${Math.round((cooldowncomr - Date.now()) /1000)} segundos.`)
        return message.channel.send(embed)
    };


    try {
        if (!command) return;
        let commands = require(`./commands/${command}.js`);
        if (!commands) return;
        commands.run(client, message, args);
    } catch (e) {
        if (!command) return;
        const embed = new Discord.MessageEmbed()
            .setColor("#7289D9")
            .setDescription(`${e.stack}`)
        let logger = client.channels.cache.get("626452723302268928");
        logger.send(embed);
        return;
    } finally {
        if (!command) return;
        let logger = client.channels.cache.get("626452925786488836");
        const embed = new Discord.MessageEmbed()
            .setColor("#7289D9")
            .setDescription('**' + message.author.tag + '** uso el comando** ' + command + '** en el servidor **' + message.guild.name + '**  canal #' + message.channel.name)
            .setFooter(message.createdAt);
        logger.send(embed);

        if (!cooldowndb) {
            db.prepare(`INSERT INTO cooldown(idserver, idusuario, cooldowncom, cooldownniv) VALUES(${message.guild.id}, ${message.author.id},${Date.now() + 3000},${0})`).run();
        } else {
            db.prepare(`UPDATE cooldown SET cooldowncom = ${Date.now() + 3000} WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).run();
        };

        return;

    };
});




client.login(process.env.ZLj7s74);


passport.serializeUser((user, done) => {
    done(null, user);

});
passport.deserializeUser((obj, done) => {
    done(null, obj);

});

let scopes = ["identify", "guilds"];

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirect_uri: `${process.env.URL}/login`,
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({
        extended: true
    }))
    .engine("html", require("ejs").renderFile)
    .use(express.static(path.join(__dirname, "/public")))
    .set("view engine", "ejs")
    .set("views", path.join(__dirname, "views"))
    .set('port', process.env.PORT || 3000)
    .use(session({
        secret: "SadBot",
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(function(req, res, next) {
        req.bot = client;
        req.db = db;
        next();
    })
    .use("/", require("./ruta/index"))
    .use("/perfil", require("./ruta/perfil"))
    .use("/api", require("./ruta/api"))
    .use("/contribuidores", require("./ruta/contribuidores"))
    .use("/server", require("./ruta/servidor"))
    .get("*", function(req, res) {
        res.redirect("/")
    });


app.listen(app.get('port'), function() {
    console.log('Listo en el puerto ' + app.get('port'));
});

process.on("unhandledRejection", (r) => {
    console.dir(r);
});