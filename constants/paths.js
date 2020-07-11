import fs from 'fs'
import os from 'os'
import path from 'path'

import { MOULD_VERSION } from '../constants'

const appDirectory = process.cwd()
const cliDirectory = path.join(__dirname, '..')
const mouldDirectory = path.join(os.homedir(), '.mould')

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const resolveCli = (relativePath) => path.resolve(cliDirectory, relativePath)
const resolveMould = (relativePath) => path.resolve(mouldDirectory, MOULD_VERSION, relativePath)

const useTs = fs.existsSync(resolveApp('tsconfig.json'))

export const app = {
    directory: appDirectory,
    mouldDirectory: resolveApp('mould'),
    schema: resolveApp('mould/.mould'),
    resolvers: resolveApp(`mould/resolvers.${useTs ? 'ts' : 'js'}`),
}

export const cli = {
    directory: cliDirectory,
    componentsDirectory: resolveCli('.components'),
    components: resolveCli('.components/index.tsx'),
}

export const mould = {
    directory: mouldDirectory,
    byVersionDirectory: resolveMould('.'),
    symlinkDirectory: resolveMould('.mould'),
    transform: resolveMould('compile/transform'),
}

export const bin = {
    next: resolveMould('node_modules/.bin/next'),
    tsc: resolveMould('node_modules/.bin/tsc'),
}
