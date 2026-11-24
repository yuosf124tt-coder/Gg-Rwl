
const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const {
  joinVoiceChannel,
  VoiceConnectionStatus,
  entersState
} = require("@discordjs/voice");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

async function joinRoom() {
  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(CHANNEL_ID);

  if (!channel || !channel.isVoiceBased()) {
    throw new Error("Voice channel not found");
  }

  const connection = joinVoiceChannel({
    channelId: CHANNEL_ID,
    guildId: GUILD_ID,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: true,
    selfMute: false
  });

  await entersState(
    connection,
    VoiceConnectionStatus.Ready,
    30000
  );

  console.log("Gg/Rwl joined the voice channel!");
}

client.once("ready", async () => {
  console.log("Gg/Rwl is online!");

  try {
    await joinRoom();
  } catch (error) {
    console.error(error);
  }
});

client.login(TOKEN);
