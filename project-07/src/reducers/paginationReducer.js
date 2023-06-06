const Pagination = (state = 1, action) => {
    switch (action.type) {
        case "PREVIOUS":
            if(state >1) {
                state -=1
            }
           return state;
        case "NEXT":
            if(state < action.totalPageNumber) {
                state +=1
            }
            return state
        case "RESET":
            return 1;
        default:
            return state
    }
};
export default Pagination;
