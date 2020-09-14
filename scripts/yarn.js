import { useYarn } from '../utils'

export default function yarn(script) {
    return `${useYarn() ? 'yarn' : 'npx'} ${script}`
}
