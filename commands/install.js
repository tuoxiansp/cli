import spawn from 'cross-spawn'
import fs from 'fs'

import { MOULD_VERSION, paths } from '../constants'

if (fs.existsSync(paths.mould.byVersionDirectory)) {
    console.warn(`You already have mould@${MOULD_VERSION} installed.`)
    process.exit(0)
}

if (!fs.existsSync(paths.mould.directory)) {
    fs.mkdirSync(paths.mould.directory)
}

const zipFile = `${MOULD_VERSION}.zip`
const url = `https://github.com/mouldjs/mould/archive/${zipFile}`

spawn(
    'bash',
    [
        '-c',
        [
            `cd ${paths.mould.directory}`,
            `curl -LOkSs ${url}`,
            `unzip ${zipFile} -d ${MOULD_VERSION}`,
            `rm ${zipFile}`
        ].join(' && ')
    ],
    { stdio: 'inherit' }
)
