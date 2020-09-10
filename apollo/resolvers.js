import fs from 'fs'
import path from 'path'

const { readFile, writeFile } = fs.promises

export const resolvers = {
    Query: {
        schemas: async () => {
            if (!process.env.WORKDIR) {
                throw Error('WORKDIR must be specified.')
            }
            try {
                return await readFile(
                    path.join(process.env.WORKDIR, '.mould'),
                    'utf8'
                )
            } catch {
                return null
            }
        },
        ping: () => true,
    },
    Mutation: {
        saveSchemas: async (parent, { schemas }) => {
            await writeFile(
                path.join(process.env.WORKDIR, '.mould'),
                schemas,
                'utf8'
            )

            return true
        },
    },
}
