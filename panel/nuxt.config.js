require('dotenv').config()

export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s',
        title: 'title',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff', height: '3px' },
    /*
     ** Global CSS
     */
    css: ['~/assets/styles.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/axios',
        { src: '~/plugins/vuetify', ssr: false },
        '~/plugins/helper',
        '~/plugins/components'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/dotenv', '@nuxtjs/axios', '@nuxtjs/vuetify'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/auth',
        '@nuxtjs/proxy',
        '@nuxtjs/recaptcha',
        '@nuxtjs/toast',
        'nuxt-user-agent'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        credentials: true,
        progress: true,
        proxy: true
    },
    /*
     ** axios proxy configuration
     */
    proxy: {
        '/api': {
            target: process.env.AXIOS_BASE_URL,
            pathRewrite: {
                '^/api/': ''
            }
        }
    },
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        rtl: true,
        theme: {
            dark: false
                // themes: {
                //   light: {
                //     primary: '#ff9800',
                //     secondary: '#8bc34a',
                //     accent: '#e91e63',
                //     error: '#f44336',
                //     warning: '#ff5722',
                //     info: '#03a9f4',
                //     success: '#4caf50'
                //   }
                // }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    /*
     ** recaptcha module configuration
     */
    recaptcha: {
        hideBadge: true, // Hide badge element (v3)
        version: 3, // Version
        siteKey: process.env.RECAPTCHA_SITE_KEY // Site key for requests
    },
    /*
     ** Toast configuration
     */
    toast: {
        duration: 3000,
        position: 'bottom-left',
        iconPack: 'mdi'
    },
    /*
     ** auth module configuration
     */
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: 'api/adm/lgn',
                        method: 'post',
                        propertyName: 'data.tokens.access_token'
                    },
                    user: {
                        url: 'api/adm/usr',
                        method: 'get',
                        propertyName: 'data.user'
                    },
                    logout: {
                        url: 'api/adm/lgt',
                        method: 'get',
                        propertyName: false
                    },
                    tokenRequired: true,
                    tokenType: 'Bearer'
                }
            }
        }
    }
}