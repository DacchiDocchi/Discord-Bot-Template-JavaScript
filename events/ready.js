module.exports = async (client) => {
  console.clear()
  console.log(`Connected in ${client.user.tag}.`, `In ${client.guilds.cache.size} servers, to ${client.users.cache.size} users online !`)
};
