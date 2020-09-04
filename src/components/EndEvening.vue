<template>
  <div id="endKassaWrapper" v-if="visibleWrapper === 'eindKassaWrapper'">
    <a-form-model class="center" layout="vertical" :model="kassaContainer">
      <!-- FORMPART: EIND AVOND -->
      <CreateKassaBlad
        buttonText="Eindig de Avond"
        nextEl="naamTapperSluit"
      ></CreateKassaBlad>
      <!-- FORMPART: TAPPER SLUIT NAAM -->
      <div v-if="visibleComponent === 'naamTapperSluit'">
        <a-form-model-item label="Naam Tapper Sluit">
          <a-input
            class="naamTapper"
            v-model="kassaContainer.naamTapperSluit"
            ref="naamTapperSluit"
            placeholder="Bv.: Brent Vanheuverzwyn"
            @pressEnter="next('eindUur')"
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
              @click="next('eindUur')"
            >
              <a-icon type="double-right" />
            </a-button>
          </a-tooltip>
        </a-form-model-item>
      </div>
      <!-- FORMPART: EIND UUR EN DATUM -->
      <div v-if="visibleComponent ==='eindUur'">
        <a-form-model-item label="Eind Uur">
          <a-date-picker
            ref="beginUur"
            :show-time="{ format: 'HH:mm' }"
            :format="dateFormat"
            showNom
            :default-value="moment()"
            :v-model="kassaContainer.eindUur"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
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
            :default-value="0"
            :min="0"
            :max="300"
            :precision="0"
            v-model="kassaContainer.bezoekers"
            @pressEnter="next('showNomination')"
            @focus="$event.target.select()"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="next('eindUur')">
            <a-icon type="double-left" />
          </a-button>
          <a-tooltip placement="bottom" title="Volgende" :mouseEnterDelay="1">
            <a-button
              type="primary"
              ref="toNomButton"
              style="margin-left: 10px;"
              @click="next('showNomination')"
            >
              <a-icon type="double-right" />
            </a-button>
          </a-tooltip>
        </a-form-model-item>
      </div>
      <!-- FORMPART: KASSA TELLEN SLUIT -->
      <div v-if="visibleComponent ==='showNomination'">
        <!-- {{ this.kassas }} -->
        <!-- {{ nominations }} -->
        <Nomination
          v-for="(item, index) in nominations"
          v-bind:item="item"
          v-bind:index="index"
          v-bind:key="item.nomId"
          v-bind:count="formCount"
          v-bind:focus="nomFocus"
          v-bind:next="nextNomBool"
          @goto-next="gotoNextNom"
        ></Nomination>
        <a-form-model-item>
          <!--GOTO: Previous form item(date)-->
          <a-button
            v-if="formCount <= 0" @click="next('eindUur')">
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
              v-if="formCount < (nominations.length - 1)"
              type="primary" style="margin-left: 10px;"
              @click="nextNomBool = true;"
            >
              <a-icon type="double-right" />
            </a-button>
          </a-tooltip>
          <!-- GOTO: form overview -->
          <a-button
            ref=""
            v-if="formCount >= (nominations.length -1)"
            type="primary"
            style="margin-left: 10px;"
            @click="next('showOverview')"
          >
            <a-icon type="double-right" />
          </a-button>
        </a-form-model-item>
      </div>
      <!-- FORMPART: EINDKASSA TABEL-->
      <div v-if="visibleComponent ==='showOverview'">
        <a-form-model-item>
          <EindKassaTable class="endEveningTableWrapper center" v-bind:nominations="nominations" v-bind:beginKassaNominations="beginKassaNominations" />
        </a-form-model-item>
        <a-form-model-item>
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
            :max="maxValue"
            :step="1.00"
            :precision="2"
            :formatter="value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\€\s?|(,*)/g, '')"
            v-model="kassaContainer.afroomkluis"
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
      <b>kassaType:</b> {{ this.kassaType }} <br />
      <b>KassaContainer:</b> {{ this.kassaContainer }} <br />
      <b>KassaContainerId:</b> {{ this.kassaContainerId }} <br />
      <b>Kassa Id:</b> {{ this.kassaId }} <br />
      <b>Kassas:</b> {{ this.kassas }} <br />
    </div>
  </div>
</template>
<script>
import locale from 'ant-design-vue/es/date-picker/locale/nl_BE'
import moment from 'moment'
import Nomination from '@/components/Kassablad/Nomination.vue'
import { mapState } from 'vuex'
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
      locale,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formCount: 0,
      nomFocus: false,
      nextNomBool: false,
      dateFormat: 'DD/MM/YYYY HH:mm'
    }
  },
  computed: {
    ...mapState([
      'debug',
      'nominations',
      'beginKassaNominations',
      'debugUI',
      'visibleComponent',
      'visibleWrapper',
      'kassaContainer',
      'kassaContainerId',
      'kassas',
      'kassaId',
      'kassaType'
    ]),
    afroomkluisBedrag: function () {
      return helpers.subtractPrices(300.00, this.kassaContainer.afroomkluis)
    },
    maxValue: function () {
      return 300.00 // TODO: replace with kassablad total
    }
  },
  methods: {
    moment,
    next (name) {
      this.$store.dispatch('showComponent', name)
    },
    gotoNextNom (item) {
      if (this.formCount >= (this.nominations.length - 1)) {
        this.next('showOverview')
        // this.$refs.avondstartSubmitInput.click()
      } else {
        // this.$refs.nextNom.$el.click()
        if (this.formCount < (this.nominations.length - 1)) {
          this.formCount++
          this.nomFocus = true
        }
      }
      this.nextNomBool = false
    },
    onSubmit () {
      this.$store.dispatch('createKassaContainer', 'end')
      this.$store.dispatch('saveNominations')
      this.formCount = 0
    }
  },
  created () {
    // TODO: get eindKassa Nominations
  },
  watch: {
    visibleComponent (newValue) {
      setTimeout(() => {
        if (this.$refs[newValue]) {
          this.$refs[newValue].focus()
        }
      }, 10)
    }
  }
}
</script>
<style lang="scss">
#endKassaWrapper {
  padding-top:calc(50vh - 200px);
}

.center {
  margin:auto;
  max-width:80%;
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
