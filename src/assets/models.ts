export class battleShip  {

    player1? : string|undefined;
    player2? : string|undefined;
    xAxis? : number|undefined;
    yAxis? : number|undefined;
    fireArr? : number[]|undefined;
    readyToPlay? : boolean
    lastOperation?: string|undefined;
    message?: string|undefined;

    constructor() {
        this.player1 = 'Player 1';
        this.player2 = 'Player 2';
        this.xAxis = undefined;
        this.yAxis = undefined;
        this.fireArr = undefined;
        this.readyToPlay = false
        this.lastOperation = undefined;
        this.message = undefined
    }
  }

  export class playerInfo{
    score: number;
    bestStreak: number;
    lastTurnStreak: number;
    currentStreak: number;
    duplicates:dupli;

    constructor(){
        this.score = 0;
        this.bestStreak = 0;
        this.lastTurnStreak = 0;
        this.currentStreak = 0;
        this.duplicates = {}
    }
  }

  type dupli = {
    [key:string]:number
  }