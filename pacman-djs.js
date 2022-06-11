const EventEmmiter = require("events");
const Util = require("util");

let wall = "⬛";
let floor = "⬜";
const ghost = "👻";
let player = "😶";
let coin = "⭐";

let CENTRO = 0
let ARRIBA = 1
let ABAJO = 2
let IZQUIERDA = 3
let DERECHA = 4



class PacGame {
  constructor(map, time = 4, options = {}) {
    
    
  
 let mapa = [ 
  "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
  "⬛⬜⭐⭐⭐⬜👻⬜⭐⭐⭐⬜⬛",
  "⬛⬜⬛⬛⭐⬜⬛⬜⭐⬛⬛⬜⬛",
  "⬛⬜⬛⬜⬜⬛⬛⬛⬜⬜⬛⬜⬛",
  "⬛⬜⬜⬜⬜⬜⬛⬜⬜⬜⬜⬜⬛",
  "⬛⭐⬜⬛⬛⬜👻⬜⬛⬛⬜⭐⬛",
  "⬛⭐⬜⬛⬛⬜⬜⬜⬛⬛⬜⭐⬛",
  "⬛⬜⬜⬜⬜⬜⬛⬜⬜⬜⬜⬜⬛",
  "⬛⬜⬛⬜⬜⬛⬛⬛⬜⬜⬛⬜⬛",
  "⬛⬜⬛⬛⭐⬜⬛⬜⭐⬛⬛⬜⬛",
  "⬛⬜⭐⭐⭐⬜😶⬜⭐⭐⭐⬜⬛",
  "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
] 
    
     map = mapa
 
    if(!map || !Array.isArray(map) || map.length <= 0) throw Error("El mapa tiene un formato invalido")
    if(typeof time != "number" || parseInt(time) <= 0) throw Error("El tiempo debe ser un numero y mayor a 0, recuerda que el tiempo es en minutos")
    if(!options || typeof options != "object" || typeof options == "object" && (options instanceof Array)) options = {}
    
    this.map_time = parseInt(time) * 60000
    this.win_text = options.hasOwnProperty("win_text") && typeof options.win_text == "string" ? options.win_text : "GANASTE!"
    this.to_lose_text = options.hasOwnProperty("to_lose_text") && typeof options.to_lose_text == "string" ? options.to_lose_text : "PERDISTE :("
    this.time_out_text = options.hasOwnProperty("time_out_text") && typeof options.time_out_text == "string" ? options.time_out_text : "SE ACABO EL TIEMPO"
    this.coin_points = options.hasOwnProperty("coin_points") && typeof options.coin_points == "number" ? options.coin_points : 250
    this.coin_text = options.hasOwnProperty("coin_text") && typeof options.coin_text == "string" ? options.coin_text : "MONEDAS"
    this.time_text = options.hasOwnProperty("time_text") && typeof options.time_text == "string" ? options.time_text : "TIEMPO"

    this.verify_map_side(mapa)   
    this.x = undefined
    this.y = undefined
    this.time = undefined
    this.interval = undefined
    this.message = undefined
    this.coins = 0
    this.dir = CENTRO
    this.old = floor
    this.map = this.get_map(map)
    this.ghosts = []
    this.verify_map_items()
    this.load_items()
  }
  
  get_map(map) {

    let copy = new Array()
    for(var line of map) copy.push(line.split(""))
    
    copy = [["⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛"], ["⬛", "⬜", "⭐", "⭐", "⭐", "⬜", "👻", "⬜", "⭐", "⭐", "⭐", "⬜", "⬛"], ["⬛", "⬜", "⬛", "⬛", "⭐", "⬜", "⬛", "⬜", "⭐", "⬛", "⬛", "⬜", "⬛"], ["⬛", "⬜", "⬛", "⬜", "⬜", "⬛", "⬛", "⬛", "⬜", "⬜", "⬛", "⬜", "⬛"], ["⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬛"], ["⬛", "⭐", "⬜", "⬛", "⬛", "⬜", "👻", "⬜", "⬛", "⬛", "⬜", "⭐", "⬛"], ["⬛", "⭐", "⬜", "⬛", "⬛", "⬜", "⬜", "⬜", "⬛", "⬛", "⬜", "⭐", "⬛"], ["⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬛"], ["⬛", "⬜", "⬛", "⬜", "⬜", "⬛", "⬛", "⬛", "⬜", "⬜", "⬛", "⬜", "⬛"], ["⬛", "⬜", "⬛", "⬛", "⭐", "⬜", "⬛", "⬜", "⭐", "⬛", "⬛", "⬜", "⬛"], ["⬛", "⬜", "⭐", "⭐", "⭐", "⬜", "😶", "⬜", "⭐", "⭐", "⭐", "⬜", "⬛"], ["⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛"]]
    
    return copy;
  }

