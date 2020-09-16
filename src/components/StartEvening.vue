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
              @pressEnter="next('beginUur')"
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
                @click="next('beginUur')"
              >
                <a-icon type="double-right" />
              </a-button>
            </a-tooltip>
          </a-form-model-item>
      </div>
      <!--FORMPART: DATUM-->
      <div v-if="visibleComponent ==='beginUur'">
          <a-form-model-item label="Openingsuur">
            <a-date-picker
              ref="beginUur"
              :show-time="{ format: 'HH:mm' }"
              placeholder="Pick a date"
              :default-value="moment()"
              :format="format"
              style="width: 100%;"
              v-model="kassaContainer.beginUur"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="next('naamTapper')">
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
          {{ kassaContainer.beginKassaNominations }}
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
      'nominations',
      'debugUI',
      'visibleComponent',
      'visibleWrapper',
      'kassaContainerId',
      'kassas',
      'kassaId',
      'kassaType',
      'resetKassaContainer',
      'loadingStatus'
    ]),
    ...mapState({ kassaContainer: state => state.kassabladen.kassaContainer }),
    beginUur: {
      get: function () {
        return moment(this.kassaContainer.beginUur || moment(), 'DD/MM/YYYY HH:mm')
      },
      set: function (newValue) {
        return moment(newValue || moment(), 'DD/MM/YYYY HH:mm')
      }
    }
  },
  methods: {
    ...mapActions('kassabladen', ['createKassaContainer', 'createKassa', 'saveKassaNominations']),
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
      this.saveKassaNominations('begin')
      this.formCount = 0
    }
  },
  created () {
    if (this.resetKassaContainer) {
      console.log('reset')
      this.$store.commit('kassabladen/RESET_KASSA_DATA')
    }
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
