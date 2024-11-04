<script lang="ts">
import { playerInfo } from '@/assets/models';


export default {
    data() {
        return {
            duplicates: {}
        }
    },
    props: {
        player: new playerInfo(),
        field: Array < number >
        },
    computed: {
        notHit() {
            let notHit = 0;
            if (this.field) {
                for (const el of this.field) {
                    if (el > 0 && el < 6) ++notHit;
                }
                return notHit;
            }
        },
        waterNotHit(field: number[]) {
            let notHit = 0;
            if (this.field) {
                for (const el of this.field) {
                    if (el == 0) ++notHit;
                }
                return notHit;
            }
        }
    },
    beforeMount() {
        if (this.player) {
            this.duplicates = Object.entries(this.player.duplicates).sort(([, a], [, b]) => b - a)
        }
    },
}
</script>

<template>
    <div v-if="player">
        <ul>
            <li>Score: {{ player.score }}</li>
            <li>
                Best hit streak: <br>{{ player.bestStreak }} at {{ player.lastTurnStreak }}
                turn
            </li>
            <li>Ship boxes not hit: {{ notHit }}</li>
            <li>Water boxes not hit:{{ waterNotHit }}</li>
            <li>Duplicates coordinates:</li>
            <li v-for="[key,times] in duplicates">{{ key }} : {{ times }} times</li>
        </ul>
    </div>
</template>

<style>
li {
    list-style: none;
    text-align: center;
}
</style>