  verify_map_side(map) {
    for(var x = 0; x < map.length; x++) {
      if(typeof map[x] != "string") throw new Error("El mapa tiene un formato invalido")
      if(x == 0 || x == (map.length-1)) {
        if(map[x] != wall.repeat(map[x].length)) throw new Error("El mapa tiene un formato invalido")
      }
      else{
        if(map[x][0] != wall || map[x][map[x].length-1] != wall) throw new Error("El mapa tiene un formato invalido") 
//        if(map[x].split("").some(i => ![player, wall, coin, floor, ghost].includes(i))) throw new Error("El mapa tiene un formato invalido")
      }
    }
  }

  verify_map_items() {
    let player_count = 0
    let ghost_count = 0
    let coins_count = 0

    for(var line of this.map) {
      for(var item of line) {
        if(item == player) player_count += 1
        else if(item == coin) coins_count += 1
        else if(item == ghost) ghost_count += 1
      }
    }
//    if(player_count != 1) throw new Error("No se encontro o hay mas de un jugador, asegurate de solo colocar 1")
//    if(ghost_count <= 0) throw new Error("No se encontro ningun enemigo, asegurate de colocar al menos 1")
 //   if(coins_count <= 0) throw new Error("No se encontro ninguna moneda, asegurate de colocar al menos 1")
  }
  
  load_items() {

    for(var y = 0; y < this.map.length; y++) {
      for(var x = 0; x < this.map[y].length; x++) {
        if(this.map[y][x] == player) {
          this.x = x
          this.y = y
        }
        else if(this.map[y][x] == ghost) {
          this.ghosts.push({
            x: x,
            y: y,
            old: floor,
            found: false,
            dir: CENTRO
          })
        }
      }
    }
  }

  get_direction(old_pos, new_pos) {
    if(new_pos.y < old_pos.y) return ARRIBA
    if(new_pos.y > old_pos.y) return ABAJO
    if(new_pos.x > old_pos.x) return DERECHA
    if(new_pos.x < old_pos.x) return IZQUIERDA
    return CENTRO //tal vez ocurre algo
  }

  build_map(end = false) {
    if(!end) {
      return `\`\`\`ini
${this.map.map(f => f.join("")).join("\n")}
      
[${this.coin_text}] ${this.coins}
[${this.time_text}] ${this.time != undefined ? this.parse_time(Math.floor((Date.now()-this.time)/1000)) : "00:00:00"} \`\`\``      
    }
    return `\`\`\`ini
${end == "ghost" ? this.to_lose_text : end == "player" ? this.win_text : this.time_out_text}

[${this.coin_text}] ${this.coins}
[${this.time_text}] ${this.parse_time(Math.floor((Date.now()-this.time)/1000))}\`\`\``
  }

  parse_time(time) {
    let h = Math.floor(time / 3600)
    let m = Math.floor((time - (h * 3600)) / 60)
    let s = time - (h * 3600) - (m * 60)
    let f = h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0')
    return f
  }

  has_coins() {
    let line = this.map.some(line => line.includes(coin))
    if(!line) line = this.ghosts.some(g => g.old == coin)
    if(line) return true
    return false
  }

