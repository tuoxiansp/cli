import path from 'path'

export default function resolvePath(relativePath = '.') {
    return path.resolve(process.env.INIT_CWD, relativePath)
}
