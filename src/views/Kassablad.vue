<template>
  <div>
    <a-card class="textLeft">
      <h2 v-if="
          visibleComponent === 'naamTapper'
            || visibleComponent === 'activiteit'
            || visibleComponent === 'beginUur'"
      >
        Open de kassa
      </h2>
      <p v-if="visibleComponent === 'naamTapper'
          || visibleComponent === 'activiteit'
          || visibleComponent === 'beginUur'"
      >
        Het formulier zal nu de stappen doorlopen om de kassa te openen
      </p>
      <h2 v-if="visibleComponent === 'showNomination'">Tel de Kassa</h2>
      <p v-if="visibleComponent === 'showNomination'">
        Tel de muntjes en briefjes in de kassa en vul de aantallen in
      </p>
      <h2 v-if="visibleComponent === 'showOverview'">
        Overzicht
      </h2>
      <p v-if="visibleComponent === 'showOverview'">
        Deze tabel toont hoeveel munteenheden er in de kassa aanwezig zijn
      </p>
      <h2 v-if="visibleComponent === 'createKassabladButton' && visibleWrapper !== 'consumpiteWrapper'">
        Open de kassa
      </h2>
      <h2 v-else-if="visibleComponent === 'createKassabladButton' && visibleWrapper === 'consumpiteWrapper'">
        Comsumpties
      </h2>
      <p v-if="visibleComponent === 'createKassabladButton' && visibleWrapper !== 'consumpiteWrapper'">
        {{ this.message }}
      </p>
      <p  v-else-if="visibleComponent === 'createKassabladButton' && visibleWrapper === 'consumpiteWrapper'">
        Vul in wat je deze avond drinkt
      </p>
    </a-card>
    <div class="home">
      <a-card class="card" :title="visibleWrapper === 'consumpiteWrapper' ? '' : ''">
        <KassabladSteps />
        <StartEvening />
        <EndEvening />
        <Consumptieblad />
      </a-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StartEvening from '@/components/StartEvening.vue'
import EndEvening from '@/components/EndEvening.vue'
import Consumptieblad from '@/components/Consumptieblad.vue'
import KassabladSteps from '@/components/Kassablad/KassabladSteps.vue'
import { mapState } from 'vuex'

export default {
  name: 'Kassablad',
  data () {
    return {
      leuzen: [
        'Druk op de knop en start een beschonken avontuur!',
        'Gaat ge u weeral de kop in zuipen? Bende marginale drankorgels!',
        'Jepla terug een avondje bron! Olé Olé',
        'En we gaan nog nie no huis, balenge nie, belange nie...',
        'Gil is een hoer.',
        'Druk op de knop en verzuip uw zorgen!',
        'Druk op de knop en aanschouw het drankgelag',
        'Druk op de knop en laat je meenemen naar de wondere wereld van het marginale Narnia',
        'Druk op de knop en schijt jezelf onder',
        '...draai nu rond als een gans zo gaat de kabouterdans...'
      ]
    }
  },
  components: {
    StartEvening,
    EndEvening,
    Consumptieblad,
    KassabladSteps
  },
  computed: {
    ...mapState(['visibleWrapper', 'visibleComponent']),
    message () {
      return this.leuzen[Math.floor(Math.random() * this.leuzen.length)]
    }
  },
  methods: {
    refreshLeuzen () {
      this.message = this.leuzen[Math.floor(Math.random() * this.leuzen.length)]
    }
  }
}
</script>
<style scoped>
.title {
  margin-bottom:100px;
}
.home {
  padding:20px;
}

.home .card .ant-card-head {
  text-align:left !important;
}
.textLeft {
  text-align: left;
}
</style>
