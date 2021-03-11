const mix = require('laravel-mix');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// HTML Pages
const pages = [
    {
        title: 'Zeppelin',
        template: 'src/index.ejs',
        filename: 'index.html'
    }
];

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 */
mix.sass('src/assets/sass/app.scss', 'assets/')
    .setPublicPath('public')
    .browserSync({
        proxy: false,
        server: {
            baseDir: './public'
        },
        files: ['public/**/*.html', 'public/assets/css/**/*.css']
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

mix.options({
    processCssUrls: false
});
