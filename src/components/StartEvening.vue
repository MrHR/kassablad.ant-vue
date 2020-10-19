<template>
  <div id="beginKassaWrapper" v-if="visibleWrapper === 'beginKassaWrapper'">
    <a-form-model class="center" layout="vertical" :model="kassaContainer">
      <!-- FORMPART: CREATE KASSACONTAINER -->
      <CreateKassaBlad
        buttonText="Start de Avond"
        nextEl="naamTapper"
      ></CreateKassaBlad>
      <!--FORMPART: TAPPER NAAM-->
      <div v-if="visibleComponent === 'naamTapper'">
          <a-form-model-item
            label="Naam Tapper"
          >
            <a-input
              class="naamTapper"
              v-model="kassaContainer.naamTapper"
              ref="naamTapper"
              placeholder="Bv.: Brent Vanheuverzwyn"
              @pressEnter="next('activiteit')"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="next('createKassabladButton')">
              Cancel
            </a-button>
            <a-tooltip placement="bottom" title="Volgende(Enter)" :mouseEnterDelay="1">
              <a-button
                type="primary"
                ref="toActivityButton"
                style="margin-left: 10px;"
                @click="next('activiteit')"
              >
                <a-icon type="double-right" />
              </a-button>
            </a-tooltip>
          </a-form-model-item>
      </div>
      <!--FORMPART: ACTIVITEIT -->
      <div v-if="visibleComponent === 'activiteit'">
        <a-form-model-item label="Activiteit">
          <a-input
            class="activiteit"
            v-model="kassaContainer.activiteit"
            ref="activiteit"
            placeholder="Bv.: Café"
            @change="setTitle"
            @pressEnter="next('beginUur')"
          />
        </a-form-model-item>
        <a-form-model-item>
            <a-button @click="next('naamTapper')">
              <a-icon type="double-left" />
            </a-button>
            <a-tooltip placement="bottom" title="Volgende(Enter)" :mouseEnterDelay="1">
              <a-button
                type="primary"
                ref="toDateButton"
                style="margin-left: 10px;"
                @click="next('beginUur')"
              >
                <a-icon type="double-right" />
              </a-button>
            </a-tooltip>
          </a-form-model-item>
      </div>
      <!--FORMPART: DATUM-->
      <div v-if="visibleComponent ==='beginUur'">
        {{ kassaContainer.beginUur }}
          <a-form-model-item label="Openingsuur">
            <a-date-picker
              ref="beginUur"
              :show-time="{ format: 'HH:mm' }"
              placeholder="Pick a date"
              :format="format"
              style="width: 100%;"
              v-model="beginUur"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="next('activiteit')">
              <a-icon type="double-left" />
            </a-button>
            <a-tooltip placement="bottom" title="Volgende" :mouseEnterDelay="1">
              <a-button
                type="primary"
                ref="toNomButton"
                style="margin-left: 10px;"
                @click="linkCreateKassaContainer"
              >
                <a-icon type="double-right" />
              </a-button>
            </a-tooltip>
          </a-form-model-item>
      </div>
      <!--FORMPART: KASSA OPENEN-->
      <div v-if="visibleComponent ==='showNomination'">
        <div v-if="this.debug">
          <span>BeginKassaNominations</span><br/>
          {{ kassaContainer.beginKassaNominations }}<br /><br /><br />
          <span>Eind kassa nominations</span><br/>
          {{ kassaContainer.endKassaNominations }}
        </div>
          <Nomination
            v-for="(item, index) in kassaContainer.beginKassaNominations"
            v-bind:item="item"
            v-bind:index="index"
            v-bind:key="item.nominationId"
            v-bind:count="formCount"
            v-bind:next="nextNomBool"
            v-bind:focus="nomFocus"
            v-bind:nominations="kassaContainer.nominations"
            v-bind:nomId="item.nominationId"
            @goto-next="gotoNextNom"
          ></Nomination>
          <a-form-model-item>
            <!--GOTO: Previous form item(date)-->
            <a-button
              v-if="formCount <= 0" @click="next('beginUur')">
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
      <!--FORMPART: beginKassaNoms Table-->
      <div v-if="visibleComponent ==='showOverview'">
        <a-form-model-item>
          <BeginKassaTable
            class="startEveningTableWrapper center"
            v-bind:kassaContainer="kassaContainer"
          />
          <a-button @click="next('showNomination')">
            <a-icon type="double-left" />
          </a-button>
          <a-tooltip placement="bottom" title="Submit data(Enter)" :mouseEnterDelay="1">
            <a-button
              ref="showOverview"
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
      <b>Begin Uur:</b> {{ this.kassaContainer.beginUur }} <br />
      <b>KassaContainer:</b> {{ this.kassaContainer }} <br />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import 'ant-design-vue/es/date-picker/locale/nl_BE'
