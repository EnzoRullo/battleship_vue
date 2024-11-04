import type { battleShip } from "./models";

let ships:number[] = []
let store:battleShip

export function shipPlacing(playerField: number[],shipsArr:number[],storeData:battleShip) {
    ships = shipsArr;
    store = storeData;
    for (let s = 0; s < ships.length; s++) {
        let rngArr = possiblePositions(s);
        for (const N of rngArr) {
            if (inGrayZone(s, N)) {
                continue;
            }
            if (inGreenZone(s, N, playerField)) {
                break;
            }
            if (inVerticalZone(s, N, playerField)) {
                break;
            }
            if (inHorizontalZone(s, N, playerField)) {
                break;
            }
        }
    }
    return true
}

function possiblePositions(s: number) {
    let otherShips = 0;
    for (let t = s; t > 0; t--) {
        otherShips = otherShips + ships[t - 1];
    }
    let totRng = (ships[s] - 1) ** 2 + otherShips + 1;
    let rngArr: number[] = [];
    while (rngArr.length < totRng) {
        let rngN = Math.floor(
            Math.random() * (store.xAxis! * store.yAxis!),
        );
        if (!rngArr.includes(rngN)) rngArr.push(rngN);
    }
    return rngArr;
}

function inGrayZone(s: number, N: number) {
    if (
        N >= (store.yAxis! - (ships[s] - 1)) * store.xAxis! &&
        N % store.xAxis! >= store.xAxis! - (ships[s] - 1)
    ) {
        return true;
    }
    return false;
}

function inGreenZone(s: number, N: number, playerField: number[]) {
    if (
        N < (store.yAxis! - (ships[s] - 1)) * store.xAxis! &&
        N % store.xAxis! < store.xAxis! - (ships[s] - 1)
    ) {
        let shipOrient = Math.floor(Math.random() * 2) % 2;
        if (shipOrient == 0) {
            if (tryHorizontal(N, s, playerField)) return true;
            if (tryVertical(N, s, playerField)) return true;
        } else {
            if (tryVertical(N, s, playerField)) return true;
            if (tryHorizontal(N, s, playerField)) return true;
        }
    }
    return false;
}

function inHorizontalZone(s: number, N: number, playerField: number[]) {
    if (
        N >= (store.yAxis! - (ships[s] - 1)) * store.xAxis! &&
        N % store.xAxis! < store.xAxis! - (ships[s] - 1)
    ) {
        if (tryHorizontal(N, s, playerField)) return true;
    }
    return false;
}

function inVerticalZone(s: number, N: number, playerField: number[]) {
    if (
        N < (store.yAxis! - (ships[s] - 1)) * store.xAxis! &&
        N % store.xAxis! >= store.xAxis! - (ships[s] - 1)
    ) {
        if (tryVertical(N, s, playerField)) return true;
    }
    return false;
}

function isFree(N: number, playerField: number[]) {
    if (playerField[N] == 0) {
        return true;
    }
    return false;
}

function tryHorizontal(N: number, s: number, playerField: number[]) {
    for (let j = 0; j < ships[s]; j++) {
        if (!isFree(N + j, playerField)) return false;
    }

    for (let z = 0; z < ships[s]; z++) {
        playerField[N + z] = ships[s];
    }
    return true;
}

function tryVertical(N: number, s: number, playerField: number[]) {
    for (let j = 0; j < ships[s]; j++) {
        if (!isFree(N + store.xAxis! * j, playerField)) return false;
    }

    for (let z = 0; z < ships[s]; z++) {
        playerField[N + store.xAxis! * z] = ships[s];
    }
    return true;
}
