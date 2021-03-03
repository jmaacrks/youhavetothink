<template>
  <!-- <v-app id=input-form>
    <v-main> -->
      
      <v-form
        ref="form"
        v-model="valid"
        @submit= "validate()"
        onSubmit="return false;"

      >
      <div>
        <v-layout justify-center>
        <h1 class="overline-xl"> {{this.questions.prompt}}  </h1>
        </v-layout>
        <br>
       
        <v-layout justify-center>
          <v-tooltip
          v-model="show"
          :color = this.toolTipTheme
          elevation= 5
          close-delay= 1500
        >
        <span>{{tooltip}}</span>
        </v-tooltip>
        </v-layout>
        <v-text-field
          v-model="word"
          :hint= this.questions.hint
          background-color= "#9575"
          persistent-hint
          >
          </v-text-field>
    <v-layout justify-center>
      <v-btn
          elevation=5
          color="cyan lighten-1"
          large
          class="mr-4"
          @click="validate()"
          >
          Submit
          </v-btn>
          <v-btn
          elevation=5
          color="cyan lighten-1"
          large
          class="mr-4"
          @click="skip()"
          >
          Skip! ({{skips}})
          </v-btn>
          <br>
      </v-layout>
      <div>
            <v-snackbar
            v-model="right"
            app
            color="green accent-2"
            elevation= 5
            rounded
            :timemout="timeout"
            >
            <h1 class="overline-xl" align="center"> {{this.continue}} </h1>
            </v-snackbar>
          </div>
            <div>
              <v-snackbar
              v-model="wrong"
            app
            color="orange darken-4"
            elevation= 5
            rounded
            :timemout="timeout"
            >
            <h1 class="overline-xl" align="center"> {{this.stay}} </h1>
            </v-snackbar>
            </div>
           </div>
          
<br>
        </v-form>
      <!-- </v-main>
    </v-app> -->
</template>
<script>
const success = require("@/assets/success.wav");
const incorrect =require("@/assets/incorrect.mp3")
const newSkip=require("@/assets/newSkip.wav")
const regex = /[!"#$%&'()*+, -./:;<=>?@[\]^_`{|}~]/g;
  export default {
    name: 'input-form',
    props: {
      questions: Object,
      stage: Number,
    },
    data: () => ({
      valid: false,
      name: '',
      word: '',
      wrong: '',
      right: '',
      timeout: 2000,
      success: '',
      incorrect: '',
      skips: 0,
      stay:'',
      continue:'',
      returnQ:'',
      streak:0,
      show: false,
      returnA:'',
      tooltip: '',
      toolTipTheme:'',
      
    }),
    methods: {
      validate(){
        if(this.word.toUpperCase().replace(regex, '') == this.questions.answer.toUpperCase().replace(regex,'')){
          this.$emit('correct-pw', 1)
          this.continue = "Correct!"
          this.right = true
          this.word = ''
          if(this.streak<5){
          this.playSound(success)
          }
          this.streak++
        } else {
          this.stay="Incorrect!"
          this.wrong = true
          this.word= null
          this.playSound(incorrect)
        }
        if(this.streak>4){
          this.skips++;
          this.tooltip = '5 Streak! +1 Skip!';
          this.toolTipTheme = 'green accent-2';
          this.show=true;
          this.playSound(newSkip);
          this.streak=0;
          setTimeout((() => {
            this.show=false;
          }),1500)
          }
      },
      playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
      },
      skip(){
        if(this.skips>0 && this.stage>0 && this.stage!=20){
        this.returnQ = this.questions.prompt;
        this.returnA = this.questions.answer;
        this.$emit('skip',this.returnQ,this.returnA);
        this.$emit('correct-pw',1);
        this.continue = "Skipped!";
        this.right = true;
        this.word = '';
        this.playSound(success);
        this.skips--;
        this.streak=0;
        this.$root.$emit('skipped',.0025);
        this.tooltip = '-30 Seconds!';
        this.toolTipTheme = 'red accent-2';
        this.show= true;
        setTimeout((() => {
            this.show=false;
          }),1500)
        }else {
          if(this.stage==20){
            this.stay="Can't Skip Last Prompt!";
          }
          else if(this.stage>0){
            this.stay="Out of Skips";
          }else{
            this.stay="Can't Skip Password!";
          }
        this.wrong = true;
        this.word= null;
        this.playSound(incorrect);
        }
      }
    }
  }

</script>