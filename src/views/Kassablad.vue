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
      <h2 v-if="visibleComponent === 'createKassabladButton'">
        Open de kassa
      </h2>
      <p v-if="visibleComponent === 'createKassabladButton'">
        Druk op de knop en start het dronken avontuur!
      </p>
    </a-card>
    <div class="home">
      <a-card class="card" :title="visibleWrapper === 'consumpiteWrapper' ? 'Consumpties' : ''">
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
  components: {
    StartEvening,
    EndEvening,
    Consumptieblad,
    KassabladSteps
  },
  computed: {
    ...mapState(['visibleWrapper', 'visibleComponent'])
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
