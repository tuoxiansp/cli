import { resolvePath, useTs } from '../utils'

export default {
    rootDirectory: resolvePath('.'),
    mouldDirectory: resolvePath('mould'),
    schema: resolvePath('mould/.mould'),
    resolvers: resolvePath(`mould/resolvers.${useTs() ? 'ts' : 'js'}`),
    setup: resolvePath(`mould/setup.${useTs() ? 'ts' : 'js'}`),
}
