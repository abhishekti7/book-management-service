
// to load all the environment variables
require('dotenv').config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}`});

// apollo server methods
import express from 'express';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { startStandaloneServer } from '@apollo/server/standalone';

import { connectDb } from './db';

// custom logger using winston
import { typeDefs, resolvers } from './graphql';


import logger from './utils';

const startServer = async () => {
    // creating a server requires two parameters:
    // your type definitions and your resolvers
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const port = process.env.PORT || 4000;

    connectDb()
        .then(async () => {
            // if database is connected successfully, then start the server
            const { url } = await startStandaloneServer(server, {
                listen: { port },
            });

            logger.info(`Server started and listening on: ${url}`);
        })
        .catch(error => {
            logger.error('Error connecting to mongodb');
            logger.error(error);
            process.exit(1);
        })

    // graceful termination of processes
    process.on("SIGINT", () => {
        logger.error('SIGINT received, terminating...');

        if (server) {
            server.stop();
        }
        
        process.exit(1);
    });

    process.on('SIGTERM', () => {
        logger.error("SIGTERM received, terminating...");

        if (server) {
            server.stop();
        }
        
        process.exit(1);
    })
}

startServer()
    .catch(error => {
        logger.error("Error starting the server");
        logger.error(error);
        process.exit(1);
    });