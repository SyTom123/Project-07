export function Down () {
    return {
        type:"PREVIOUS",
        value: 1
    }
}
export function Up (totalPageNumber) {
    return {
        type:"NEXT",
        value: 1,
        totalPageNumber: totalPageNumber
    }
}
export function Reset () {
    return {
        type:"RESET"
    }
}
