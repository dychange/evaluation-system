const BASE_URL = process.env.NODE_ENV === 'production' ? '/psychology/dist/' : '/'

module.exports={
    publicPath: BASE_URL,
    assetsDir: 'assets',
    outputDir: 'dist',
    productionSourceMap:false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.3.45:8080/psychology', 
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}