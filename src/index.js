// to load all the environment variables
require('dotenv').config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}`});

// apollo server methods
import express from 'express';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { authMiddleware } from './middlewares';
import { connectDb } from './db';

// get resolvers and typedefs for the graphql server
import { typeDefs, resolvers } from './graphql';
import router from './routes';

import { logger } from './utils';
import { successHandler, errorHandler } from './utils';

const startServer = async () => {
    // creating a server requires two parameters:
    // your type definitions and your resolvers
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (formattedError, error) => {
            logger.error('GraphQL Error: ');
            logger.error(error);

            return {
                message: 'INTERNAL SERVER ERROR',
                path: formattedError.path,
            }
        }
    });

    const app = express();

    const port = process.env.PORT || 4000;
    const API_VERSION = process.env.API_VERSION || 'v1';

    connectDb()
        .then(async () => {
            // if database is connected successfully, then start the server
            await server.start();

            app.use(express.json());

            app.use(successHandler);
            app.use(errorHandler);

            // e.g. /api/v1/graphql
            app.use(`/api/${API_VERSION}/graphql`, expressMiddleware(server, {
                context: authMiddleware,
            }));

            app.use(`/api/${API_VERSION}`, router);

            app.listen(port, () => {
                logger.info(`Server started and listening on ${port}`);
            })
        })
        .catch(error => {
            logger.error('Error starting server');
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