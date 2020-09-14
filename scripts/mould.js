import { useWorkdir } from '../utils'

export default function mould(command) {
    return useWorkdir()
        ? `mould ${command} ${process.env.WORKDIR}`
        : `mould ${command}`
}
