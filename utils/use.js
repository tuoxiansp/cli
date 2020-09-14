import fs from 'fs'
import path from 'path'

export function useTs() {
    return fs.existsSync(path.resolve(process.cwd(), 'tsconfig.json'))
}

export function useYarn() {
    return fs.existsSync(path.resolve(process.cwd(), 'yarn.lock'))
}