  random_direction(ght) {
    let random_pos = []
    if(ght.dir == CENTRO) {
      if(this.map[ght.y][(ght.x+1)] != wall) random_pos.push({x: ght.x+1, y: ght.y})
      if(this.map[ght.y][(ght.x-1)] != wall) random_pos.push({x: ght.x-1, y: ght.y})
      if(this.map[(ght.y+1)][ght.x] != wall) random_pos.push({x: ght.x, y: ght.y+1})
      if(this.map[(ght.y-1)][ght.x] != wall) random_pos.push({x: ght.x, y: ght.y-1})      
    }
    else if(ght.dir == ARRIBA) {
      if(this.map[ght.y][(ght.x-1)] != wall) random_pos.push({x: ght.x-1, y: ght.y})
      if(this.map[ght.y][(ght.x+1)] != wall) random_pos.push({x: ght.x+1, y: ght.y})
      if(this.map[(ght.y-1)][ght.x] != wall) random_pos.push({x: ght.x, y: ght.y-1})
      if(random_pos.length <= 0) {
        if(this.map[(ght.y-1)][ght.x] == wall) random_pos.push({x: ght.x, y: ght.y+1})
      }
    }
    else if(ght.dir == ABAJO) {
      if(this.map[ght.y][(ght.x-1)] != wall) random_pos.push({x: ght.x-1, y: ght.y})
      if(this.map[ght.y][(ght.x+1)] != wall) random_pos.push({x: ght.x+1, y: ght.y}) 
      if(this.map[(ght.y+1)][ght.x] != wall) random_pos.push({x: ght.x, y: ght.y+1})
      if(random_pos.length <= 0) {
        if(this.map[(ght.y+1)][ght.x] == wall) random_pos.push({x: ght.x, y: ght.y-1})
      }
    }
    else if(ght.dir == IZQUIERDA) {
      if(this.map[(ght.y-1)][ght.x] != wall) random_pos.push({x: ght.x, y: ght.y-1})
      if(this.map[(ght.y+1)][ght.x] != wall) random_pos.push({x: ght.x, y: ght.y+1})
      if(this.map[ght.y][(ght.x-1)] != wall) random_pos.push({x: ght.x-1, y: ght.y})
      if(random_pos.length <= 0) {
        if(this.map[ght.y][(ght.x-1)] == wall) random_pos.push({x: ght.x+1, y: ght.y})
      }
    }
    else if(ght.dir == DERECHA) {
      if(this.map[(ght.y-1)][ght.x] != wall) random_pos.push({x: ght.x, y: ght.y-1})
      if(this.map[(ght.y+1)][ght.x] != wall) random_pos.push({x: ght.x, y: ght.y+1})
      if(this.map[ght.y][(ght.x+1)] != wall) random_pos.push({x: ght.x+1, y: ght.y})
      if(random_pos.length <= 0) {
        if(this.map[ght.y][(ght.x+1)] == wall) random_pos.push({x: ght.x-1, y: ght.y})
      }
    }

    let pos_x = this.x - ght.x
    let pos_y = this.y - ght.y
    let dis = Math.sqrt((pos_x*pos_x) + (pos_y*pos_y))
    if(dis <= 4) {
      let f_dir = undefined
      for(var pos of random_pos) {
        let pos_xx = this.x - pos.x
        let pos_yy = this.y - pos.y
        let diss = Math.sqrt((pos_xx*pos_xx) + (pos_yy*pos_yy))
        if(f_dir == undefined) f_dir = {dis: diss, x: pos.x, y: pos.y}
        else {
          if(diss < f_dir.dis) f_dir = {dis: diss, x: pos.x, y: pos.y}
        }
      }
      if(f_dir) return {x: f_dir.x, y: f_dir.y}
    }

    if(random_pos.length <= 0) return false
    return random_pos[Math.floor(Math.random() * random_pos.length)]  

  }


