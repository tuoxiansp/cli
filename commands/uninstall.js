import spawn from 'cross-spawn'
import fs from 'fs'

import { paths } from '../constants'

if (!fs.existsSync(paths.mould.directory)) {
    console.warn(`You don't have mould installed.`)
    process.exit(0)
}

const result = spawn.sync(
    'bash',
    ['-c', `rm -rf ${paths.mould.directory}`],
    { stdio: 'inherit' }
)

if (result.status === 0) {
    console.info('Uninstalled mould successfully.')
}
