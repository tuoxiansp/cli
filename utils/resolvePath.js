import path from 'path'

export default function resolvePath(relativePath = '.') {
    return path.resolve(process.cwd(), process.env.WORKDIR, relativePath)
}
