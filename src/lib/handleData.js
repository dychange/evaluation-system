import {formatDate} from './formate'


const handleAddTime=(result)=>{
  let list =result.data.info.rows
  for (let i in list){
    let addTime=formatDate(list[i].addTime)
    list[i].addTime=addTime
  }
  return list
}

export {
  handleAddTime
}