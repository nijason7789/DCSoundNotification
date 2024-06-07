export default {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! ${client.user.tag} is Logged in.`);
    },
};