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
          @skip="skipped"
          @wrong="wrongAnser"
          :questions = stages[this.stage]
          :stage= this.stage
        />
        <v-container v-if="stage > 0">
          <timer
            @time-up="timeUp"
            @tick-clock="tickClock"
            />
         </v-container>
        </v-container>

        <v-container justify-center v-else-if="!tooFast&&finish">
        <h1 class="overline-xl" align="center">
          You Got Through {{stage}} Questions! You Got {{score}}pts!
          </h1>
          <br>
          <h1 class="overline-xl" align="center" v-if="this.skippedCount>0">
            You Skipped These Questions:
            </h1>
          <br>
          <h3 class="overline-xl" align="center" v-if="this.skippedCount>0">
            {{skippedQuestions}}
            </h3>
          <h1 class="overline-xl" align="center" v-if="this.skippedCount>0">
            These Are the Answers to the Skipped Questions:
          </h1>
          <br>
          <h3 class="overline-xl" align="center" v-if="this.skippedCount>0">
            {{skippedAnswers}}
            </h3>
          <br>

          <h1 class="overline-xl" align="center">
          The Last Question You Got To Was:
          </h1>
          <h3 class="overline-xl" align="center">
          {{stages[this.stage].prompt}}
          </h3>
          <h1 class="overline-xl" align="center">
          And the Answer Was:
          </h1>
          <h3 class="overline-xl" align="center">
          {{stages[this.stage].answer}}
          </h3>
          </v-container>
        <v-container v-else-if="tooFast&&finish">
          <h1 class="overline-xl" align="center">
          Wow! You Got Through All The Questions in {{minutes}}:{{seconds}}! Your Got {{score}}pts!
          </h1>
          <h1 class="overline-xl" align="center" v-if="this.skippedCount>0">
            You Skipped These Questions:
          </h1>
          <h3 class="overline-xl" align="center" v-if="this.skippedCount>0">
            {{skippedQuestions}}
          </h3>
          <h1 class="overline-xl" align="center" v-if="this.skippedCount>0">
            These Are the Answers to the Skipped Questions:
          </h1>
          <br>
          <h3 class="overline-xl" align="center" v-if="this.skippedCount>0">
            {{skippedAnswers}}
            </h3>
          </v-container>
    
    
    </v-main>
    <v-container>
      <v-alert
      :value="alert"
      dense
      type="info"
      icon="mdi-arrow-down-bold"
      dismissible
      roundable
      max-width="250"
      max-height="150"
      transition="scale-transition"
      color="cyan lighten-1"
    >
      Unmute Music!
    </v-alert>
      <v-container justify-left v-if="isMuted">
            <v-btn 
              large
              icon
              color="cyan lighten-1"
              @click="toggleMute(); alert=false;"  
              @touch="toggleMute(); alert=false;"  
            >
              <v-icon>mdi-music-note-off-outline</v-icon>
            </v-btn>
    </v-container>
    <v-container v-if="!isMuted">
    <v-btn
              large
              icon
              color="cyan lighten-1"
              @click="toggleMute"
              @touch="toggleMute"
            >
              <v-icon>mdi-music-note-outline</v-icon>
            </v-btn>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
const lobby = require("@/assets/lobby.mp3");
const game =require("@/assets/game.mp3");
const woosh=require("@/assets/woosh.wav");
import InputForm from '@/components/InputForm.vue'
import Timer from '@/components/Timer.vue'
import stages from '@/assets/prompts.json'
export default {
  name: 'app',
  data: () => ({
    stage: 0,
    stages,
    finish: false,
    lobbyMusic: new Audio(lobby),
    gameMusic: new Audio(game),
    currentSong: new Audio(lobby),
    wooshTrans: new Audio(woosh),
    isMuted: true,
    timeOut: 2000,
    alert: true,
    tooFast: false,
    currentTime: 0,
    minutes: 0,
    seconds: 0,
    skippedCount:0,
    skippedQuestions:'',
    skippedAnswers:'',
    score:'',
  }),
  components: {
    InputForm,
    Timer,
  },
  methods: {
    startGame(){
      this.stage = this.stage + 1
     
        if (this.stage < 2) {
            if(!this.isMuted){
            this.stopSound(this.lobbyMusic)
            this.playSound(this.wooshTrans)
              setTimeout(() =>  {
              this.playSound(this.gameMusic);
            },1500)
          }
          this.currentSong = this.gameMusic
          }
            if(this.stage == this.stages.length){
              this.finish= true;
              this.tooFast=true;
          }
      },
    timeUp(){
      this.finish=!this.finish
      if(!this.isMuted){
      this.stopSound(this.gameMusic)
      this.playSound(this.wooshTrans)
      setTimeout(() =>  {
      this.playSound(this.lobbyMusic);
      },1500)
      }
      this.currentSong = this.lobbyMusic
    },
    tickClock(){
      if(!this.finish){
        this.currentTime = this.currentTime + .01;
        this.minutes = Math.floor(this.currentTime/60);
        this.seconds =Math.round( this.currentTime - (this.minutes * 60));
        this.score = Math.round(((this.stage-1)*38) - (this.skippedCount*60) + (600-this.currentTime));
          if(this.score < 0){
            this.score = 0;
          }
      }
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
      },
      toggleMute(){
        if(this.isMuted){
          this.playSound(this.currentSong);
        }
        else{
          this.stopSound(this.currentSong);
        }
        this.isMuted = !this.isMuted;
      },
      skipped(questions, answers){
        this.skippedCount++;
        this.currentTime+30;
        if(this.skippedCount>0 && this.skippedCount<2){
          this.skippedQuestions= this.skippedQuestions + questions;
          this.skippedAnswers= this.skippesAnswers + answers;
        }
        else{
          this.skippedQuestions=this.skippedQuestions + ' & '+ questions;
          this.skippedAnswers=this.skippedAnswers + ' & ' + answers;
        }
      },
      wrongAnser(){
        this.score-=15;
      }
 },
  mounted: function () {
      this.currentSong = this.lobbyMusic;
      this.lobbyMusic.loop = true;
      this.gameMusic.loop = true;
      this.lobbyMusic.volume = .2;
      this.gameMusic.volume = .2;
  }
}
</script>