  async start_game(message) {
    if(!message || !message.channel) throw new Error("start_game(message) recibe 1 parametro obligatorio.")
    this.message = message;
    let map_message = await this.message.channel.send(this.build_map()).catch(error => false);
    if(!map_message) return;

    await map_message.react("⬅");
    await map_message.react("⬆");
    await map_message.react("⬇");
    await map_message.react("➡");
    
    this.time = Date.now();

    let filter = (reaction, user) => ["⬅", "➡", "⬆", "⬇", "❌"].includes(reaction.emoji.name) && user.id == this.message.author.id;
    const collector = map_message.createReactionCollector(filter, {time: this.map_time});
    collector.on("collect", async (reaction) => {
      if(reaction.emoji.name == "➡") this.dir = DERECHA;
      if(reaction.emoji.name == "⬅") this.dir = IZQUIERDA;
      if(reaction.emoji.name == "⬆") this.dir = ARRIBA;
      if(reaction.emoji.name == "⬇") this.dir = ABAJO;
        reaction.users.remove(message.author.id);
    });

    collector.on("end", async (collect, reason) => {
      if(reason == "time") {
        clearInterval(this.interval);
        await map_message.edit(this.build_map("time")).catch(error => {});
      };
      this.emit('end', reason, this.coins, Date.now() - this.time);
    });

    this.interval = setInterval(async () => {
      for(var ght of this.ghosts) {
        let pos = this.random_direction(ght);
        if(pos) {
          this.map[ght.y][ght.x] = ght.old;
          if(pos.y == this.y && pos.x == this.x) {
            this.map[pos.y][pos.x] = ghost;
            clearInterval(this.interval);
            collector.stop("ghost");
            await map_message.edit(this.build_map("ghost")).catch(error => {});
            return;
          };

          if(this.map[pos.y][pos.x] == ghost) {
            let found = this.ghosts.find(g => pos.y == g.y && pos.x == g.x && g.old != ghost);
            if(!found) ght.old = floor;
            else ght.old = found.old;
          }else{
            ght.old = this.map[pos.y][pos.x];
          };
          ght.dir = this.get_direction({x: ght.x, y: ght.y}, {x: pos.x, y: pos.y});
          this.map[pos.y][pos.x] = ghost;
          ght.x = pos.x;
          ght.y = pos.y;
        };
      };


      if(this.dir == IZQUIERDA) {
        if((this.x-1) > 0 && this.map[this.y][(this.x-1)] != wall) {
          this.map[this.y][this.x] = this.old
          this.old = this.map[this.y][(this.x-1)]
          if(this.map[this.y][(this.x-1)] == coin) {
            this.old = floor;
            this.coins += this.coin_points;
          }else if(this.map[this.y][(this.x-1)] == ghost) {
            clearInterval(this.interval);
            collector.stop("ghost");
            await map_message.edit(this.build_map("ghost")).catch(error => {});
            return;
          };
          this.map[this.y][(this.x-1)] = player;
          this.x = this.x-1;
        };
      }else if(this.dir == DERECHA) {
        if((this.x+1) < (this.map[this.y].length-1) && this.map[this.y][(this.x+1)] != wall) {
          this.map[this.y][this.x] = this.old;
          this.old = this.map[this.y][(this.x+1)];
          if(this.map[this.y][(this.x+1)] == coin) {
            this.old = floor;
            this.coins += this.coin_points;
          }else if(this.map[this.y][(this.x+1)] == ghost) {
            clearInterval(this.interval);
            collector.stop("ghost");
            await map_message.edit(this.build_map("ghost")).catch(error => {});
            return;
          };
          this.map[this.y][(this.x+1)] = player;
          this.x = this.x+1;

        };
      }else if(this.dir == ABAJO) {
        if((this.y+1) < (this.map.length-1) && this.map[(this.y+1)][this.x] != wall) {
          this.map[this.y][this.x] = this.old;
          this.old = this.map[(this.y+1)][this.x];
          if(this.map[(this.y+1)][this.x] == coin) {
            this.old = floor;
            this.coins += this.coin_points;
          }else if(this.map[(this.y+1)][this.x] == ghost) {
            clearInterval(this.interval);
            collector.stop("ghost");
            await map_message.edit(this.build_map("ghost")).catch(error => {});
            return;
          };
          this.map[(this.y+1)][this.x] = player;
          this.y = this.y+1;

        };
      }else if(this.dir == ARRIBA) {
        if((this.y-1) > 0 && this.map[(this.y-1)][this.x] != wall) {
          this.map[this.y][this.x] = this.old;
          this.old = this.map[(this.y-1)][this.x];
          if(this.map[(this.y-1)][this.x] == coin) {
            this.old = floor;
            this.coins += this.coin_points; 
          }else if(this.map[(this.y-1)][this.x] == ghost) {
            clearInterval(this.interval);
            collector.stop("ghost");
            await map_message.edit(this.build_map("ghost")).catch(error => {});
            return;
          };
          this.map[(this.y-1)][this.x] = player;
          this.y = this.y-1;

        };
      };

      if(!this.has_coins()) {
        clearInterval(this.interval);
        collector.stop("player");
        await map_message.edit(this.build_map("player")).catch(error => {});
        return;
      };
      await map_message.edit(this.build_map()).catch(error => {
        clearInterval(this.interval);
        collector.stop("error");
      });
    }, 1700);
    
  };

};

Util.inherits(PacGame, EventEmmiter);


module.exports = {
  PacGame: PacGame
};