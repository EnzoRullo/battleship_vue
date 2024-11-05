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
            yAxis: 0,
            invalid: false
        }
    },
    watch: {
        storeData() {
            this.storeInterceptor()
        },

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
                this.invalid = false;
                this.store.initGame(this.p1, this.p2, this.xAxis, this.yAxis);
            } else {
                this.invalid = true;
                return;
            }
        },
        storeInterceptor() {
            if (this.storeData.lastOperation === 'SET NewGame [SUCCES]') {
                this.$router.push('/game')
            }
        }
    },
    mounted() {
        this.storeSub(() => {
            this.storeData = { ...this.store.gameInfo }
        })
        this.store.gameInfo.player1 ? this.p1 = this.store.gameInfo.player1 : this.p1 = "";
        this.store.gameInfo.player2 ? this.p2 = this.store.gameInfo.player2 : this.p2 = "";
        this.store.gameInfo.xAxis ? this.xAxis = this.store.gameInfo.xAxis : this.xAxis = 0;
        this.store.gameInfo.yAxis ? this.yAxis = this.store.gameInfo.yAxis : this.yAxis = 0;
    }
}
</script>

<template>
    <h1 class="text-center p-4">The automatic Battleship game</h1>
    <p class="text-center m-0">Insert player Names and field measurements</p>


    <form class="container homeContainer" @submit.prevent="confirm">
        <div class="form-floating row p-2">
            <input name="Player1" type="text" class="form-control col" placeholder="name" v-model="p1" />
            <label for="Player1">Player 1</label>
        </div>
        <div class="form-floating row p-2">
            <input name="Player2" type="text" class="form-control col" placeholder="name" v-model="p2" />
            <label for="Player2">Player 2</label>
        </div>
        <div class="row p-1">
            <div class="form-floating col p-1">
                <input name="X" type="number" class="form-control" placeholder="x" v-model="xAxis" />
                <label for="X">X axis</label>
            </div>
            <div class="form-floating col p-1">
                <input name="Y" type="number" class="form-control" placeholder="y" v-model="yAxis" />
                <label for="Y">Y axis</label>
            </div>
        </div>
        <div class="row p-2">
            <button type="submit" class="btn btn-primary p-2">CONFIRM</button>
        </div>
        <div class="alert alert-danger" v-if="invalid">
            • Names must be at least 3 characters<br>
            • Axes (X,Y) must be min 4 and max 27
        </div>
    </form>

</template>

<style>
.homeContainer {
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5%; */

    width: 33%;
    margin: 0 auto;
}
</style>