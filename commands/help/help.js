const discord = require("discord.js");
module.exports = {
    name: 'help', 
    aliases: ['h'],
    category: 'Help',
    utilisation: '{prefix}help <command>',
    async execute(client, message, args) {

        // Find commands from categories 
        const help = message.client.commands.filter(x => x.category == 'Help').map((x) => '`' + x.name + '`').join(' ');

        if (!args[0]) {
        const embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({ name: `${client.user.username} commands`})
            .addField("Help", help, true)
            .setFooter({ text: `To view the usage information of a command use ${client.discord.prefix}help [command] !`})
            return message.channel.send({ embeds: [embed] })

        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
            
            const error = new discord.MessageEmbed()
                .setColor("RED")
                .setAuthor({ name: "You must specify a valid command to view the additional information, try again!"})
            if (!command) return message.channel.send({ embeds: [error] })

            const embed = new discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Help`})
                .setTitle(`${command.name} command information !`)
                .setColor("RANDOM")
                .addField("Utilisation", `\`${command.utilisation.replace('{prefix}', client.discord.prefix)}\``, true)
                .addField("Aliases", `\`${command.aliases.length < 1 ? 'None' : command.aliases.join(', ')}\``, true)
            message.channel.send({ embeds: [embed] });
        }
    }
};