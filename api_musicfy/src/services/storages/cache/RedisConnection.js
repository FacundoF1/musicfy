// @Vendors
const { createClient } = require('redis');

// @Tools

// redis[s]://[[username][:password]@][host][:port][/db-number]
const connections = {};
const subscribers = {};

const logOn = (storageName, connection, env) => {
  connection.on('connect', () => {
    console.info(
      `${env ? `:: ${env} ::` : ''}Connected to Redis ${storageName}`
    );
  });

  connection.on('ready', () => {
    console.info(`${env ? `:: ${env} ::` : ''}Redis is ready ${storageName}`);
  });

  connection.on('end', () => {
    console.info(`${env ? `:: ${env} ::` : ''}Redis ended ${storageName}`);
  });

  connection.on('error', (error) => {
    console.error(env ? `:: ${env} ::` : '', error);
  });
};

const createConnection = async (storageName, path) => {
  if (connections[storageName]) {
    throw new Error(`Storage already connected name=${storageName}`);
  }

  connections[storageName] = createClient({
    socket: {
      host: '127.0.0.1',
      port: 6379
    }
  });

  // logOn(storageName, connections[storageName]);
};

const redisClient = async (storageName) => {
  const connection = connections[storageName];

  if (!connection) {
    throw new Error(`Storage ${storageName} not connected`);
  }

  const getSubscriber = async () => {
    if (!subscribers[storageName]) {
      subscribers[storageName] = connection.duplicate();
      await subscribers[storageName].connect();
      // logOn(storageName, subscribers[storageName], 'subscriber');
    }

    return subscribers[storageName];
  };

  return {
    connection,

    connect: async () => await connection.connect(),
    disconnect: async () => await connection.disconnect(),

    get: async (key) => {
      const value = await connection.get(key);
      return JSON.parse(value);
    },

    set: async (key, data, { expireAt } = {}) => {
      const dataString = JSON.stringify(data);
      if (expireAt) {
        connection.set(key, dataString, 'EX', expireAt);
      } else {
        connection.set(key, dataString);
      }
    },

    subscribe: async (key, fn) => {
      const subscriber = await getSubscriber();
      await subscriber.subscribe(key, async (input) => {
        try {
          const data = JSON.parse(input);
          await fn(data);
        } catch (error) {
          console.error(error);
        }
      });
    },

    unsubscribe: async (fn) => {
      const subscriber = await getSubscriber();
      await subscriber.unsubscribe(fn);
    },

    publish: async (key, data) => {
      await connection.publish(key, JSON.stringify(data));
    }
  };
};

module.exports = {
  createConnection,
  redisClient
};
