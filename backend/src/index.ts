import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {schema} from './schema';

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "your_username",
    password: "", // Ensure this is an empty string if no password is used
    database: "todo_db",
    entities: [
        __dirname + "/entity/**/*.ts"
    ],
    synchronize: true,
}).then(connection => {
    // Start your application here
}).catch(error => console.log(error));

