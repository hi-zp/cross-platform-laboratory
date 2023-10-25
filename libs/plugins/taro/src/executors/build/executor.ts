/* eslint-disable @nrwl/nx/enforce-module-boundaries,@typescript-eslint/no-explicit-any */
import { BuildExecutorSchema } from './schema'
import { Config, Kernel } from '@tarojs/service'
import * as path from 'path'
import { dotenvParse, patchEnv } from './utils'
import * as fs from 'fs'
import * as process from 'process'

function customCommand(
    command: string,
    kernel: Kernel,
    args: { _: string[]; [key: string]: any },
) {
    const options: any = {}
    const excludeKeys = ['_', 'version', 'v', 'help', 'h']
    Object.keys(args).forEach((key) => {
        if (!excludeKeys.includes(key)) {
            options[key] = args[key]
        }
    })

    return kernel.run({
        name: command,
        opts: {
            _: args._,
            options,
            isHelp: args.h,
        },
    })
}

export default async function runExecutor(options: BuildExecutorSchema) {
    const command = 'build' as string
    const args = Object.assign({}, options, {
        _: [command],
    }) as any
    const _ = args._

    args.sourceMapUrl = args.sourcemapUseAbsolutePath
    const rootDir = path.resolve(process.cwd(), options.rootDir)
    const nodeModulesPath = path.resolve(rootDir, 'node_modules')

    const appPath = path.resolve(rootDir, options.appDir)

    const presetsPath = path.resolve(
        nodeModulesPath,
        '@tarojs/cli/dist',
        'presets',
    )
    const commandsPath = path.resolve(presetsPath, 'commands')
    const platformsPath = path.resolve(presetsPath, 'platforms')
    const commandPlugins = fs.readdirSync(commandsPath)
    const targetPlugin = `${command}.js`

    // 设置环境变量
    process.env.NODE_ENV ||= args.env
    if (process.env.NODE_ENV === 'undefined' && (command === 'build' || command === 'inspect')) {
      process.env.NODE_ENV = (args.watch ? 'development' : 'production')
    }
    args.type ||= args.t
    if (args.type) {
      process.env.TARO_ENV = args.type
    }
    if (typeof args.plugin === 'string') {
      process.env.TARO_ENV = 'plugin'
    }
    const mode = args.mode || process.env.NODE_ENV
    // 这里解析 dotenv 以便于 config 解析时能获取 dotenv 配置信息
    const expandEnv = dotenvParse(appPath, args.envPrefix, mode)
    // const disableGlobalConfig = !!(args['disable-global-config'] || DISABLE_GLOBAL_CONFIG_COMMANDS.includes(command))

    const configEnv = {
      mode,
      command,
    }
    const config = new Config({
      appPath,
      disableGlobalConfig: true
    })
    await config.init(configEnv)

    const kernel = new Kernel({
        appPath,
        presets: [
          path.resolve(presetsPath, 'index.js')
        ],
        config,
        plugins: []
    })
    kernel.optsPlugins ||= []

    // 将自定义的 变量 添加到 config.env 中，实现 definePlugin 字段定义
    const initialConfig = kernel.config?.initialConfig
    if(initialConfig) {
      initialConfig.env = patchEnv(initialConfig, expandEnv)
    }

    // 针对不同的内置命令注册对应的命令插件
    if (commandPlugins.includes(targetPlugin)) {
        kernel.optsPlugins.push(path.resolve(commandsPath, targetPlugin))
    }

    // 把内置命令插件传递给 kernel，可以暴露给其他插件使用
    kernel.cliCommandsPath = commandsPath
    kernel.cliCommands = commandPlugins
      .filter(commandFileName => /^[\w-]+(\.[\w-]+)*\.js$/.test(commandFileName))
      .map(fileName => fileName.replace(/\.js$/, ''))

    let plugin
    let platform = args.type as string
    const { publicPath, bundleOutput, sourcemapOutput, sourceMapUrl, sourcemapSourcesRoot, assetsDest } = args

    // 针对不同的内置平台注册对应的端平台插件
    switch (platform) {
        case 'weapp':
        case 'alipay':
        case 'swan':
        case 'tt':
        case 'qq':
        case 'jd':
        case 'h5':
            kernel.optsPlugins.push(`@tarojs/plugin-platform-${platform}`)
            break
        default: {
            // plugin, rn
            const platformPlugins = fs.readdirSync(platformsPath)
            const targetPlugin = `${platform}.js`
            if (platformPlugins.includes(targetPlugin)) {
              kernel.optsPlugins.push(path.resolve(platformsPath, targetPlugin))
            }
            break
        }
    }

    // 根据 framework 启用插件
    const framework = kernel.config?.initialConfig.framework
    switch (framework) {
      case 'vue':
        kernel.optsPlugins.push('@tarojs/plugin-framework-vue2')
        break
      case 'vue3':
        kernel.optsPlugins.push('@tarojs/plugin-framework-vue3')
        break
      default:
        kernel.optsPlugins.push('@tarojs/plugin-framework-react')
        break
    }

    // 编译小程序插件
    if (typeof args.plugin === 'string') {
      plugin = args.plugin
      platform = 'plugin'
      kernel.optsPlugins.push(path.resolve(platformsPath, 'plugin.js'))
      if (plugin === 'weapp' || plugin === 'alipay' || plugin === 'jd') {
        kernel.optsPlugins.push(`@tarojs/plugin-platform-${plugin}`)
      }
    }

    // 传递 inspect 参数即可
    if (command === 'inspect') {
      await customCommand(command, kernel, args)
      return {
          success: true,
      }
    }

    const rest = await customCommand(command, kernel, {
        _,
        platform,
        plugin,
        isWatch: Boolean(args.watch),
        // 是否把 Taro 组件编译为原生自定义组件
        isBuildNativeComp: _[1] === 'native-components',
        // 新的混合编译模式，支持把组件单独编译为原生组件
        newBlended: Boolean(args['new-blended']),
        port: args.port,
        env: args.env,
        deviceType: args.platform,
        resetCache: !!args.resetCache,
        publicPath,
        bundleOutput,
        sourcemapOutput,
        sourceMapUrl,
        sourcemapSourcesRoot,
        assetsDest,
        qr: !!args.qr,
        blended: Boolean(args.blended),
        h: false,
    })

    return {
      success: true,
    }
}