import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

import { paths } from '../constants'
import { useYarn } from '../utils'

if (!fs.existsSync(path.join(paths.rootDirectory, 'package.json'))) {
    console.error(
        `Please, run ${chalk.cyan(
            `${useYarn() ? 'yarn' : 'npx'} mould init`
        )} within your project directory`
    )
    process.exit(1)
}

if (fs.existsSync(paths.mouldDirectory)) {
    console.warn(
        `You already have ${chalk.green(
            path.basename(paths.mouldDirectory)
        )} initialized at ${chalk.green(paths.rootDirectory)}`
    )
} else {
    fs.mkdirSync(paths.mouldDirectory)

    console.log(
        `Created ${chalk.green(path.basename(paths.mouldDirectory))} ` +
            `directory at ${chalk.green(paths.rootDirectory)}`
    )
}

if (!fs.existsSync(paths.resolvers)) {
    fs.writeFileSync(paths.resolvers, 'export default {}')

    console.log(
        `Created ${chalk.green(path.basename(paths.resolvers))} ` +
            `at ${chalk.green(paths.mouldDirectory)}`
    )
}

if (!fs.existsSync(paths.setup)) {
    fs.writeFileSync(paths.setup, 'export default () => ({})')

    console.log(
        `Created ${chalk.green(path.basename(paths.setup))} ` +
            `at ${chalk.green(paths.mouldDirectory)}`
    )
}

console.log(
    '\nYou could begin by typing:\n\n' +
        `  ${chalk.cyan(`${useYarn() ? 'yarn' : 'npx'} mould dev`)}\n\n` +
        `Or you could add ${chalk.cyan('mould dev')} to your ${chalk.green(
            'package.json'
        )} scripts\n`
)
