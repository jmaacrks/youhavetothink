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
        <h1 class="overline-xl">{{question}}  </h1>
        </v-layout>
        <br>
       
      <v-container>
        <v-text-field
          v-model="word"
          :hint= this.hint
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
          </v-layout>
          <br>
      <div>
            <v-snackbar
            v-model="right"
            app
            color="green accent-2"
            elevation= 5
            rounded
            :timemout="timeout"
            >
            <h1 class="overline-xl" align="center"> Correct! </h1>
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
            <h1 class="overline-xl" align="center"> Incorrect! </h1>
            </v-snackbar>
            </div>
          </v-container>
           </div>
          
<br>
        </v-form>
      <!-- </v-main>
    </v-app> -->
</template>
<script>
const success = require("@/assets/success.wav");
const incorrect =require("@/assets/incorrect.mp3")
const regex = /[!"#$%&'()*+, -./:;<=>?@[\]^_`{|}~]/g;
  export default {
    name: 'input-form',
    props: {
      answer: String,
      question: String,
      hint: String,
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
      
    }),
    methods: {
      validate(){
        if(this.word.toUpperCase().replace(regex, '') == this.answer.toUpperCase().replace(regex,'')){
          this.$emit('correct-pw', 1)
          this.right = true
          this.word = ''
          this.playSound(success)
        } else {
          this.wrong = true
          this.word= null
          this.playSound(incorrect)
        }
      },
      playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
      },
    computed: {
      Rules: function() {
        return [v => v == this.answer]
      }
    }
    }
  }

</script>