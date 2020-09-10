import fs from 'fs'
import resolvePath from './resolvePath'

export function useTs() {
    return fs.existsSync(resolvePath('tsconfig.json'))
}

export function useYarn() {
    return fs.existsSync(resolvePath('yarn.lock'))
}
