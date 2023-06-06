import { getCookie } from "../helpers/cookie";
import { get, patch, post } from "../utils/request";

export const getUsers = async (email = '', password ="")=> {
    let email2 = "";
    if(email !== "") {
        email2 =`email=${email}`;
    }
    let password2 = "";
    if(password !== "") {
        password2 =`&password=${password}`;
    }
    const result = await get(`users?${email2}${password2}`);
    return result;
}
export const getUsersByID = async (idUser ="")=> {
    let ids = "";
    if(idUser === "") {
        const id = getCookie("id");
        if(id !== ''){
            ids = id;
        }
    }
    else {
        ids = idUser;
    }
    
    const response =await get(`users/${ids}`);
    return response ;
   
}

export const updateUsers = async (options)=> {
    const id = getCookie("id");
  
    const response = await patch(`users/${id}`, options);
    return response ;
}
export const createUsers = async (options)=> {
    const result = await post("users", options);
    return result;
}