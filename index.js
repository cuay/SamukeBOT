const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const ytdl = require('ytdl-core');
const prefix = config.prefix;
const token = config.token;
const math = require('mathjs');
const sql = require("sqlite");
sql.open("./score.sqlite");

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

var ball = [
    "Yes!",
    "Absolutely!",
    "Definitely",
    "Maybe...",
    "Perhaps...",
    "I doubt it.",
    "Absolutely not!",
    "Nope!",
    "No!",
];

var q = [
    "?"
];

var rps = [
    "rock",
    "paper",
    "scissors",
    
];

client.on('ready', () => {
    console.log('Samuke is ready for action!');

    client.user.setStatus('Online');

    client.user.setGame('Hey!', 'https://www.twitch.tv/winterlect');
});

client.on('message', async message=> {

    if(message.author.bot) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(message.content.startsWith(`${prefix}marry`)){
        let proposal = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!proposal) {message.channel.send("Cannot find user!"); return;}

        message.channel.send(`**<@${message.author.id}> has proposed to ${proposal}! If they accept, type yes. If not, type no.**`);
        
        const response = m => m.author.id==proposal.id;
        message.channel.awaitMessages(response, { max: 1, time: 10000, errors: ['time'] }) .then(collected => {
            if(collected.first().content.toLowerCase() == "yes"){ return message.channel.send(`${proposal} accepted the proposal!`);} else{
            message.channel.send(`Oh noes! ${proposal} didn't accept the proposal!`);
            }
    }).catch(() => {
        message.channel.send(`${proposal} didn't reply in time!`);
    });


        
        
/*
       message.channel.awaitMessages(m => m.author==proposal, { max: 1, time: 10000, errors: ['time'] }) .then(collected => {
        if(collected.first().content.toLowerCase=="yes") return message.channel.send(proposal.nickname+" accepted the proposal!");
        message.channel.send("Oh noes!" + proposal.nickname + "didn't accept the proposal!");
    }).catch(() => {
        message.channel.send(`${proposal} didn't reply in time!`);
    });
    */
    
    }
    



   if(message.content===`${prefix}start`){
    res = randomIntInc(1,3);
    //scissors 1
    //paper 2
    //rock 3
    if(res===1){
      result="scissors";
    }else if(res===2){
      result="paper";
    }else if(res===3){
      result="rock";
    }
    message.channel.sendMessage(`${prefix}rock, ${prefix}paper or ${prefix}scissors?`);
  }
    if(message.content===`${prefix}rock`){
      if(res===2){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I won!");
      }else if(res===1){
        //lose
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Player won!");
      }else if(res===3){
        //draw
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Draw");
      }else{
        message.channel.sendMessage("You have to /start the game")
      }
    }else if(message.content===`${prefix}paper`){
      if(res===1){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I won!");
      }else if(res===3){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Player won!");
      }else if(res===2){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Draw");
      }
    }else if(message.content===`${prefix}scissors`){
      if(res===3){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I won!");
      }else if(res===2){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Player won!");
      }else if(res===1){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Draw");
      }
}

//TESTTTTT

    if(message.content.startsWith(`ur mum gay`)){
        message.channel.send(`no u`);
    }

    if(message.content.startsWith(`${prefix}online`)){
        const online = message.guild.memberCount;

        message.channel.send({embed: {
            title: "Online Members!",
            description:  `There are ${online} members online.`,
            color: 0x63b4d1

        }})
        
    }

    if(message.content.startsWith(`${prefix}flip`)){
        var n = math.randomInt(1, 3);

        if(n == 1){
            message.channel.send(`I flipped a **heads**!`);
        } else{
            message.channel.send(`I flipped a **tails**!`);
        }
    }

    if(message.content.startsWith(`${prefix}roll`)){
        var n1 = args[0];
        var n2 = args[1];

        message.channel.send(`Rolling...`)

        const final = math.randomInt(n1, n2);

        message.channel.send(final);
    }

    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        } else {
          sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
        }
      }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        });
      });

      if (!message.content.startsWith(prefix)) return;

      if (message.content.startsWith(prefix + "level")) {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
          if (!row) return message.reply("Your current level is 0");
          message.reply(`Your current level is ${row.level}`);
        });
      } else
    
      if (message.content.startsWith(prefix + "xp")) {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
          if (!row) return message.reply("sadly you do not have any points yet!");
          message.reply(`you currently have ${row.points} points. Keep chatting!`);
        });
      }


    //A little command for checking your latency.
    if (message.content === '=ping') {
        const m = await message.channel.send("Pinging...");

        message.channel.send({embed: {
            title: "Pong!",
            description:  `${m.createdTimestamp - message.createdTimestamp}ms.`,
            color: 0x63b4d1

        }})

       
    }

    //Samuke DM's you with some formatting tips.
    if (message.content === `${prefix}formatting`) {
        message.author.send(`This is a simple Discord formatting guide. \n\n> Place 2 asterisks before and after a word/sentence/paragraph to make the selected text bold: **BOLD** \n\n> Put two underscores before and after a word/sentence/paragraph to make the selected text underlined: __UNDERLINE__ \n\n> Place BOTH 2 asterisks and 2 underscores to make the text both underlined AND bold: __**BOTH BOLDED AND UNDERLINED!**__`);
    }

    //Check server info
    if (message.content === `${prefix}server`) {
        message.channel.send(`This server's name is: ${message.guild.name}`);
    }

    //Check user info
    if (message.content === `${prefix}userinfo`) {
        message.channel.send(`This is your username: ${message.author.username}\nYour Discord ID is: ${message.author.id}`);
    }

    if(message.content.startsWith(`${prefix}8ball`)){
        let question = args.join(" ").slice(22);
        if(message.content.includes(q[1])){
            message.channel.send(`Please state a question! **(Remember to put a "?" at the end!)**`);
            return;
        }else{
        if(question != null) {
            message.channel.send(ball[math.randomInt(1, 9)]);
        } else {  
            message.channel.send(`Please provide a valid question!`);
        }
    }
    }

    
    
    //Samuke DM's you with some key commands.
    if(message.content === `${prefix}help`){
        message.author.send(`**👋 | Hey there, <@${message.author.id}>! I'm Samuke, a friendly bot used in fun servers!\n\n📰 | Basic commands include:\n\n✅ | =userinfo\n\n✅ | =server\n\n✅ | =ping\n\n and more! \n\n __Please edit this message if you are an administrator.__ \n\n 👍 | Thanks for choosing Samuke!\n\n - 🖥 | Developed by cuay 寒気#3395**`);
    }

    if(message.content === `${prefix}avatar`){
        message.reply(`here's your avatar:` + message.author.avatarURL);
    }

    if(message.content === `${prefix}credits`){
        message.channel.send(`This incredible bot was made possible by:\n\nSignaturedX - Lead director and support\n\nSkaiz - Coding manager\n\ncuay - Graphic design and coding.`);
    }

    if(message.content.toLowerCase() === `ur mum gay`){
        message.channel.send(`no u`);
    }

    if (message.content.startsWith(`${prefix}kick`)){
        //=kick @cuay Offensive Language

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) message.channel.send("Can't find that user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, I don't have enough permission!");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor("003459")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked in", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);

        let kickChannel = message.guild.channels.find(`name`, "kicked-test");
        if(!kickChannel) return message.channel.send("Can't find the kicked players channel!");

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

        return;
    
    }

    if(message.content.startsWith(`${prefix}purge`)) {
        // This command removes all messages from all users in the channel, up to 100.
        
        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);
        
        // Ooooh nice, combined conditions. <3
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
        
        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(deleteCount + 1)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
    


    //Individual commands, like "hello" and forcing Samuke to say something.
    if (!message.content.startsWith(prefix)) return;
    if (cmd === 'hello') {
    message.channel.send('Hi there!');
    }
    if (!message.content.startsWith(prefix)) return;
    if (cmd === 'say') {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
      }
    });
    
/*
    //A welcome message.
    client.on('guildMemberAdd', member => {
        // Send the message to a designated channel on a server:
        const channel = member.guild.channels.find('name', 'user-log');
        // Do nothing if the channel wasn't found on this server
        if (!channel) return;
        // Send the message, mentioning the member
        channel.send(`Welcome to the server, ${member}! Please contact staff if you require assistance.`);

        const role = member.addRole(member.guild.roles.find("name", "Coder"));

        if (!role) return;

        role.member.guild.roles.find("name", "Coder");
      });

      */


client.login(token);



    //Below is my attempt at the ki cking command. Still doesn't work.

    
