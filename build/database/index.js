"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("metadata");
const typeorm_1 = require("typeorm");
const const_1 = require("../config/const");
const account_type_entity_1 = require("../entities/account-type.entity");
const api_entity_1 = require("../entities/api.entity");
const game_history_entity_1 = require("../entities/game-history.entity");
const game_entity_1 = require("../entities/game.entity");
const method_entity_1 = require("../entities/method.entity");
const module_entity_1 = require("../entities/module.entity");
const profile_entity_1 = require("../entities/profile.entity");
const role_entity_1 = require("../entities/role.entity");
const user_entity_1 = require("../entities/user.entity");
const migrateDataBase = async function () {
    console.log('migrate database -> :');
    try {
        const mongo = {
            name: const_1.MANAGER.MONGO,
            type: 'mongodb',
            url: process.env.MONGO_NATIVE_DRIVE,
            port: 27017,
            useNewUrlParser: true,
            synchronize: true,
            logging: true,
            database: 'tetris_db',
            entities: [
            // Entity in here
            ],
            useUnifiedTopology: true,
            ssl: false,
            logger: 'simple-console',
        };
        const mysql = {
            type: 'mysql',
            host: 'localhost',
            name: const_1.MANAGER.SQL,
            port: 3306,
            username: 'root',
            password: '@Viettd2804',
            database: 'game_base_service',
            entities: [
                // Entity in here
                user_entity_1.default,
                profile_entity_1.default,
                role_entity_1.default,
                method_entity_1.default,
                module_entity_1.default,
                api_entity_1.default,
                account_type_entity_1.default,
                game_entity_1.default,
                game_history_entity_1.default,
            ],
            synchronize: true,
            logging: false,
        };
        const connection = await typeorm_1.createConnections([mysql]);
        connection.map((element) => {
            const date = new Date();
            console.log(date, ' connected to db: ', element.namingStrategy);
        });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        console.log('\x1b[33m------------------ Database Connecting Finished -------------------');
        console.log('\x1b[0m link swagger: ', `\x1b[32m http://localhost:${process.env.PORT}/api-docs`);
        console.log('\x1b[0m link views: ', `\x1b[32m http://localhost:${process.env.PORT}/`);
    }
};
exports.default = migrateDataBase;
