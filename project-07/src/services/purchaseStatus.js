import { get } from "../utils/request"

export const getPurchaseStatus = async ()=> {
    const result = await get(`purchaseStatus`);
    return result;
}