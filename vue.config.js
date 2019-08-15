const BASE_URL = process.env.NODE_ENV === 'production' ? '/museum/dist/' : '/'

module.exports={
    publicPath: BASE_URL,
    assetsDir: 'assets',
    outputDir: 'dist',
    productionSourceMap:false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.3.45:8080/museum', 
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}