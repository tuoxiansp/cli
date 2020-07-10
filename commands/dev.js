import spawn from 'cross-spawn'
import fs from 'fs'
import { debounce } from 'debounce'
import path from 'path'

import { compileSchema, compileTs } from '../compilers'
import { paths } from '../constants'
import {
    copyByExtension, copyByExtensionWithExtensionReplacement, existsSyncWithExtension
} from '../utils'

;(async function dev() {
    if (fs.existsSync(paths.app.mouldDirectory)) {
        try {
            await build()
            symlinkMould()
            runEditor()
            watchTs()
            watchMould()
        } catch (error) {
            console.error('Failed to run Mould in development\n' + error)
        }
    } else {
        console.warn(
            `You don't have ${path.basename(paths.app.mouldDirectory)} ` +
            `initialized at ${paths.app.directory}\n\n` +
            'You could start by typing:\n\n' +
            '  npx mould init\n'
        )
    }
})()

function build() {
    return Promise.all([
        fs.existsSync(paths.app.schema) &&
            compileSchema(paths.app.schema, paths.cli.components),
        existsSyncWithExtension(paths.app.mouldDirectory, '.ts') &&
            copyByExtension(
                paths.app.mouldDirectory,
                paths.cli.componentsDirectory,
                '.ts'
            ),
        existsSyncWithExtension(paths.app.mouldDirectory, '.js') &&
            copyByExtensionWithExtensionReplacement(
                paths.app.mouldDirectory,
                paths.cli.componentsDirectory,
                '.js',
                '.ts'
            ),
    ]).then(compileTs)
}

function symlinkMould() {
    if (fs.existsSync(paths.cli.symlinkDirectory)) {
        fs.unlinkSync(paths.cli.symlinkDirectory)
    }
    fs.symlinkSync(
        paths.app.mouldDirectory,
        paths.cli.symlinkDirectory,
        'dir'
    )
}

function runEditor() {
    const cdToMouldDir = `cd ${paths.mould.byVersionDirectory}`
    const setWorkdirEnvVar = `WORKDIR=${paths.app.mouldDirectory}`
    const runNextDev = `${paths.bin.next} dev`

    if (
        process.platform === 'win32' ||
        process.env.OSTYPE === 'msys' ||
        process.env.OSTYPE === 'cygwin'
    ) {
        spawn(
            'cmd.exe',
            ['/c', `${cdToMouldDir} && set ${setWorkdirEnvVar} && ${runNextDev}`],
            { stdio: 'inherit' }
        )
    } else {
        spawn(
            'bash',
            ['-c', `${cdToMouldDir} && ${setWorkdirEnvVar} ${runNextDev}`],
            { stdio: 'inherit' }
        )
    }
}

function watchTs() {
    spawn(
        paths.bin.tsc,
        ['-p', path.join(__dirname, '..', 'compilers', 'tsconfig.json'), '--watch'],
        { stdio: 'inherit' }
    )
}

function watchMould() {
    fs.watch(
        paths.app.mouldDirectory,
        debounce((event, filename) => {
            if (!filename) {
                return
            }

            if (filename.startsWith(path.basename(paths.app.schema))) {
                const compileSchemaTime = process.hrtime()

                compileSchema(paths.app.schema, paths.cli.components)
                    .then(() => {
                        const [s, ns] = process.hrtime(compileSchemaTime)

                        console.log(
                            'Compiled Mould Schema successfully ' +
                            `in ${s}s ${ns / 1e6}ms`
                        )
                    })
                    .catch((error) => {
                        console.error(
                            'Failed to compile Mould Schema\n' + error
                        )
                    })
            } else if (path.extname(filename).startsWith('.ts')) {
                const copyTsTime = process.hrtime()

                copyByExtension(
                    paths.app.mouldDirectory,
                    paths.cli.componentsDirectory,
                    '.ts'
                )
                    .then(() => {
                        const [s, ns] = process.hrtime(copyTsTime)

                        console.log(
                            'Copied TypeScript successfully ' +
                            `in ${s}s ${ns / 1e6}ms`
                        )
                    })
                    .catch((error) => {
                        console.error('Failed to copy TypeScript\n' + error)
                    })
            } else if (path.extname(filename).startsWith('.js')) {
                const copyJsTime = process.hrtime()

                copyByExtensionWithExtensionReplacement(
                    paths.app.mouldDirectory,
                    paths.cli.componentsDirectory,
                    '.js',
                    '.ts'
                )
                    .then(() => {
                        const [s, ns] = process.hrtime(copyJsTime)

                        console.log(
                            'Copied JavaScript successfully ' +
                            `in ${s}s ${ns / 1e6}ms`
                        )
                    })
                    .catch((error) => {
                        console.error('Failed to copy JavaScript\n' + error)
                    })
            }
        }, 500)
    )
}
