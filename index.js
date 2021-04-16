const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos
client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});
//Mudança de Status.
client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}help para obter ajuda`,
      `${client.guilds.cache.size} servidores!`,
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 60); //WATCHING, LISTENING, PLAYNG, STREAMING  
  client.user
      .setStatus("dnd")
      .catch(console.error);
console.log("Estou Online!")
});
//Boas-Vindas.
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("761226826071932940");
  let channel = await client.channels.cache.get("766459531659706401");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "😋");
  if (guild != member.guild) {
    return console.log("Opa, servidor errado amigo, de meia volta.");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Boas-vindas ${emoji}`)
      .setImage("https://cache.desktopnexus.com/thumbseg/2363/2363471-bigthumbnail.jpg")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter('ID do usuário: ' + member.user.id)
      .setTimestamp();

    channel.send(embed);
  }
});
//Boas-Vindas 2.
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("778805108058095626");// ID do servidor.
  let channel = await client.channels.cache.get("778807689638707220");// ID do canal onde vai aparecer as mensagens.
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "😋");
  if (guild != member.guild) {
    return console.log("Opa, servidor errado amigo, de meia volta.");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Boas-vindas ${emoji}`)
      .setImage("https://cache.desktopnexus.com/thumbseg/2363/2363471-bigthumbnail.jpg")// Imagem de fundo(Background).
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)// Mensagem de boas vindas
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))//Thumbnail da foto do usuário.
      .setFooter('ID do usuário: ' + member.user.id)
      .setTimestamp();

    channel.send(embed);



    require("dotenv").config();//Loading .env
import { readdir } from "fs";
import { Collection, Client } from "discord.js";

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX
}

//Loading Events
readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

//Logging in to discord
client.login(process.env.TOKEN)

  }
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token