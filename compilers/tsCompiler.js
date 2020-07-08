import spawn from 'cross-spawn'
import path from 'path'

import { paths } from '../constants'

export function compileTs() {
    return new Promise((resolve, reject) => {
        const tsconfig = path.join(__dirname, 'tsconfig.json')

        const tscProcess = spawn(
            paths.bin.tsc,
            ['-p', tsconfig],
            { stdio: 'inherit' }
        )

        tscProcess.on('close', (code) =>
            code === 0 ? resolve(code) : reject(code)
        )
        tscProcess.on('error', reject)
    })
}
