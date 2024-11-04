import type { battleShip, playerInfo } from "./models";

let ships: number[] = []
let store: battleShip
let turn: number

export function getTurn() {
    return turn
} 

export function gamePlay(field1: number[], field2: number[], p1: playerInfo, p2: playerInfo, fire1: number[], fire2: number[], turnCount: number, shipsArr: number[], storeData: battleShip) {
    turn = turnCount;
    ships = shipsArr;
    store = storeData 

    let endScore = 0
    ships.forEach(n => endScore += n)


    for (let i = 0; i < fire1.length; ++i) {
        ++turn
        fire(field2, p1, fire1[i])
        fire(field1, p2, fire2[i])

        if (p1.score >= endScore || p2.score >= endScore) {
            return 'GameOver'
        }
    }

}

function fire(FieldP: number[], pObj: playerInfo, f: number) {
    if (FieldP[f] > 0 && FieldP[f] < 6) {
        pObj.score += 1
        pObj.currentStreak += 1
    } else {
        pObj.currentStreak = 0
    }
    if (FieldP[f] > 5) {
        let key = toCoordinates(f)
        if (pObj.duplicates[key]) {
            pObj.duplicates[key] += 1
        } else {
            pObj.duplicates[key] = 2
        }
    } else {
        FieldP[f] += 6
    }

    if (pObj.bestStreak < pObj.currentStreak) {
        pObj.bestStreak = pObj.currentStreak
        pObj.lastTurnStreak = turn
    }
}

function toCoordinates(n: number) {
    let xStr: string = ((n % store.xAxis!) + 1).toString();
    let yStr: string = String.fromCharCode('A'.charCodeAt(0) + (n / store.xAxis!));

    return yStr + xStr
}