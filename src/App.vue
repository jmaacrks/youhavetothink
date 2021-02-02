<template>
  <v-app>
    <v-container justify-center>
      <v-banner
      elevation="10"
      dark
      outlined
      rounded
      color= "cyan lighten-1"
      min-height=50
      >
      <h1 class= "text-button" align="center">YOU HAVE TO TH.INK</h1>
      </v-banner>
      
  </v-container>
    <br>
    <v-main>
      <v-container v-if="!finish">
        <input-form 
          @correct-pw="startGame"
          :answer="ans[stage]"
          :question="questions[stage]"
          :hint="hints[stage]"
        />
        <v-container v-if="stage > 0">
          <timer
            @time-up="timeUp"
            />
         </v-container>
        
        </v-container>

        <v-container v-else>
        <h1 class="overline-xl" align="center">
          You Got Through {{stage}} Questions!
          </h1>
          </v-container>
      
    </v-main>
    <!-- <v-container justify-center>
    <v-btn
          elevation=5
          color="cyan lighten-1"
          large
          class="mr-4"
    @click="stopSound(this.currentSong)"
    >
    Pause Music
    </v-btn>
    </v-container> -->
  </v-app>
</template>

<script>
const lobby = require("@/assets/lobby.mp3");
const game =require("@/assets/game.mp3");
const woosh=require("@/assets/woosh.wav");
import InputForm from '@/components/InputForm.vue'
import Timer from '@/components/Timer.vue'
export default {
  name: 'app',
  data: () => ({
    stage: 0,
    ans: ["Chocolate", "13","Djibouti","Appa","43.4, 110.7", "2009", "Comoros", "Papagei", "1911196", "Valiant Lady"],
    questions: ["Password", "What is the Square Root of 169","Capital of Djibouti", "Avatar Aangs Sky Bison",  "What are the Coordinates of Jackson, Wyoming ", "What Year Did Rihanna Release 'Rude Boy'?", "Small Island Nation inbetween Madagascar and Mozambique beggining with the Letter 'C'", "ببغاء في اللغة الألمانية", "Distance from Earth to the Moon in Furlongs", "American Soap Opera premiering October 12th, 1953",  ],
    hints:["Today's Password","Whole Number", "Name of City", "One Word", "Format: 00.0, 00.0", "2XXX", "One Word", "Hint: Translate", "Round to Whole Number", "Two Words"],
    finish: false,
    lobbyMusic: new Audio(lobby),
    gameMusic: new Audio(game),
    currentSong: new Audio(lobby),
    wooshTrans: new Audio(woosh),
  }),
  components: {
    InputForm,
    Timer,
  },
  mounted () {
      this.playSound(this.lobbyMusic);
      this.currentSong = this.lobbyMusic;
      this.lobbyMusic.loop = true;
      this.gameMusic.loop = true;
      this.currentSong.loop = true;
  },
  methods: {
    startGame(){
      this.stage = this.stage + 1
      if (this.stage < 2) {
      this.stopSound(this.lobbyMusic)
      this.playSound(this.wooshTrans)
      setTimeout(() =>  {
        this.playSound(this.gameMusic);
      },1500)
      this.currentSong = this.gameMusic
      }
    },
    timeUp(){
      this.finish=!this.finish
      this.stopSound(this.gameMusic)
      this.playSound(this.wooshTrans)
      setTimeout(() =>  {
      this.playSound(this.lobbyMusic);
      },1500)
      this.currentSong = this.lobbyMusic
    },
    playSound (sound) {
      if(sound) {
        var audio = sound;
        audio.play();
      }
    },
      stopSound (sound) {
      if(sound) {
        var audio = sound;
        audio.pause();
      }
    }
  }
  }
</script>
<style>