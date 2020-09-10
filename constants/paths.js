import fs from 'fs'
import path from 'path'

const directory = process.cwd()

const resolveApp = (relativePath) => path.resolve(directory, relativePath)

const useTs = fs.existsSync(resolveApp('tsconfig.json'))

export default {
    directory: directory,
    mouldDirectory: resolveApp('mould'),
    schema: resolveApp('mould/.mould'),
    resolvers: resolveApp(`mould/resolvers.${useTs ? 'ts' : 'js'}`),
    setup: resolveApp(`mould/setup.${useTs ? 'ts' : 'js'}`),
}
