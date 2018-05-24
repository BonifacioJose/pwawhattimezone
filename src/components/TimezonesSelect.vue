<template>
  <div class="timezones-select">
    <input v-model="filterTimezone" v-on:keyup="filterTimezones"/>

    <v-select
      :items="filteredTimezones"
      :filter="timezonesFilter"
      v-model="filterTimezone"
      item-text="zoneName"
      label="Select"
      autocomplete
    ></v-select>
    <v-btn v-on:click="selectTimezone">Select</v-btn>  

    <TimezoneCard v-for="timezone in selectedTimezones" v-bind:key="timezone.timestamp" :timezone="timezone"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TimezoneCard from './TimezoneCard.vue'
import {
  SET_TIMEZONES,
  SET_SELECTED_TIMEZONES,
  SELECT_TIMEZONE
} from '../constants/mutations'

export default {
  name: 'TimezonesSelect',
  components: {
    TimezoneCard
  },
  data () {
    return {
      filteredTimezones: [],
      filterTimezone: '',
      timezonesFilter (timezone, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(timezone.zoneName)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    }
  },
  computed: mapGetters({
    timezones: 'allTimezones',
    selectedTimezones: 'selectedTimezones'
  }),
  methods: mapActions({
    selectTimezone () {
      const { filterTimezone } = this
      this.$store.dispatch(SELECT_TIMEZONE, {field: 'zone', value: filterTimezone.zoneName})
    },
    updateSelectedClocks () {
      setInterval(() => {
        const { selectedTimezones } = this
        for (let i = 0; i < selectedTimezones.length; i++) {
          let timezone = selectedTimezones[i]
          let timestamp = parseInt(timezone.timestamp)
          timestamp += 1
          timezone.timestamp = timestamp.toString()
        }
        this.$store.dispatch(SET_SELECTED_TIMEZONES, {selectedTimezones})
      }, 1000)
    },
    filterTimezones () {
      const {timezones} = this
      this.filteredTimezones = timezones.filter(item => item.zoneName.toLowerCase().includes(this.filterTimezone.toLowerCase()))
    }
  }),
  created () {
    this.$store.dispatch(SET_TIMEZONES)
    this.filteredTimezones = this.timezones
    this.updateSelectedClocks()
  }
}
</script>

<style scoped>

</style>