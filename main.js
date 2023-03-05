process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const mineflayer = require('mineflayer')
const Vec3 = require('vec3')
const ProxyAgent = require('proxy-agent')
const socks = require('socks').SocksClient
const readline = require('readline');
const { Webhook } = require('discord-webhook-node');
const hook1 = new Webhook("hook1_here");
const hook2 = new Webhook("hook2_here");
const hook3 = new Webhook("hook3_here");
const hook4 = new Webhook("hook4_here");
var ticks = 0;
var boty;
const fovDegrees = 165;
var damage = 0;
var strafes = 0;
var blobmode = false;
let enabled = false;
var silents = true;
var spawnY = 85;


console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("")
console.log("  _    _                 ____        _   ")
console.log(" | |  | |               |  _ \\      | |  ")
console.log(" | |__| |_   _ _   _ ___| |_) | ___ | |_ ")
console.log(" |  __  | | | | | | / __|  _ < / _ \\| __|")
console.log(" | |  | | |_| | |_| \\__ \\ |_) | (_) | |_ ")
console.log(" |_|  |_|\\__,_|\\__, |___/____/ \\___/ \\__|")
console.log("                __/ |                    ")
console.log("")
console.log("")
console.log("Huys Pit Bot Discord.gg/Huys")
console.log("")
console.log("")
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

const accounts = [
  {username: 'mail', password: 'pass', proxy: 'socks5://user:pass@p.webshare.io:80'},
  {username: 'mail', password: 'pass', proxy: 'socks5://user:pass@p.webshare.io:80'},
  {username: 'mail', password: 'pass', proxy: 'socks5://user:pass@p.webshare.io:80'},
];

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//ilylols code for setting up the rl thingy
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let messageLogged = false;

const bots = [];
    for (const account of accounts) {
      setTimeout(() => {
        setTimeout(() => {}, 5000);
        const bot = mineflayer.createBot({
          host: 'hypixel.net',
          port: 25565,
          version: "1.8.9",
          username: account.username,
          password: account.password,
          auth: 'microsoft',
          agent: new ProxyAgent(account.proxy),
      }, 2000);
    bots.push(bot);
   
    bot.on('login', () => {
      console.log(bot.username + ' Connected');
      sleep(3000)
    });

    rl.on('line', (input) => {
      if (input === 'start') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("[Hub Grinder] Silent Script started!");
        }
        bot.chat("/play pit")
        silents = true
        enabled = true
      }
    });
    rl.on('line', (input) => {
      if (input === 'stop') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("[Hub Grinder] Scripts stopped!");
        }
        enabled = false
        silents = false
        bot.chat(`/oof`)
      }
    });

    rl.on('line', input => {
      const [command, ...args] = input.split(' ');
      if (command === 'run') {
        if (!messageLogged) {
          messageLogged = true;
          console.log("[Hub Grinder] Attempting to run " + args.join(' '));
        }
        bot.chat(args.join(' '));
      }
    });

   bot.on('physicTick', () => {
      if (enabled) {
          const ppx = Math.floor(Math.random() * 9) - 4;
          const ppz = Math.floor(Math.random() * 9) - 4;
          const ppzz = Math.floor(Math.random() * 9) - 4;
          if (!silents) {
            if (bot.getControlState('left') == true) bot.setControlState('left', false);
            if (bot.getControlState('right') == true) bot.setControlState('right', false);
            if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
          }
          if (enabled) {
            if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
            if (bot.getControlState('sprint') == false) bot.setControlState('sprint', true);
            if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
            boty = bot.entity.position.y;
            if (blobmode) {
              if (bot.entity.position.y > spawnY) {
                if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
                bot.lookAt(new Vec3(0, boty, 0));
              } else {
                if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
                bot.lookAt(new Vec3(0, boty, 0));
              }
            } else {
              if (silents) {
                strafes++;
                if (boty < spawnY) {
                  const offsetz = Math.random() * (1 - 0.5) + 0.5;
                  const nearestPlayer = bot.nearestEntity(e => e.type === 'player');
                  if (nearestPlayer) {
                    bot.lookAt(bot.nearestEntity(e => e.type === 'player').position.offset(0, offsetz, 0));
                  }
                  if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
                  if (strafes < 10) {
                    if (bot.getControlState('left') == false) bot.setControlState('left', true);
                    if (bot.getControlState('right') == true) bot.setControlState('right', false);
                  } else {
                    if (bot.getControlState('left') == true) bot.setControlState('left', false);
                    if (bot.getControlState('right') == false) bot.setControlState('right', true);
                    if (strafes > 20) {
                      strafes = 0;
                    }
                  }
                  const radius = Math.floor(Math.random() * (6 - 3.5 + 1) + 3.5); 
                  const player = bot.nearestEntity(entity => entity.type === 'player' && bot.entity.position.distanceTo(entity.position) <= radius);

                  if (player) {
                    const angleToPlayer = Math.atan2(player.position.z - bot.entity.position.z, player.position.x - bot.entity.position.x);
                    const angleDiff = (angleToPlayer - bot.entity.yaw) % (2 * Math.PI);

                    if (Math.abs(angleDiff) < (fovDegrees / 2) * (Math.PI / 180)) {
                      bot.attack(player);
                    }
                  }
                } else {
                  bot.lookAt(new Vec3(ppx, boty, ppz));
                  if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
                }
              } else {
                if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
                bot.lookAt(new Vec3(ppx, boty, ppzz));
              }
            }
          } else {
            if (bot.getControlState('left') == true) bot.setControlState('left', false);
            if (bot.getControlState('right') == true) bot.setControlState('right', false);
            if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
            if (bot.getControlState('forward') == true) bot.setControlState('forward', false);
            if (bot.getControlState('sprint') == true) bot.setControlState('sprint', false);
          }
        }
      });

    const randomDelaytr = () => Math.floor(Math.random() * (150000 - 50000 + 1) + 50000);
    setInterval(() => {
      enabled = false
      silents = false
      bot.chat('/play pit');
      let playerCount = Object.keys(bot.players).filter(name => !bot.players[name].isBot).length;
      hook1.send(`${bot.username}: Found New Lobby (Size ${playerCount})`)
      sleep(1500)
      enabled = true
      silents = true
    }, randomDelaytr());

    bot.on('messagestr', async (message) => {
      if (message.includes(`PIT LEVEL UP!`)) {
        const levelUpMatch = message.match(/\[(\d+)\] ➟ \[(\d+)\]/);
        if (levelUpMatch) {
          const previousLevel = parseInt(levelUpMatch[1]);
          const newLevel = parseInt(levelUpMatch[2]);
          hook2.send(`${bot.username}: has leveled up from level ${previousLevel} to level ${newLevel}`);
        }
      }
    });

    
    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes(`a player has been removed from your game`)) {
        bot.once('playerLeft', (player) => {
          hook3.send(`${bot.username}: has recorded a ban in the pit. The banned player is **${player.username}** ||https://pitpanda.rocks/players/${player.username}||`);
        });
      }
    });

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes('bounty claimed')) {
        hook4.send(message); 
      }
    });

    bot.on('kicked', (reason) => {
    console.log(account.username + ' has been kicked. Reason: ' + reason);
});
    bot.on('error', (error) => {
    console.log("error with: " + account.username);
});
  }, 3000);
}
