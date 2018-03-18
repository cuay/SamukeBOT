const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const ytdl = require('ytdl-core');
const prefix = config.prefix;
const token = config.token;

client.on('ready', () => {
    console.log('Samuke is ready for action!');

    client.user.setStatus('Online');

    client.user.setGame('Hey!', 'https://www.twitch.tv/winterlect');
});

client.on('message', async message=> {

    if(message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();


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

        const role = member.addRole(member.guild.roles.find("name", "Coder"));

        if (!role) return;

        role.member.guild.roles.find("name", "Coder");
      });


client.login(token);



    //Below is my attempt at the kicking command. Still doesn't work.

    
