<template>
  <div v-if="visibleWrapper === 'beginKassaWrapper'">
    <h1 class="title">Beginkassa</h1>
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
              :default-value="moment()"
              :locale="locale"
              show-time
              showNom
              v-model="kassaContainer.beginUur"
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
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
                @click="createKassaContainer"
              >
                <a-icon type="double-right" />
              </a-button>
            </a-tooltip>
          </a-form-model-item>
      </div>
      <!--FORMPART: KASSA OPENEN-->
      <div v-if="visibleComponent ==='showNomination'">
        <!-- {{ this.kassas }} -->
        {{ nominations }}
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
      <!--FORMPART: beginKassaNoms Table-->
      <div v-if="visibleComponent ==='showOverview'">
        <a-form-model-item>
          <BeginKassaTable class="startEveningTableWrapper center" v-bind:nominations="nominations" />
          <a-button @click="next('showNomination')">
            <a-icon type="double-left" />
          </a-button>
          <a-tooltip placement="bottom" title="Submit data(Enter)" :mouseEnterDelay="1">
            <a-button
              ref="avondstartSubmitInput"
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
import BeginKassaTable from '@/components/Kassablad/BeginKassaTable.vue'
import CreateKassaBlad from '@/components/Kassablad/CreateKassaBlad.vue'

export default {
  name: 'StartEvening',
  components: {
    Nomination,
    BeginKassaTable,
    CreateKassaBlad
  },
  data () {
    return {
      locale,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formCount: 0,
      nomFocus: false,
      nextNomBool: false
    }
  },
  computed: {
    ...mapState([
      'debug',
      'nominations',
      'debugUI',
      'visibleComponent',
      'visibleWrapper',
      'kassaContainer',
      'kassaContainerId',
      'kassas',
      'kassaId',
      'kassaType'
    ])
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
    createKassaContainer () {
      this.$store.dispatch('createKassablad')
      this.next('showNomination')
    },
    onSubmit () {
      this.$store.dispatch('saveNominations')
      this.formCount = 0
    }
  },
  created () {
    this.$store.dispatch('fetchNominations')
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
<style>
.center {
  margin:auto;
  max-width:80%;
}
.title {
  margin-bottom:100px;
}
.startEveningTableWrapper thead th {
  padding-top:5px;
  padding-bottom:5px;
}
.startEveningTableWrapper tbody td {
  padding-top:5px;
  padding-bottom:5px;
}
.startEveningTableWrapper tbody td:nth-child(2) {
  font-weight: bolder;
}
</style>
