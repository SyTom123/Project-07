function ReloadReducer (state= false, action){
    if(action.type === "CHANGE_RELOAD") {
        return !state;
    }
    else {
        return state;
    }
}
export default ReloadReducer;