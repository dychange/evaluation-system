import {Loading} from 'element-ui'
let loading
let startLoading=()=>{
    loading=Loading.service({
        target:'.loading',
        spinner: 'el-icon-loading',
        text:'请稍等...',
        background:"rgba(0, 0, 0, 0.8)"
    })
}

let endLoading=()=>{
    loading.close()
}

export {
    startLoading,
    endLoading
}