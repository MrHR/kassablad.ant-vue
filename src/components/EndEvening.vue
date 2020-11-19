<template>
  <div id="endKassaWrapper" v-if="visibleWrapper === 'eindKassaWrapper'">
    <a-form-model class="center" layout="vertical" :model="kassaContainer">
      <!-- FORMPART: EIND AVOND -->
      <CreateKassaBlad
        buttonText="Sluit het Café"
        nextEl="naamTapperSluit"
      ></CreateKassaBlad>
      <!-- FORMPART: TAPPER SLUIT NAAM -->
      <div v-if="visibleComponent === 'naamTapperSluit'" class="formPart">
        <a-form-model-item label="Naam Tapper Sluit">
          <a-input
            class="naamTapper"
            v-model="kassaContainer.naamTapperSluit"
            ref="naamTapperSluit"
            placeholder="Bv.: Brent Vanheuverzwyn"
            @pressEnter="next('Sluitingsuur')"
            @focus="$event.target.select()"
            style="max-width:300px"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="next('createKassabladButton')">
            Cancel
          </a-button>
          <a-tooltip placement="bottom" title="Volgende(Enter)" :mouseEnterDelay="1">
            <a-button
              type="primary"
              ref="toDateButton"
              style="margin-left: 10px;"
              @click="next('Sluitingsuur')"
            >
              <a-icon type="double-right" />
            </a-button>
          </a-tooltip>
        </a-form-model-item>
      </div>
      <!-- FORMPART: EIND UUR EN DATUM -->
      <div v-if="visibleComponent ==='Sluitingsuur'">
        <a-form-model-item label="Sluitingsuur">
          <a-date-picker
            ref="Sluitingsuur"
            :show-time="{ format: 'HH:mm' }"
            placeholder="Selecteer openingsuur en datum"
            :format="format"
            style="width:300px"
            v-model="eindUur"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="next('naamTapperSluit')">
            <a-icon type="double-left" />
          </a-button>
          <a-tooltip placement="bottom" title="Volgende" :mouseEnterDelay="1">
            <a-button
              type="primary"
              ref="toNomButton"
              style="margin-left: 10px;"
              @click="next('bezoekers')"
            >
              <a-icon type="double-right" />
            </a-button>
          </a-tooltip>
        </a-form-model-item>
      </div>
      <!--FORMPART: BEZOEKERS -->
      <div v-if="visibleComponent === 'bezoekers'">
        <a-form-model-item label="bezoekers">
          <a-input-number
            ref="bezoekers"
            :min="0"
            :max="300"
            :precision="0"
            v-model="bezoekers"
            @focus="$event.target.select()"
            @pressEnter="tempCreateKassaContainer"
          /><!-- Creates eindkassa if none exists before moving on -->
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="next('Sluitingsuur')">
            <a-icon type="double-left" />
          </a-button>
          <a-tooltip placement="bottom" title="Volgende" :mouseEnterDelay="1">
            <a-button
              type="primary"
              ref="toNomButton"
              style="margin-left: 10px;"
              @click="tempCreateKassaContainer"
            ><!-- Creates eindkassa if none exists before moving on -->
              <a-icon type="double-right" />
            </a-button>
          </a-tooltip>
        </a-form-model-item>
      </div>
      <!-- FORMPART: KASSA TELLEN SLUIT -->
      <div v-if="visibleComponent === 'showNomination'" class="formPart center textCenter">
        <!-- {{ this.kassas }} -->
        <!-- {{ nominations }} -->
        <Nomination
          v-for="(item, index) in kassaContainer.endKassaNominations"
          v-bind:item="item"
          v-bind:index="index"
          v-bind:key="item.nominationId"
          v-bind:count="formCount"
          v-bind:next="nextNomBool"
          v-bind:focus="nomFocus"
          v-bind:nominations="kassaContainer.nominations"
          @goto-next="gotoNextNom"
        ></Nomination>
        <a-form-model-item>
          <!--GOTO: Previous form item(date)-->
          <a-button
            v-if="formCount <= 0" @click="next('bezoekers')">
            <a-icon type="double-left" />
          </a-button>
          <!--GOTO: Previous Nomination-->
          <a-button v-if="formCount > 0" @click="formCount > 0 ? formCount-- : formCount">
            <a-icon type="double-left" />
          </a-button>
          <!--GOTO: Next Nomination-->
          <a-tooltip placement="bottom" title="Volgende(Enter)" :mouseEnterDelay="1">
            <a-button
              ref="nextNom"
              v-if="formCount < (kassaContainer.nominations.length - 1)"
              type="primary" style="margin-left: 10px;"
              @click="nextNomBool = true;"
            >
              <a-icon type="double-right" />
            </a-button>
          </a-tooltip>
          <!-- GOTO: form overview -->
          <a-button
            ref="showOverview"
            v-if="formCount >= (kassaContainer.nominations.length -1)"
            type="primary"
            style="margin-left: 10px;"
            @click="next('showOverview')"
          >
            <a-icon type="double-right" />
          </a-button>
        </a-form-model-item>
      </div>
      <!-- FORMPART: EINDKASSA TABEL-->
      <div v-if="visibleComponent === 'showOverview'">
        <a-form-model-item>
          <EindKassaTable
            class="endEveningTableWrapper center"
            v-bind:kassaContainer="kassaContainer"
            v-bind:beginKassaNominations="beginKassaNominations"
          />
        </a-form-model-item>
        <a-form-model-item class="textCenter">
          <a-button @click="next('showNomination')">
            <a-icon type="double-left" />
          </a-button>
          <a-tooltip placement="bottom" title="Volgende" :mouseEnterDelay="1">
            <a-button
              type="primary"
              ref="showOverview"
              style="margin-left: 10px;"
              @click="next('showAfroomkluisBedrag')"
            >
              <a-icon type="double-right" />
            </a-button>
          </a-tooltip>
        </a-form-model-item>
      </div>
      <!-- FORMPART: AFROOMKLUIS BEDRAG -->
      <div v-if="visibleComponent === 'showAfroomkluisBedrag'">
        <span>Totaal in kassa: € {{ afroomkluisBedrag }}</span>
        <a-form-model-item label="Bedrag voor afroomkluis:">
          <a-input-number
            ref="showAfroomkluisBedrag"
            :default-value="0"
            :min="0"
            :max="kassaTotaal"
            :step="0.05"
            :precision="2"
            :formatter="value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\€\s?|(,*)/g, '')"
            v-model="afroomkluis"
            @pressEnter="onSubmit"
            @focus="$event.target.select()"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="next('showOverview')">
            <a-icon type="double-left" />
          </a-button>
          <a-tooltip placement="bottom" title="Submit data(Enter)" :mouseEnterDelay="1">
            <a-button
              type="primary"
              style="margin-left: 10px;"
              @click="onSubmit"
            >
              <span>Submit</span>
            </a-button>
          </a-tooltip>
        </a-form-model-item>
      </div>
    </a-form-model>
    <div v-if="this.debug">
      <b>Eind Uur:</b> {{ this.eindUur }} <br />
      <b>kassaType:</b> {{ this.kassaType }} <br />
      <b>KassaContainer:</b> {{ this.kassaContainer }} <br />
      <b>KassaContainerId:</b> {{ this.kassaContainerId }} <br />
      <b>Kassa Id:</b> {{ this.kassaId }} <br />
      <b>Kassas:</b> {{ this.kassas }} <br />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import 'ant-design-vue/es/date-picker/locale/nl_BE'
