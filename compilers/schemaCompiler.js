import fs from 'fs'

import { paths } from '../constants'

export async function compileSchema(schemaPath, componentsPath) {
    const { transform } = await import(paths.mould.transform)

    const schema = await fs.promises.readFile(schemaPath, 'utf8')

    await fs.promises.writeFile(componentsPath, transform(JSON.parse(schema)))
}
