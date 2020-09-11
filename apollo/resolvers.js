import fs from 'fs'
import { paths } from '../constants'

const { readFile, writeFile } = fs.promises

export const resolvers = {
    Query: {
        schemas: async () => {
            try {
                return await readFile(paths.schema, 'utf8')
            } catch {
                return null
            }
        },
        ping: () => true,
    },
    Mutation: {
        saveSchemas: async (parent, { schemas }) => {
            await writeFile(paths.schema, schemas, 'utf8')

            return true
        },
    },
}
