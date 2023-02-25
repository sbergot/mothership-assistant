export function roll(sides: number, number: number) {
    let result = 0;
    for (let i = 0; i < number; i++) {
        result += Math.floor(Math.random() * sides) + 1;
    }
    return result;
}