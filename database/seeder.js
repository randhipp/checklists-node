const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
    database: process.env.DB_URL,
    dropDatabase: true,
  };

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve("database/data"));

async function start() {
    try {
        console.log('Seeding data...');
        await seeder.import(collections);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    start: start,
};