function AuthenReducer (state= true, action){
    if(action.type === "CHANGE_AUTHEN") {
        return action.value;
    }
    else {
        return state;
    }
}
export default AuthenReducer;