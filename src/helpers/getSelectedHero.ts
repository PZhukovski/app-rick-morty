import { IChar } from "../types/char";

export const getSelectedHero = (heroes: IChar[], select: number[]) => {
    if (!select.length) {
        return []
    }
    let newArr: IChar[] = [];
    select.forEach((id) => {
        heroes.forEach((hero) => {
            if (hero.id === id) {
                newArr.push(hero);
            }
        })
    })
    return newArr;
}