import Nomination from '@/components/Kassablad/Nomination.vue'
import { mapState, mapActions } from 'vuex'
import BeginKassaTable from '@/components/Kassablad/BeginKassaTable.vue'
import CreateKassaBlad from '@/components/Kassablad/CreateKassaBlad.vue'
import helperFunctions from '../functions/helperFunctions'

export default {
  name: 'StartEvening',
  components: {
    Nomination,
    BeginKassaTable,
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
      format: 'DD/MM/YYYY HH:mm',
      dateFormat: 'DD/MM/YYYY'
    }
  },
  computed: {
    ...mapState([
      'debug',
      'debugUI',
      'visibleComponent',
      'visibleWrapper',
      'resetKassaContainer',
      'loadingStatus'
    ]),
    ...mapState('kassabladen', {
      kassaContainer: state => state.kassaContainer
    }),
    ...mapState('consumpties', {
      consumptionCounts: state => state.consumptionCounts
    }),
    // kassaContainer: {
    //   get () {
    //     return this.$store.state.kassabladen.kassaContainer
    //   },
    //   set (value) {
    //     console.log('value', value)
    //     this.$store.commit('kassabladen/SET_KASSACONTAINER', value)
    //   }
    // },
    beginUur: {
      get () {
        const uur = this.$store.state.kassabladen.kassaContainer.beginUur
        console.log('uur', uur)
        return uur
      },
      set (value) {
        this.$store.commit('kassabladen/SET_BEGIN_UUR', moment(value))
      }
    }
  },
  methods: {
    ...mapActions('kassabladen', ['createKassaContainer', 'createKassa', 'saveKassaNominations']),
    ...mapActions('consumpties', ['fetchConsumptions']),
    viewDate (date, dateString) {
      this.dateString = dateString
      console.log('datestring this', this.dateString)
      console.log('date', date, 'datestring', dateString)
      console.log(this.kassaContainer.beginUur)
    },
    next (name) {
      this.$store.dispatch('showComponent', name)
    },
    gotoNextNom (item) {
      if (this.formCount >= (this.kassaContainer.nominations.length - 1)) {
        this.next('showOverview')
      } else {
        if (this.formCount < (this.kassaContainer.nominations.length - 1)) {
          this.formCount++
          this.nomFocus = true
        }
      }
      this.nextNomBool = false
    },
    linkCreateKassaContainer () {
      this.createKassaContainer()
      this.next('showNomination')
    },
    onSubmit () {
      // this.saveKassaNominations('begin')
      this.$store.commit('kassabladen/SET_BEGIN_KASSA_NOMS')
      console.log('consumptioncount', this.consumptionCounts.length)
      if (this.consumptionCounts.length <= 0) {
        this.fetchConsumptions()
      }
      this.$store.dispatch('showWrapper', 'consumpiteWrapper')
      this.$store.dispatch('showComponent', 'createKassabladButton')
      this.formCount = 0
    },
    setTitle (e) {
      window.document.title = e.target.value
      this.$store.commit('SET_TITLE', `${e.target.value} - ${this.$store.state.kassabladen.kassaContainer.naamTapper}`)
    },
    updateBeginUur (date, dateString) {
      this.$store.commit('kassabladen/SET_BEGIN_UUR', dateString)
    }
  },
  created () {
    if (this.resetKassaContainer) {
      console.log('reset')
      this.$store.commit('kassabladen/RESET_KASSA_DATA')
      this.$store.commit('consumpties/RESET_CONSUMPTION_DATA')
    }
  },
  mounted () {
    // TODO: if bestaand kassablad skip naar laatste savepoint
  },
  watch: {
    visibleComponent (newValue) {
      if (newValue !== 'showOverview') {
        helperFunctions.setFocus(this.$refs, newValue)
      }
    }
  }
}
</script>
<style>
#beginKassaWrapper {
  padding-top:calc(50vh - 200px);
}
.center {
  margin:auto;
  max-width:80%;
}
.title {
  margin-bottom:100px;
}
.startEveningTableWrapper table {
  margin:10px;
}
.startEveningTableWrapper thead th {
  padding-top:5px;
  padding-bottom:5px;
}
.startEveningTableWrapper tbody td {
  padding-top:5px;
  padding-bottom:5px;
  background-color:white;
}
.startEveningTableWrapper tbody td:nth-child(2) {
  font-weight: bolder;
}
</style>
