const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
const { exec } = require('child_process');

//Toutes les actions à faire quand le bot se connecte
client.on("ready", function () {
    console.log("BinouBot est Connecté");
})

// Répondre à un message
client.on('message', (message) => {
    const messageWords = message.content.split(' ').slice(0, 2);
    const rollFlavor = message.content.split(' ').slice(2).join(' ');
    switch (messageWords[0]) {
        case "DJ" : { // Lorsque "Salut" est envoyé
            message.channel.send("Rexma !")
        }
        break;
        case '!roll' : {
            if (messageWords.length === 1) {
                // !roll
                return message.reply(
                    (Math.floor(Math.random() * 6) + 1) + ' '
                );
            }
            let sides = messageWords[1]; // !roll 20
            let rolls = 1;
            if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
                // !roll 4d20
                rolls = messageWords[1].split('d')[0] / 1;
                sides = messageWords[1].split('d')[1];
            } else if (messageWords[1][0] === 'd') {
                // !roll d20
                sides = sides.slice(1);
            }
            sides = sides / 1; // convert to number
            if (isNaN(sides) || isNaN(rolls)) {
                return;
            }
            if (rolls > 1) {
                const rollResults = [];
                for (let i = 0; i < rolls; i++) {
                    rollResults.push(Math.floor(Math.random()*sides)+1);
                }
                const sum = rollResults.reduce((a,b) => a + b);
                return message.reply(`[${rollResults.toString()}] => [${sum}]`);
            } else {
                return message.reply(
                    (Math.floor(Math.random() * sides) + 1) + ' '
                );
            }
        }
        break;
        case '!choose' : {
            if (messageWords.length === 1) {
                return message.reply('Arguments are missing !\n Example : !choose Hippo|Saké|Binouse');
            }
            else {
                console.log(messageWords);
                let messageWordsChoose = messageWords.slice(1).join('|').split('|');
                console.log(messageWordsChoose);
                return message.reply(
                    messageWordsChoose[Math.floor(Math.random() * (messageWordsChoose.length-1 + 1))]
                );
            }
        }
        case '!help' : {
            if (messageWords.length === 1) {
                return message.reply(
                    '\n ' +
                    '!help ' +
                    '!roll <numberOfDice>d<diceSize>\n    ex: !roll 2d20\n ' +
                    '!choose <something>|<something>\n    ex: !choose Hippo|Saké|Binouse' +
                    '!node pour utiliser l\'interpréteur  ex: !node a=2+2' +
                    '!shell pour lâcher ses plus belles commandes shell  ex: !shell ls ~/'
                );
            }
        }
        break;
        case "!node" : {
            if (messageWords.length === 1) {
                return message.reply('usage: !node [code]');
            }
            else {
                console.log(eval(message.content.slice(5)));
                return message.reply('\n'+eval(message.content.slice(5)));
            }
        }
        case "!shell" : {
            if (messageWords.length === 1) {
                return message.reply('usage: !shell [command]');
            }
            else {
                let shellCommand = message.content.slice(6);
                return exec(shellCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return message.reply(`exec error: ${error}`);
                    }
                    console.log(`stdout: ${stdout}`);
                    console.error(`stderr: ${stderr}`);
                    return message.reply(`stdout: ${stdout}\n stderr: ${stderr}`);
                });
            }
        }
        break;
        default: {
            return message.reply('C\'est pas faut !');
        }
        break;
    }

});

client.login("ODE0OTU5Mjk5ODQyNTM5NTcw.YDlb_g.b3szD3GeTNjPkqJxpOQY3pzpPt0");
