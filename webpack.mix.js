const mix = require('laravel-mix');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// HTML Pages
const pages = [
    {
        title: 'My Awesome Theme',
        template: 'src/index.ejs',
        filename: 'index.html'
    },
    {
        title: 'About page',
        template: 'src/about.ejs',
        filename: 'about.html'
    }
];

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 */
mix.sass('src/assets/sass/app.scss', 'assets/')
    .js('src/assets/js/app.js', 'assets/')
    .setPublicPath('public')
    .browserSync({
        proxy: false,
        server: {
            baseDir: './public'
        },
        files: ['public/**/*.html', 'public/assets/css/**/*.css', 'public/assets/js/**/*.js']
    })
    .disableNotifications()
    .copyDirectory('src/assets/img', 'public/assets/img')
    .webpackConfig({
        plugins: [
            ...pages.map(page => {
                return new HtmlWebpackPlugin({
                    title: page.title,
                    template: '!!ejs-compiled-loader!' + page.template,
                    filename: page.filename,
                    inject: true
                })
            })
        ]
    });

// Fonts path
mix.config.fileLoaderDirs.fonts = 'assets/fonts';

mix.autoload({ 'jquery': ['window.$', 'window.jQuery'] })
