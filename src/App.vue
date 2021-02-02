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
            @tick-clock="tickClock"
            />
         </v-container>
        </v-container>

        <v-container v-else-if="!tooFast&&finish">
        <h1 class="overline-xl" align="center">
          You Got Through {{stage}} Questions!
          </h1>
          </v-container>
        <v-container v-else-if="tooFast&&finish">
          <h1 class="overline-xl" align="center">
          Wow! You Got Through All The Questions in {{minutes}}:{{seconds}}!
          </h1>
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
export default {
  name: 'app',
  data: () => ({
    stage: 0,
    ans: ["Chocolate", "13","Djibouti","Appa","32","Vici","43.5, 110.8", "2009", "Comoros", "Papagei", "1911200", "Valiant Lady","Hartford Courant","74","Green","H","1865","Ashikaga Yoshimasa","186","Buddhism"],
    
    questions: ["Password", "Square Root of 169","Capital of Djibouti", "Avatar Aangs Sky Bison", "Number of Level in Original Super Mario Bros", "Veni, Vidi, ...", "Coordinates of Jackson, Wyoming ", "Year Rihanna Released 'Rude Boy'", "Small Island Nation inbetween Madagascar and Mozambique beggining with the Letter 'C'",
     "كلمة ألمانية للببغاء", "Distance from Earth to the Moon in Furlongs", "American Soap Opera Premiering October 12th, 1953","4f6c6465737420436f6e74696e756f75736c79205075626c6973686564204e657773706170657220696e20746865205553","Number day of the Ides of March in Roman Calendar","Central Color of Kenyan Flag on the day of JFKs Assassination","Predominent Element in Atmosphere of Eigth Planet from the Sun",
     "Year that the School, the Architect of the Eifel Tower, Graduated From was Founded","Japanese Shogun the Year of The Fall of the Byzantine Empire","Time Between end of American Revolution and American Moon Landing","State Religion Declared by China in the Year Equal to the Number of Stairs in Qutub Minar"],

    hints:["Today's Password","Whole Number", "Name of City", "One Word", "Number","Finish the Sequence", "Format: 00.0, 00.0 Rounding Up", "2XXX", "One Word", "Hint: Translate", "Convert Miles -> Furlongs Round to Hundreds", "Two Words","Triple Click Hex to ASCII","2-Digit Number","Name of Color","Atomic Symbol","4-Digit Year","The Shogun, NOT the Emporer","In Years","Year is in Common Era"],
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
      if(this.stage == this.questions.length){
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