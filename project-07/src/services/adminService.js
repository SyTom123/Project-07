import { get, patch} from "../utils/request";

export const getAdmin = async (email = '', password ="")=> {
    let email2 = "";
    if(email !== "") {
        email2 =`email=${email}`;
    }
    let password2 = "";
    if(password !== "") {
        password2 =`&password=${password}`;
    }
    const result = await get(`admin?${email2}${password2}`);
    return result;
}
export const editAdmin = async ( options)=> {
    const result = await patch(`admin/1`, options);
    return result;
}