import Nomination from '@/components/Kassablad/Nomination.vue'
import { mapState, mapActions } from 'vuex'
import EindKassaTable from '@/components/Kassablad/EindKassaTable.vue'
import CreateKassaBlad from '@/components/Kassablad/CreateKassaBlad.vue'
import helpers from '../functions/helperFunctions'

export default {
  name: 'EndEvening',
  components: {
    Nomination,
    EindKassaTable,
    CreateKassaBlad
  },
  data () {
    return {
      moment,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formCount: 0,
      nomFocus: false,
      nextNomBool: false,
      format: 'DD/MM/YYYY HH:mm'
    }
  },
  computed: {
    ...mapState([
      'debug',
      'nominations',
      'debugUI',
      'visibleComponent',
      'visibleWrapper',
      'kassaContainerId',
      'kassas',
      'kassaId',
      'kassaType'
    ]),
    ...mapState('kassabladen', {
      kassaContainer: state => state.kassaContainer,
      beginKassaNominations: state => state.beginKassaNominationsStored
    }),
    eindUur: {
      get () {
        return this.$store.state.kassabladen.kassaContainer.eindUur
      },
      set (value) {
        this.$store.commit('kassabladen/SET_EIND_UUR', value)
      }
    },
    bezoekers: {
      get () {
        return this.$store.state.kassabladen.kassaContainer.bezoekers
      },
      set (value) {
        this.$store.commit('kassabladen/SET_BEZOEKERS', value)
      }
    },
    afroomkluis: {
      get () {
        return this.$store.state.kassabladen.kassaContainer.afroomkluis
      },
      set (value) {
        this.$store.commit('kassabladen/SET_AFROOMKLUIS', value)
      }
    },
    kassaTotaal: function () {
      let total = 0
      this.kassaContainer.endKassaNominations.forEach(el => {
        const multiplier = this.kassaContainer.nominations.filter(x => x.id === el.nominationId)[0].multiplier
        const amount = el.amount
        total += helpers.calculatePrice(amount, multiplier)
      })
      return total
    },
    afroomkluisBedrag: function () {
      return helpers.subtractPrices(this.kassaTotaal, this.kassaContainer.afroomkluis)
    }
  },
  methods: {
    ...mapActions('kassabladen', [
      'createKassaContainer',
      'createKassa',
      'saveKassaNominations',
      'setEindUur',
      'setBezoekers',
      'saveFormSection'
    ]),
    next (name) {
      this.$store.dispatch('showComponent', name)
      this.saveFormSection()
    },
    gotoNextNom (item) {
      if (this.formCount >= (this.kassaContainer.nominations.length - 1)) {
        this.next('showOverview')
        // this.$refs.avondstartSubmitInput.click()
      } else {
        // this.$refs.nextNom.$el.click()
        if (this.formCount < (this.kassaContainer.nominations.length - 1)) {
          this.formCount++
          this.nomFocus = true
        }
      }
      this.nextNomBool = false
    },
    tempCreateKassaContainer () {
      this.createKassaContainer('end')
      this.next('showNomination')
    },
    onSubmit () {
      this.$store.commit('SET_RESET_KASSACONTAINER', true)
      this.createKassaContainer('end', false)
      this.$store.dispatch('showWrapper', 'beginKassaWrapper')
      this.$store.dispatch('showComponent', 'createKassabladButton')
      this.$store.commit('kassabladen/RESET_KASSA_DATA')
      this.$store.commit('consumpties/RESET_CONSUMPTION_DATA')
      this.formCount = 0
    }
  },
  watch: {
    visibleComponent (newValue) {
      if (newValue !== 'showOverview') {
        helpers.setFocus(this.$refs, newValue)
      }
    }
  }
}
</script>
<style lang="scss">
#endKassaWrapper {
  text-align:left;
}

.center {
  margin:auto;
}
.title {
  margin-bottom:100px;
}
.endEveningTableWrapper table {
  margin:10px 0;
}
.endEveningTableWrapper thead th {
  padding-top:5px;
  padding-bottom:5px;
}
.endEveningTableWrapper tbody td {
  padding-top:5px;
  padding-bottom:5px;
  background-color:white;
}
.endEveningTableWrapper tbody td:nth-child(5) {
  font-weight: bolder;
}
</style>
