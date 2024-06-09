import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
const { channelID } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        // 檢查用戶是否加入了一個語音頻道
        if (!oldState.channelId && newState.channelId) {
            const voiceChannel = newState.channel;

            // 檢查用戶是否進入了指定的語音頻道
            if (voiceChannel.id === channelID) {
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });

                const player = createAudioPlayer();
                const resource = createAudioResource(path.join(__dirname, '../../../audio', 'welcome.mp3'));

                player.play(resource);
                connection.subscribe(player);
            }
        }
    },
};