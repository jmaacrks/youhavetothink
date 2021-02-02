<template>
<div 
style= "padding: 15px 25px">
    <v-progress-linear
      color="cyan lighten-1"
      :value= this.timerCount
      reverse
      height= 80
      rounded
      striped
      bottom
    ></v-progress-linear>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                timerCount: 100,
                seconds: 600,
            }
        
        },
        watch: {

            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount= this.timerCount - (1/this.seconds);
                            
                        }, 10);
                        
                    } else { 
                   this.$emit('time-up')
                    }

                },
                immediate: true, // This ensures the watcher is triggered upon creation
            }

        }
    }
      

</script>