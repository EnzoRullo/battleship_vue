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
        field: Array<number>
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
        <div class="row">
            <div class="col-7">Score:</div>
            <div class="col-auto">{{ player.score }}</div>
            <hr>
        </div>
        <div class="row">
            <div class="col-7">Best hit streak:</div>
            <div class="col-auto">{{ player.bestStreak }} at {{ player.lastTurnStreak }}
                turn
            </div>
            <hr>
        </div>
        <div class="row">
            <div class="col-7">Ship boxes not hit:</div>
            <div class="col-auto">{{ notHit }}</div>
            <hr>
        </div>
        <div class="row">
            <div class="col-7">Water boxes not hit:</div>
            <div class="col-auto">{{ waterNotHit }}</div>
            <hr>
        </div>

        <div class="row">
            <div class="text-center col mb-2">Duplicates</div>
            <hr />
        </div>

        <div class="row m-1">
            <div class="col-6 text-center" v-for="[key, times] in duplicates">
                <div>{{key}} : {{times}} times</div>
            </div>
        </div>
    </div>

</template>