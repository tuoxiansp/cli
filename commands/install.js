import spawn from 'cross-spawn'
import fs from 'fs'

import { paths } from '../constants'

if (!fs.existsSync(paths.mould.directory)) {
    fs.mkdirSync(paths.mould.directory)
}

const version = 'MVP'
const fileName = `${version}.zip`
const url = `https://github.com/mouldjs/mould/archive/${fileName}`

spawn(
    'bash',
    ['-c', `cd ${paths.mould.directory} && curl -LOkSs ${url} && unzip ${fileName} && rm ${fileName}`],
    { stdio: 'inherit' }
)
