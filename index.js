const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const ytdl = require('ytdl-core');
const prefix = config.prefix;
const token = config.token;

client.on('ready', () => {
    console.log('Samuke is ready for action!');
});

client.on('message', async message=> {

    if(message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();


    //A little command for checking your latency.
    if (message.content === '=ping') {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    //Samuke DM's you with some formatting tips.
    if (message.content === `${prefix}formatting`) {
        message.author.send(`This is a simple Discord formatting guide. \n\n> Place 2 asterisks before and after a word/sentence/paragraph to make the selected text bold: **BOLD** \n\n> Put two underscores before and after a word/sentence/paragraph to make the selected text underlined: __UNDERLINE__ \n\n> Place BOTH 2 asterisks and 2 underscores to make the text both underlined AND bold: __**BOTH BOLDED AND UNDERLINED!**__`);
    }

    //Samuke reacts to this with the thonk emoji, only enabled on servers with the thonk emoji
    if (message.content === `${prefix}thonk`) {
        const thonk = message.guild.emojis.find('name', 'thonk');
        message.react(thonk);
    }

    //Check server info
    if (message.content === `${prefix}server`) {
        message.channel.send(`This server's name is: ${message.guild.name}`);
    }

    //Check user info
    if (message.content === `${prefix}userinfo`) {
        message.channel.send(`This is your username: ${message.author.username}\nYour Discord ID is: ${message.author.id}`);
    }
    
    //Samuke DM's you with some key commands.
    if(message.content === `${prefix}help`){
        message.author.send(`Hey! I'm Samuke, a friendly bot used in fun servers!\nBasic commands include:\n\n> =userinfo\n\n> =server\n\n> =ping\n\n and more! Thanks for choosing Samuke!\n\n - Developed by cuay 寒気#3395`);
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

    //A welcome message.
    client.on('guildMemberAdd', member => {
        // Send the message to a designated channel on a server:
        const channel = member.guild.channels.find('name', 'user-log');
        // Do nothing if the channel wasn't found on this server
        if (!channel) return;
        // Send the message, mentioning the member
        channel.send(`Welcome to the server, ${member}! Please contact staff if you require assistance.`);
      });


client.login(token);
