export function simpleRoll(sides: number): number {
    return Math.floor(Math.random() * sides);
}

export function roll(number: number, sides: number): number {
    let result = 0;
    for (let i = 0; i < number; i++) {
        result += simpleRoll(sides) + 1;
    }
    return result;
}

export function pickRandom<T>(source: T[]): T {
    return source[simpleRoll(source.length)];
}