module.exports = {
    ayuda: "Saves la palabra??.",
	ejemplo: "ahorcado",
	uso : null,
	permiso : "Ninguno",
    run: async (client, message, args) => {
      
const Discord = require("discord.js");
var app = require("quick.calculator");
const { stripIndents } = require('common-tags');
  
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

// message.channel.send("El creador del bot esta actualizando el bot ahora mismo, es posible que se pare la partida (Si se para, no contara como derrota)") 
 
let msg = message;

let statsahorcadov = db.prepare(`SELECT victorias_ahorcado FROM user_confi WHERE idusuario = ${message.author.id}`).get();
let statsahorcadod = db.prepare(`SELECT derrotas_ahorcado FROM user_confi WHERE idusuario = ${message.author.id}`).get();


let colores = ["dorado","rosa","jade","esmeralda","rojo","verde","azul","amarillo","beis","blanco","cian","crema","lila","magenta","violeta","granate","zafiro","fucsia","negro","lima","amatista","ocre"]
let xar = ["reddit","discord","telegram","facebook","hangouts","twitter","instagram","linkedin","whatsapp","messenger","snapchat","pinterest","youtube","skype","spotify"]
let animales = ["loro","gato","perro","avispa","caballo","ciervo","elefante","tigre","oso","toro","oveja","vaca","jirafa","burro","cangrejo","gallina","mosquito","canario"]
let pokemon =["squirtle","bulbasaur","charmander","pikachu","sinnoh","mew","pidgeotto","charizard","moltres","snorlax","xerneas","lunala","articuno","moltres","rayquaza","volcanion","hoopa","lugia","palkia","mewtwo","giratina","suicune","raikou","meowth","arcanine","geodude","golurr","omanyte","jinx","jirachi",,"entei","kyogre","groudon","skitty","sobble","venipede","forretress","phione","kyurem","purrloin","persian","ivysaur","venusaur","kabuto","kabutops","ditto","lucario","aerodactyl","charmeleon","omastar","omanyte","audino","aron","abra","squirtle","wartortle","blastoise"]
let marcas = ["bmw","porsche","lamborghini","kia","ferrari","audi","mercedes","toyota","honda","ford","xiaomi","huawei","apple","samsung","bq","sony","microsoft","nvidia","intel","amd","corsair","msi","gucci","vans","nike","off-white","supreme","lacoste","guess","versace","zara","puma","adidas","levis","reebok","fila","converse","jordan","kappa"]
let paises = ["barbados","bahamas","austria","australia","armenia","argentina","argelia","angola","china","albania","baticano","brasil","andorra","dinamarca","kenia","india","grecia","francia","alemania","chile","colombia","españa","nicaragua","portugal","suiza","ucrania"]
let videojuegos = ["detroit","fifa","destiny","borderlands","pes","minecraft","apex","fortnite","ark",,"counter-strike","metro","wolfenstein","warframe","payday"]
let comida = ["burrito","curry","pizza","sushi","hamburguesas","palomitas","paella","arroz","pollo","tacos","pan","miel","langosta","pastel","nata","helado","pastel","pasta","macarones","patatas"]
let personajes = ["mario","sonic","kratos","kirby","steve","bomberman","cj","luigi","batman","lester","richtofen","nikolai","takeo","densy","franklin","trevor","michael","ghost","takeo","nikolai","alex","kenny","monty","sandman","soap","yuri","makarov","roach","frost","goku","gohan"]

//console.log(personajes.length+comida.length+videojuegos.length+paises.length+marcas.length+pokemon.length+animales.length+xar.length+colores.length);

let poke = pokemon[Math.floor(Math.random() * pokemon.length)];
let ani = animales[Math.floor(Math.random() * animales.length)];
let xa = xar[Math.floor(Math.random() * xar.length)];
let col = colores[Math.floor(Math.random() * colores.length)];
let marc = marcas[Math.floor(Math.random() * marcas.length)];
let pais = paises[Math.floor(Math.random() * paises.length)];
let vj = videojuegos[Math.floor(Math.random() * videojuegos.length)];
let cm = comida[Math.floor(Math.random() * comida.length)];
let pj = personajes[Math.floor(Math.random() * personajes.length)];

const palabra = ["colores","xar","animales","pokemon","marcas","paises","videojuegos","comida","personajes"];
const pala = palabra[Math.floor(Math.random() * palabra.length)];

if(pala == "colores") var palabrx = col;
else if (pala == "xar") var palabrx = xa;
else if (pala == "animales") var palabrx = ani;
else if (pala == "pokemon") var palabrx = poke;
else if (pala == "marcas") var palabrx = marc;
else if (pala == "paises") var palabrx = pais;
else if (pala == "videojuegos") var palabrx = vj;
else if (pala == "comida") var palabrx = cm;
else if (pala == "personajes") var palabrx = pj;


console.log(palabrx)
  
if(pala == "colores") var tema = "Colores";
else if (pala == "xar") var tema = "Redes sociales";
else if (pala == "animales") var tema = "Animales";
else if (pala == "pokemon") var tema = "Pokemon";
else if (pala == "animales") var tema = "Animales";
else if (pala == "marcas") var tema = "Marcas";
else if (pala == "paises") var tema = "Paises";
else if (pala == "videojuegos") var tema = "Videojuegos";
else if (pala == "comida") var tema = "Comida";
else if (pala == "personajes") var tema = "Personajes Videojuegos";

		try {
			let points = 0;
			let displayText = null;
			let guessed = false;
			const confirmation = [];
			const incorrect = [];
			const display = new Array(palabrx.length).fill('_');
			while (palabrx.length !== confirmation.length && points < 6) {
				await message.channel.send(stripIndents`
          Juega: **${message.author.username}**
					${displayText === null ? '**Con que empezamos...?**' : displayText ? '**Buena, sigue asi!**' : '**Casi...!**'}
					\`${display.join(' ')}\`. \n Tema: **${tema}** 
					Letras incorrectas: **${incorrect.join(', ') || '-'}**
					\`\`\`
					___________
					|     |
					|     ${points > 0 ? 'O' : ''}
					|    ${points > 2 ? '—' : ' '}${points > 1 ? '|' : ''}${points > 3 ? '—' : ''}
					|    ${points > 4 ? '/' : ''} ${points > 5 ? '\\' : ''}
					===========
					\`\`\`
				`);
				const filter = res => {
					const choice = res.content.toLowerCase();
					return res.author.id === msg.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
				};
				const guess = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!guess.size) {

					if(!statsahorcadod){
						db.prepare(`INSERT INTO user_confi(idusuario, derrotas_ahorcado) VALUES(${message.author.id}, ${1})`).run();        
					}else{
						db.prepare(`UPDATE user_confi SET derrotas_ahorcado = ${statsahorcadod.derrotas_ahorcado + 1} WHERE idusuario = ${message.author.id}`).run();
					};
					
					let embed1 = new Discord.MessageEmbed()
					embed1.setColor("RED")
					embed1.setDescription("**Perdiste** \n Se termino el tiempo!")
			 
					return message.channel.send(embed1);	
				};
				const choice = guess.first().content.toLowerCase();
				if (choice === 'end') break;
				if (choice.length > 1 && choice === palabrx) {
					guessed = true;
					break;
				} else if (palabrx.includes(choice)) {
					displayText = true;
					for (let i = 0; i < palabrx.length; i++) {
						if (palabrx.charAt(i) !== choice) continue; 
						confirmation.push(palabrx.charAt(i));
						display[i] = palabrx.charAt(i);
					};
				} else {
					displayText = false;
					if (choice.length === 1) incorrect.push(choice);
					points++;
				};
			};
			if (palabrx.length === confirmation.length || guessed) {

				if(statsahorcadov == null || statsahorcadov == undefined || !statsahorcadov){          
					db.prepare(`INSERT INTO user_confi(idusuario, victorias_ahorcado) VALUES(${message.author.id}, ${1})`).run();        
				}else{
          let victoras = statsahorcadov.victorias_ahorcado;
          if(victoras == null) victoras = 0;          
					db.prepare(`UPDATE user_confi SET victorias_ahorcado = ${victoras + 1} WHERE idusuario = ${message.author.id}`).run();
				};

        
        let onoff = db.prepare(`SELECT economia FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

        if (onoff && onoff.economia && onoff.economia == 1) {
        let dinerouser = db.prepare(`SELECT * FROM economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).get();

          
        const monahor = db.prepare(`SELECT monedas_ahorcado FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
        if(monahor && monahor.monedas_ahorcado !== null) {       
          var cantidad = +monahor.monedas_ahorcado;
        }else{
          var cantidad = 10;
        };   
          
          
        if(dinerouser && dinerouser.dinero){
         db.prepare(`UPDATE economia SET dinero = ${dinerouser.dinero + cantidad} WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).run();
        }else{
          db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id}, ${message.author.id}, ${cantidad})`).run();
        };

        };
        
				let embed2 = new Discord.MessageEmbed()
				embed2.setColor("33cc33")
				embed2.setDescription(`**Victoria!** \n Has ganado, la palabra era **${palabrx}**`)
				return message.channel.send(embed2);
				
			};

			if(!statsahorcadod){
				db.prepare(`INSERT INTO user_confi(idusuario, derrotas_ahorcado) VALUES(${message.author.id}, ${1})`).run();        
			}else{
         let derrotas = statsahorcadod.derrotas_ahorcado;
         if(derrotas == null) derrotas = 0;
				db.prepare(`UPDATE user_confi SET derrotas_ahorcado = ${derrotas + 1} WHERE idusuario = ${message.author.id}`).run();
			};

	  		let embed3 = new Discord.MessageEmbed()
	  		  embed3.setColor("RED")
			  embed3.setDescription(`**Perdiste** \n Has perdido, la palabra era ** ${palabrx} **`)

			return message.channel.send(embed3);
    } catch (err) {
			return msg.reply(`Error: \`${err.message}\`. `);
		};
	}
};