import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/**
 * @typedef {import('next/dist/server/config-shared').Rewrite} Rewrite
 */

/**
 * @typedef {{beforeFiles?: Rewrite[], afterFiles?: Rewrite[] ,fallback?: Rewrite[] }} Rewrites
 */

/**
 * cloud项目 重写规则
 * @type {Rewrite[]}
 */
const cloudRewrites = [
  {
    source: '/@:username/:projname/:path*',
    destination: `${process.env.NEXT_CLOUD_URL}/@:username/:projname/:path*`
  },
  {
    source: '/assets/:path*',
    destination: `${process.env.NEXT_CLOUD_URL}/assets/:path*`
  }
]

/**
 * 开发环境重写规则
 * @type {Rewrites}
 */
const devRewrites = {
  beforeFiles: [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PROXY_URL}/api/:path*`
    },
    ...cloudRewrites
  ]
}

/**
 * 编译后重写规则
 * @type {Rewrites}
 */
const proRewrites = {
  beforeFiles: [...cloudRewrites]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.NEXT_BASE_PATH,
  rewrites: async () => {
    if (process.env.NODE_ENV === 'development') {
      return devRewrites
    }
    return proRewrites
  },
  // camelCase transfer to kebab-case
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use))
    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader !== undefined &&
          moduleLoader.loader.includes('css-loader') &&
          typeof moduleLoader.options.modules === 'object'
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              // This is where we allow camelCase class names
              exportLocalsConvention: 'camelCase'
            }
          }
        }
      })
    })
    return config
  }
}

export default withNextIntl(nextConfig)
