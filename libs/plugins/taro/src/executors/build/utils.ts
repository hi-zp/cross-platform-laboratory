/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { parse } from 'dotenv'
import { expand } from 'dotenv-expand'
import * as path from 'path'
import * as fs from 'fs'
import type { IProjectConfig } from '@tarojs/taro/types/compile'

export const formatPrefix = (
    prefixs: string | string[] = ['TARO_APP_'],
): string[] => {
    return (Array.isArray(prefixs) ? prefixs : prefixs.split(','))
        .map((prefix) => prefix.trim())
        .filter((prefix) => !!prefix)
}
export const dotenvParse = (
    root: string,
    prefixs: string | string[] = ['TARO_APP_'],
    mode?: string,
): Record<string, string> => {
    const prefixesArr: string[] = formatPrefix(prefixs)

    const envFiles = new Set([
        /** default file */ `.env`,
        /** local file */ `.env.local`,
    ])

    if (mode) {
        envFiles.add(/** mode file */ `.env.${mode}`)
        envFiles.add(/** mode local file */ `.env.${mode}.local`)
    }

    let parseTemp = {}
    const load = (envPath) => {
        // file doesn'et exist
        if (!fs.existsSync(envPath)) return
        const env = parse(fs.readFileSync(envPath))
        parseTemp = {
            ...parseTemp,
            ...env,
        }
    }

    envFiles.forEach((envPath) => {
        load(path.resolve(root, envPath))
    })

    const parsed = {}
    Object.entries(parseTemp).forEach(([key, value]) => {
        if (prefixesArr.some((prefix) => key.startsWith(prefix))) {
            parsed[key] = value
        }
    })
    expand({ parsed })
    return parsed
}

export const patchEnv = (
    config: IProjectConfig,
    expandEnv: Record<string, string>,
) => {
    const expandEnvStringify = {}
    for (const key in expandEnv) {
        expandEnvStringify[key] = JSON.stringify(expandEnv[key])
    }
    return {
        ...config.env,
        ...expandEnvStringify,
    }
}