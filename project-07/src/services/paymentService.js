import { post, get, patch, del } from "../utils/request";
import { getCookie } from "../helpers/cookie";
export const postPayment = async (options)=> {
    const result = await post(`payment`, options);
    return result;
}


export const getPayment = async (status = "")=> {
    const id = getCookie("id");
    const userId = `userID=${id}`;
    let value = "";
    if(status !== ""){
        value = `&status=${status}`
    }

    const result = await get(`payment?${userId}${value}`);
    return result;
}
export const getAllPayment = async (status = "")=> {
    let value = "";
    if(status !== ""){
        value = `&status=${status}`
    }
    const result = await get(`payment?${value}`);
    return result;
}
export const getPaymentbyID = async (id)=> {
    const result = await get(`payment/${id}`);
    return result;
}
export const editPayment = async (id, options)=> {
    const result = await patch(`payment/${id}`,options);
    return result;
}
export const deletePayment = async (id, options)=> {
    const result = await del(`payment/${id}`,options);
    return result;
}