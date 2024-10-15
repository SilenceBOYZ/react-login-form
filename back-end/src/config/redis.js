const RedisStore = require("connect-redis").default; // default lo  calhost
const {createClient} = require('redis');
const redisClient = createClient();

const connect = () => {
  redisClient.connect().then(
    console.log("Connect to redis success")
  ).catch(console.error);
};

const store = new RedisStore({
  client: redisClient,
});

module.exports = {
  store,
  connect
}