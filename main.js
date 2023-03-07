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
console.log("")
console.log("FreeMoneyHub Pit Autogrinder...............")
console.log("")
console.log("GitHub : FreeMoneyHyb")
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

rl.on('line', (input) => {
  if (input === 'start') {
    messageLogged = false;
  } else if (input === 'stop') {
    messageLogged = false;
  } else if (input === 'play') {
    messageLogged = false;
  } else if (input === 'run') {
  }
});
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
                    function wrapAngle(angle) {
                      return (angle + Math.PI) % (2 * Math.PI) - Math.PI;
                    }
                    const offsetz = Math.random() * (1 - 0.5) + 0.5;
                    const nearestPlayer = bot.nearestEntity(e => e.type === 'player');
                    const randomDelaytzr = () => Math.floor(Math.random() * (75 - 45 + 1) + 45);
                    if (nearestPlayer) {
                      const targetPos = bot.nearestEntity(e => e.type === 'player').position.offset(0, offsetz, 0);
                      const deltaX = targetPos.x - bot.entity.position.x;
                      const deltaY = targetPos.y - bot.entity.position.y;
                      const deltaZ = targetPos.z - bot.entity.position.z;
                      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
                      const targetYaw = Math.atan2(-deltaX, -deltaZ);
                      let yawDiff = wrapAngle(targetYaw - bot.entity.yaw);
                      const maxYawDiff = Math.PI / 4;
                      yawDiff = Math.max(Math.min(yawDiff, maxYawDiff), -maxYawDiff);
                      const numHeadMovements = Math.ceil(Math.abs(yawDiff) / (Math.PI / 8));
                      const yawStep = yawDiff / numHeadMovements;
                      const targetPitch = Math.asin(deltaY / distance);
                      let pitchDiff = targetPitch - bot.entity.pitch;
                      const maxPitchDiff = Math.PI / 144;
                      pitchDiff = Math.max(Math.min(pitchDiff, maxPitchDiff), -maxPitchDiff);
                      const numPitchMovements = Math.ceil(Math.abs(pitchDiff) / (Math.PI / 8));
                      const pitchStep = pitchDiff / numPitchMovements;
                      const maxPitch = 0;
                      const maxYaw = 120; 
                      let clampedPitch = bot.entity.pitch;
                      let clampedYaw = bot.entity.yaw;
                      for (let i = 0; i < numPitchMovements; i++) {
                        clampedPitch = Math.max(Math.min(clampedPitch + pitchStep, maxPitch), -maxPitch);
                        for (let j = 0; j < numHeadMovements; j++) {
                          clampedYaw = Math.max(Math.min(clampedYaw + yawStep, maxYaw), -maxYaw);
                          bot.look(clampedYaw, clampedPitch, true);
                          setTimeout(() => {
                            bot.look(clampedYaw, clampedPitch, true);
                          }, randomDelaytzr());
                        }
                      }
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
                  const radius = Math.floor(Math.random() * (4.5 - 4 + 1) + 4); 
                  const player = bot.nearestEntity(entity => entity.type === 'player' && bot.entity.position.distanceTo(entity.position) <= radius);
                  if (player) {
                      bot.attack(player);
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
      console.log(`${bot.username}: Switched Lobbys (Size ${playerCount})`);
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
          console.log(`${bot.username}: LEVEL UP! ${newLevel}`);
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

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes('assist!') && message.includes('%')) {
        console.log(`${bot.username}: ${message}`);
        }
    });

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes('death! by')) {
        const regex = /DEATH! by \[\d+\] (\S+) VIEW RECAP/;
        const match = message.match(regex);
        if (match) {
          const playerName = match[1];
          console.log(`${bot.username} Died To ${playerName}`);
        } else {
          console.log(`ERROR: ${message}`);
        }
      }
    });

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes('kill! on')) {
        console.log(`${bot.username}: ${message}`);
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

