<template>
  <div id="callback">
    <!-- <h2 writeit-animate>Nakijken of ge Fong niet zijt...</h2>
    <h2 v-if="step === 1">Ziet er toch maar louche uit...</h2>
    <h2 v-if="step === 2">Hebt ge drugs op zak?</h2>
    <h2 v-if="step === 3">Allee dan, gewoon nog wat papieren tekenen...</h2>
     -->
    <vue-typed-js
      :strings="[
        'Even nakijken of ge Fong niet zijt...',
        'Hmmm...',
        'Toch eens uw zakken controleren op drugs...',
        '...',
        'Ik ga handschoenen halen voor een rectale controle...',
        'Kan u de broek laten zakken?',
        'En nu eens hoesten a.u.b.',
        'Dit lijkt me in orde',
        'Nog juist de papieren invullen...',
        'Dat gaat wel een tijdje duren...',
        '...',
        '...',
        '...',
        'Ik moet hier altijd bij nadenken',
        'En dan begin ik me dingen af te vragen',
        'Zoals...',
        'Ghoh jah wie ben ik eigenlijk?',
        '...Of...',
        'Wat is het nut van mijn bestaan?',
        'Is dit echt waar ik voor wil leven?',
        '...wat papieren invullen en met mijn vingers in iemands anus koteren?',
        '...',
        'Ik verdien eigenlijk wel beter...',
        '...',
        '...wat doe ik hier zelf?!?',
        'altijd maar stront over mij heen krijgen!!',
        '...WEET GE WAT! FUCK IT! IK BEN ER MEE WEG!',
        'TREKT U PLAN ME DEZE ROMMEL!',
        'CONSTANT FUCKING BIER OVER MIJ MORSEN',
        'EN DAN MET DIE VETTIGE WORSTEN VAN VINGERS OP MIJ RAMMEN',
        'IK HEB OOK GEVOELENS OK!!!!!',
        'WEL NU IS HET GENOEG GEWEEST',
        'SALUT MET DE KOST!',
        '...',
        '...',
        '...',
        '...Allee dan, ik zal u nog rap binnen laten',
        'Maar geen rare fratsen uitsteken e!'
      ]"
      :typeSpeed="50"
      :showCursor="false"
      :smartBackspace="false"
    >
        <h2 class="typing"></h2>
     </vue-typed-js>
     <span class="spacer"></span>
     <div class="spinWrapper">
       <a-spin size="large" />
     </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Callback',
  data () {
    return {
      step: 0
    }
  },
  methods: {
    ...mapActions([
      'oidcSignInCallback'
    ])
  },
  mounted () {
    this.oidcSignInCallback()
      .then((redirectPath) => {
        console.log('redirecting to path', redirectPath)
        this.$router.push(redirectPath)
      })
      .catch((err) => {
        // console.log('Error', err)
        console.error('error etc.', err)
        // this.$router.push('/oidc-callback-error') // Handle errors any way you want
      })
  }
}
</script>
<style>
  #callback {
    height:calc(100vh - 50px);
    display:flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    text-align:center;
  }
  #callback h2 {
    flex-basis: 100%;
    box-sizing:border-box;
    padding:0;
    display:block;
    color:rgb(83, 83, 83);
    font-size: 2rem;
    font-weight: 100;
    margin:0 0 5rem 0;
  }
  #callback .typed-element {
    display:block;
    height:200px;
  }
  #callback .spinWrapper {
    flex-basis: 100%;
  }
  .spacer {
    height:2px;
    display:block;
    width:100%;
  }
</style>
