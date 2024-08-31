//AAS1 import

import BASE_URL from "./Base_url"
import { commonRequest } from "./CommonRequest"

// register
// AAS2
export const registerAPI=async(header,body)=>{//bcz async commonRequest
    return await commonRequest("POST",`${BASE_URL}/tasks/register`,body,header)
}

//GES 4 get all tasks          becz no file type data 
                                // SSDS5 then goto line16
export const getAllTasks=async(search)=>{
                                                                        // here body is empety and header will take default apllication/json as empet string
                                                                            // SSDS6 query paremneter  then goto home.js
    return await commonRequest("GET",`${BASE_URL}/tasks/getTasksDetails?tosearch=${search}`,"")//search=${search}
}

// GSES5 get single employee,then goto view.js
export const getSingleTask=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/tasks/singleTaskDetail/${id}`,"")
}

// RES4  then goto home.js
export const toremoveTask=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/tasks/toRemoveTask/${id}`,{})
}

// SD4 update employee then goto edit.js
export const editTask=async(id,header,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/tasks/updateTask/${id}`,body, header)
}