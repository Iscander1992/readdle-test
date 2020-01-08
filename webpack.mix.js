const mix = require('laravel-mix');

mix
    .webpackConfig({
        target: 'electron-renderer',
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src'),
            ],
        },
        node: {
            __dirname: false,
            __filename: false
        },
    })
    .copy('./src/index.html', 'dist/')
    .copy('./src/mail.html', 'dist/')
    .copy('./src/main.js', './dist/main.js')
    .ts('./src/App/index.tsx', './dist/app.js')
    .ts('./src/App/mail.tsx', './dist/mail.js')
    .sass('./src/app.scss', 'dist/')
    .options({
        processCssUrls: false,
    })
    .setPublicPath('dist')
    .browserSync({
        proxy: null,
        server: {
            baseDir: 'dist',
        }
    });
