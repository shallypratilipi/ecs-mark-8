'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    FIREBASE_API_KEY: '"AIzaSyAAnK0-vDmY1UEcrRRbCzXgdpF2oQn-E0w"',
    FIREBASE_AUTH_DOMAIN: '"prod-pratilipi.firebaseapp.com"',
    FIREBASE_DATABASE_URL: '"https://prod-pratilipi.firebaseio.com"',
    FIREBASE_GROWTH_DATABASE_URL: '"https://gr-pratilipi.firebaseio.com"',
    FIREBASE_PROJECT_ID: '"prod-pratilipi"',
    FIREBASE_STORAGE_BUCKET: '"prod-pratilipi.appspot.com"',
    LANGUAGE: `"${process.env.LANGUAGE || 'hi'}"`,
    FACEBOOK_APP_ID: '368844269953501',
    AMPLITUDE_APP_ID: "'73ff7c6e07c484e37d0a9d7d240312c6'",
    GA_WEBSITE: "'PWA'",
    GA_WEBSITE_MODE: "'Standard'",
    GA_WEBSITE_VERSION: "'Mark-8'",
    GOOGLE_CLIENT_ID: "'659873510744-kfim969enh181h4gbctffrjg5j47tfuq.apps.googleusercontent.com'",
    FACEBOOK_SDK_VERSION : "'v3.0'"
})
