import axios from './index'


const getItemList=(data)=>{
    return axios.request({
        url:'/itemInfo/list',
        method:'post',
        data
    })
}


const delItem=(data)=>{
    return axios.request({
        url:'/itemInfo/delete',
        method:'post',
        data
    })
}

const updateItem=(data)=>{
    return axios.request({
        url:'/itemInfo/update',
        method:'post',
        data
    })
}


export {
    getItemList,
    delItem,
    updateItem
}