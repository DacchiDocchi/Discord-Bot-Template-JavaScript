const discord = require("discord.js");
module.exports = {
  name: 'ping',
  aliases: [],
  category: 'Help',
  utilisation: '{prefix}ping',
  async execute(client, message, args) {

    let ping = Math.floor(client.ws.ping);
    
    const embed = new discord.MessageEmbed()
        .setAuthor({ name: "Pong!"})
        .setDescription(`Message ping : \`` + ping + " ms.\`")
        .setColor("RANDOM")
    message.channel.send({ embeds: [embed] })
  }
};
