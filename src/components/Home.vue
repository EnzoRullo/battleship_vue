<script lang="ts">
import { battleShip } from '@/assets/models';
import { useBattleshipStore } from '@/stores/battleship';



export default {
    data() {
        const store = useBattleshipStore();
        const storeSub = store.$subscribe;
        return {
            store,
            storeSub,
            storeData: new battleShip,
            p1: "",
            p2: "",
            xAxis: 0,
            yAxis: 0
        }
    },
    watch: {
        storeData() {
            this.storeInterceptor()
        }
    },
    methods: {
        confirm() {
            if (
                this.p1 &&
                this.p2 &&
                this.xAxis > 4 &&
                this.yAxis > 4 &&
                this.yAxis < 27
            ) {
                this.store.initGame(this.p1, this.p2, this.xAxis, this.yAxis);
            } else {
                alert(
                    "Names must be at least 3 characters and axes (X,Y) must be grater than 4",
                );
                return;
            }
        },
        storeInterceptor(){
            if (this.storeData.lastOperation === 'SET NewGame [SUCCES]') {
                this.$router.push('/game')
            }
        }
    },
    mounted() {
        this.storeSub(() => {
            this.storeData = {...this.store.gameInfo}
        })
        this.store.gameInfo.player1 ? this.p1 = this.store.gameInfo.player1 : this.p1 = "";
        this.store.gameInfo.player2 ? this.p2 = this.store.gameInfo.player2 : this.p2 = "";
        this.store.gameInfo.xAxis ? this.xAxis = this.store.gameInfo.xAxis : this.xAxis = 0;
        this.store.gameInfo.yAxis ? this.yAxis = this.store.gameInfo.yAxis : this.yAxis = 0;
    }
}
</script>

<template>
    <h1 style="text-align: center;">The automatic Battleship game</h1>
    <p style="text-align: center;">Insert player Names and field measurements</p>

    <div class="homeContainer">
        <label for="Player2">Player 1</label>
        <input name="Player2" type="text" v-model="p1" />
        <label for="Player2">Player 2</label>
        <input name="Player2" type="text" v-model="p2" />
        <label for="X">X axis</label>
        <input name="X" type="number" v-model="xAxis" />
        <label for="Y">Y axis</label>
        <input name="Y" type="number" v-model="yAxis" />
        <button @click="confirm()">CONFIRM</button>
    </div>
</template>

<style>
.homeContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 25%;
    gap: 5%;
    margin: 0 auto;
}
</style>