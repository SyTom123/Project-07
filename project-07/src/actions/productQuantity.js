export function down () {
    return {
        type:"DOWN",
        value: 1
    }
}
export function up () {
    return {
        type:"UP",
        value: 1,
    }
}
export function reset () {
    return {
        type:"RESET",
    }
}
