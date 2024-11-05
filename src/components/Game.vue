<script lang="ts">
import { gamePlay, getTurn } from '@/assets/fire';
import { battleShip, playerInfo } from '@/assets/models';
import { shipPlacing } from '@/assets/placing';
import { useBattleshipStore } from '@/stores/battleship';
import Field from './Field.vue';
import GameOver from './GameOver.vue';


export default {
    data() {
        const store = useBattleshipStore();
        const storeSub = store.$subscribe;

        const ships = [5, 4, 3, 2, 1]; //lengths of each ship
        let playersReady: number = 0;
        let fieldP1: number[] = [];
        let fieldP2: number[] = [];
        let turns: number = 0;
        let p1FireArr: number[] = [];
        let p2FireArr: number[] = [];

        let gameOver = false;
        return {
            store,
            storeSub,
            storeData: new battleShip(),
            ships,
            playersReady,
            fieldP1,
            fieldP2,
            turns,
            p1FireArr,
            p2FireArr,
            p1Obj: new playerInfo(),
            p2Obj: new playerInfo(),
            gameOver
        }
    },
    watch: {
        storeData() {
            this.storeInterceptor()
        }
    },
    methods: {
        placing() {
            if (this.storeData.readyToPlay) {
                this.reset();
                if (shipPlacing(this.fieldP1, this.ships, this.storeData)) ++this.playersReady;
                if (shipPlacing(this.fieldP2, this.ships, this.storeData)) ++this.playersReady;

                if (this.playersReady == 2) {
                    this.store.numberGenApi(this.storeData.xAxis! * this.storeData.yAxis!);
                } else {
                    console.log("players not ready", this.playersReady);
                }
            }
        },
        reset() {
            this.playersReady = 0;
            for (let a = 0; a < this.storeData.xAxis! * this.storeData.yAxis!; ++a) {
                this.fieldP1[a] = 0;
            }
            for (let a = 0; a < this.storeData.xAxis! * this.storeData.yAxis!; ++a) {
                this.fieldP2[a] = 0;
            }
            this.turns = 0;
            this.p1FireArr = [];
            this.p2FireArr = [];

            this.p1Obj = new playerInfo();
            this.p2Obj = new playerInfo();

            this.gameOver = false;
        },
        storeInterceptor() {
            if (
                this.storeData.lastOperation === "UPDATE FireArr [SUCCESS]" &&
                this.playersReady == 2
            ) {
                this.p1FireArr = [];
                this.p2FireArr = [];
                this.p1FireArr = this.storeData.fireArr!.slice(0, this.storeData.fireArr!.length / 2);
                this.p2FireArr = this.storeData.fireArr!.slice(this.storeData.fireArr!.length / 2);
                if (
                    gamePlay(
                        this.fieldP1,
                        this.fieldP2,
                        this.p1Obj,
                        this.p2Obj,
                        this.p1FireArr,
                        this.p2FireArr,
                        this.turns,
                        this.ships,
                        this.storeData,
                    ) == "GameOver"
                ) {
                    this.gameOver = true;
                    this.turns = getTurn();
                    this.p1Obj = { ...this.p1Obj };
                    this.fieldP1 = [...this.fieldP1];
                    this.p2Obj = { ...this.p2Obj };
                    this.fieldP2 = [...this.fieldP2];
                } else {
                    this.turns = getTurn();
                    this.store.numberGenApi(this.storeData.xAxis! * this.storeData.yAxis!);
                }
            }
            if (this.storeData.lastOperation === "RESET NewGame [SUCCESS]") {
                this.placing();
            }
            if (this.storeData.lastOperation === 'RESET FullReset [SUCCESS]') {
                this.$router.push({ name: 'home' })
            }
        },
        newGame() {
            this.store.newGame();
        },
        goHome() {
            this.store.fullReset()
        }
    },
    created() {
        this.storeSub(() => {
            this.storeData = { ...this.store.gameInfo };
        })
    },
    mounted() {
        this.storeData = this.store.gameInfo;
        this.placing()
    },
    components: {
        Field,
        GameOver
    }
}
</script>

<template>
    <div class="bigContainer">
        <h2 class="playerName1">{{ storeData.player1 }}</h2>
        <h2 class="playerName2">{{ storeData.player2 }}</h2>
        <div class="fieldContainer p1">
            <Field :field="fieldP1" />
        </div>
        <div class="fieldContainer p2">
            <Field :field="fieldP2" />
        </div>
    </div>

    <div v-if="gameOver">
        <h1 class="text-center">
            Game Over
            <span v-if="p1Obj.score > p2Obj.score">
                {{ storeData.player1 }} win!</span>
            <span v-else-if="p1Obj.score < p2Obj.score">
                {{ storeData.player2 }} win! </span>
            <span v-else>we have no winners...</span>
        </h1>
        <div class="buttonContainer m-4">
            <button class="btn btn-primary p-3" @click="newGame"> New game </button>
            <button class="btn btn-primary p-3" @click="goHome"> Home </button>
        </div>
        <h3 class="text-center">Game finish in {{ turns }} turns</h3>
        <div class="bigContainer">
            <div class="p1 card p-4">
                <GameOver :field="fieldP1" :player="p1Obj" />
            </div>
            <div class="p2 card p-4">
                <GameOver :field="fieldP2" :player="p2Obj" />
            </div>
        </div>
    </div>
    <div v-else class="text-center">
        <div class="spinner-border text-primary" style="width: 10rem; height: 10rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<style>
.bigContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    height: fit-content;
    margin-top: 25px;
    margin-bottom: 25px;
}

.playerName1 {
    grid-column: 1;
    justify-self: center;
    margin: 0;
    height: 10vw;
}

.playerName2 {
    grid-column: 3;
    justify-self: center;
    margin: 0;
    height: 10vw;
}

.fieldContainer {
    display: inline-block;
}

.p1 {
    grid-area: 2 / 1 / 2 / 1;
    transform: translate(33%);
    height: fit-content;
}

.p2 {
    grid-area: 2 / 3 / 2 / 3;
    transform: translate(-23%);
    height: fit-content;
}

.buttonContainer {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
