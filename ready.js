const Discord = require("discord.js");
const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const client = require('../index.js');
const db = require('quick.db');
const users = new db.table('users');
const guilds = new db.table('guilds');