import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { battleShip } from '@/assets/models'

let initStore = new battleShip

export const useBattleshipStore = defineStore('store', {
    state: () => {
        return { 
            gameInfo: {...initStore}
        }
    },
    actions: {
        numberGenApi(max: number) {
            updateStore({lastOperation : 'CALL RandomNumGen [REQUEST]'});
            console.log('numberGenApi call')
            fetch(`http://www.randomnumberapi.com/api/v1.0/random?min=0&max=${max}&count=100`)
            .then(res => {
              if (!res.ok){
                updateStore({
                  lastOperation : 'CALL RandomNumGen [FAILURE]',
                  message : `Error ${res.status}`
                })
                throw new Error('Network error');
              } else {
                updateStore({
                  lastOperation : 'CALL RandomNumGen [SUCCESS]',
                  message : `Status ${res.status}`
                })
        
                return res.json()
              }
            })
            .then(data => {
              updateStore({lastOperation : 'UPDATE FireArr [REQUEST]'})
              if (Array.isArray(data) && !data.some(isNaN) && data.length%2 == 0){
                updateStore({
                  fireArr: [...data],
                  lastOperation: 'UPDATE FireArr [SUCCESS]',
                })
              } else {
                  updateStore({
                    lastOperation: 'UPDATE FireArr [FAILURE]',
                    message: 'Invalid Data'
                  })
                  throw new Error('Data error');
              }
            })
            .catch( err => console.log(err)); 
          },
            fullReset(){
                updateStore({
                  ...initStore,
                  lastOperation : 'RESET FullReset [SUCCESS]',
                  message : 'All data has been reset'
                })
               
            },
            newGame(){
                updateStore({
                  fireArr : undefined,
                  readyToPlay : true,
                  lastOperation : 'RESET NewGame [SUCCESS]',
                  message : 'Previous Game data has been reset'
                })
                
            },
            initGame(p1:string,p2:string,x:number,y:number){
                updateStore({
                    player1: p1,
                    player2: p2,
                    xAxis : x,
                    yAxis : y,
                    readyToPlay : true,
                    lastOperation: 'SET NewGame [SUCCES]'
                  })
            }
    } 
})

function updateStore(newValue: battleShip){
    useBattleshipStore().$patch({
        gameInfo:{...newValue}
    })
    //   
  } 

// export const useCounterStore = defineStore('store', () => {
//   const store = ref(initStore)
//   //const doubleCount = computed(() => count.value * 2)
//   /* function increment() {
//     count.value++
//   } */

//   function numberGenApi(max: number) {
//     this.gameInfo.lastOperation= 'CALL RandomNumGen [REQUEST]';
//     fetch(`http://www.randomnumberapi.com/api/v1.0/random?min=0&max=${max}&count=100`)
//       .then(res => {
//         if (!res.ok) {
//           this.gameInfo.lastOperation= 'CALL RandomNumGen [FAILURE]';
//           this.gameInfo.message= `Error ${res.status}`
          
//           throw new Error('Network error');
//         } else {
//           this.gameInfo.lastOperation = 'CALL RandomNumGen [SUCCESS]';
//           this.gameInfo.message = `Status ${res.status}`;
          
//           return res.json()
//         }
//       })
//       .then(data => {
//         this.gameInfo.lastOperation = 'UPDATE FireArr [REQUEST]';
//         if (Array.isArray(data) && !data.some(isNaN) && data.length % 2 == 0) {
//           this.gameInfo.fireArr = [...data];
//           this.gameInfo.lastOperation = 'UPDATE FireArr [SUCCESS]';
//         } else {
//           this.gameInfo.lastOperation = 'UPDATE FireArr [FAILURE]';
//           this.gameInfo.message = 'Invalid Data'
//           throw new Error('Data error');
//         }
//       })
//       .catch(err => console.log(err));
//   }

//   function fullReset(){
//     this.gameInfo = initStore;
//     this.gameInfo.lastOperation = 'RESET FullReset [SUCCESS]';
//     this.gameInfo.message = 'All data has been reset'
//   }

//   function newGame(): void{
//     this.gameInfo.fireArr = undefined;
//     this.gameInfo.readyToPlay = true;
//     this.gameInfo.lastOperation = 'RESET NewGame [SUCCESS]';
//     this.gameInfo.message = 'Previous Game data has been reset';
//   }

//   function initGame(p1:string,p2:string,x:number,y:number){
//     this.gameInfo.player1 = p1;
//     this.gameInfo.player2 = p2;
//     this.gameInfo.xAxis = x;
//     this.gameInfo.yAxis = y;
//     this.gameInfo.readyToPlay = true;
//     this.gameInfo.lastOperation = 'SET NewGame [SUCCES]'
//   }

//   return { store, numberGenApi, fullReset, newGame, initGame }
// })
