import { ApolloServer } from 'apollo-server-express'
import chalk from 'chalk'
import express from 'express'
import fs from 'fs'
import path from 'path'

import { schema } from '../apollo/schema'
import { paths } from '../constants'
import { useYarn } from '../utils'

if (!fs.existsSync(paths.mouldDirectory)) {
    console.warn(
        `You don't have ${chalk.green(
            path.basename(paths.mouldDirectory)
        )} initialized at ${chalk.green(paths.rootDirectory)}\n\n` +
            'You could set it up by typing:\n\n' +
            `  ${chalk.cyan(`${useYarn() ? 'yarn' : 'npx'} mould init`)}\n`
    )
    process.exit(1)
}

const app = express()

const server = new ApolloServer({ schema })

server.applyMiddleware({
    app,
    path: '/api/graphql',
    bodyParserConfig: {
        limit: '100mb',
    },
})

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
