import axios from './index'

const getAdminInfo=(data)=>{
    return axios.request({
        url:'/memberInfo/list',
        method:'post',
        data
    })
}

const cancelAdminInfo=(data)=>{
    return axios.request({
        url:'/memberInfo/updateStatus',
        method:'post',
        data
    })
}

const openAdminInfo=(data)=>{
    return axios.request({
        url:'/memberInfo/updateStatus',
        method:'post',
        data
    })
}

const addAdmin=(data)=>{
    return axios.request({
        url:'/memberInfo/insert',
        method:'post',
        data
    })
}

const checkName=(data)=>{
    return axios.request({
        url:'/memberInfo/verification',
        method:'post',
        data
    })
}

const updateInfo=(data)=>{
    return axios.request({
        url:'/memberInfo/update',
        method:'post',
        data
    })
}

export {
    getAdminInfo,
    cancelAdminInfo,
    openAdminInfo,
    addAdmin,
    checkName,
    updateInfo
}