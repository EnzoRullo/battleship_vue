<script lang="ts">
import { battleShip } from '@/assets/models';
import { useBattleshipStore } from '@/stores/battleship';


export default {
    data() {
        const store = useBattleshipStore();
        const theSub = store.$subscribe;
        return {
            store,
            theSub,
            storeData: new battleShip(),
        }
    },props: {
        field: Array<number>
    },
    watch: {

    },
    computed: {
        width() { return (100 / this.storeData.xAxis!) - 0.5 },
        height() { return ((100 / this.storeData.xAxis!) / 3) - 0.5 },
        style() { return `width: ${this.width}%; height: ${this.height}vw;font-size: ${this.height - 1}vw;` }
    },
    methods: {
        boxValue(n: number) {
            let v = n
            if (n > 5) {
                v = n - 6
            }
            if (v > 0) {
                return v
            }
            return '\xa0'
        },
        classAsign(n: number) {
            if (n == 0) {
                return 'water'
            } else if (n > 0 && n < 6) {
                return 'ship'
            } else if (n == 6) {
                return 'waterHit'
            } else {
                return 'shipHit'
            }
        },
        xAx(i: number) {
            if (i < this.storeData.xAxis!) {
                return i + 1
            }
            return '\xa0'
        },
        yAx(i: number) {
            if (i % this.storeData.xAxis! == 0) {
                return String.fromCharCode('A'.charCodeAt(0) + (i / this.storeData.xAxis!))
            }
            return '\xa0'
        }

    },
    created() {
        this.storeData = this.store.gameInfo
    }
}
</script>

<template>
    <div class="bigFieldContainer">
        <div class="fieldContainer">
            <div v-for="b in field" class="box" :class="classAsign(b)" :style="style">{{ boxValue(b) }}</div>
        </div>
        <div class="fieldContainer">
            <div v-for="(b,i) in field" class="box xAxisBox" :style="style">{{ xAx(i) }}</div>
        </div>
        <div class="fieldContainer">
            <div v-for="(b,i) in field" class="box yAxisBox" :style="style">{{ yAx(i) }}</div>
        </div>
    </div>
</template>

<style>
.bigFieldContainer {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
}

.fieldContainer {
    grid-area: 1 / 1 / 1 / 1;
    height: fit-content;
}

.box {
    display: inline-block;
    margin: 0.25%;
    border-radius: 7%;
    text-align: center;
    background-color: blanchedalmond;
}

.xAxisBox {
    background-color: transparent;
    transform: translateY(-100%);
    color: rgb(105, 105, 105);

}

.yAxisBox {
    background-color: transparent;
    transform: translateX(-100%);
    color: rgb(105, 105, 105);
}

.water {
    background-color: lightblue;
    border: 0.1% cyan;
}

.waterHit {
    background-color: royalblue;
    border: 0.1% blue;
}

.ship {
    background-color: darkgrey;
    border: 0.1% gray;
}

.shipHit {
    background-color: tomato;
    border: 0.1% red;

}
</style>
