import { get } from "../utils/request"

export const getCategory = async ()=> {
    const result = await get(`categories`);
    return result;
}