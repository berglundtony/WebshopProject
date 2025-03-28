
export function ShortDescription(inp: string) {
    let shorter = "";
    if (inp.length >= 30) {
        shorter = inp.substring(0, 30);
        return shorter;
    }
    return (inp);
}