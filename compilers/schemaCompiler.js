import fs from 'fs'
import path from 'path'

import { transform } from '../compile/transform'

export async function compileSchema(schemaPath, componentsPath) {
    const schema = await fs.promises.readFile(schemaPath, 'utf8')

    await fs.promises.writeFile(componentsPath, transform(JSON.parse(schema)))
}
