<script setup>
import CalendarCard from "./components/CalendarCard.vue";
import FlowerCard from "./components/FlowerCard.vue";
import {getImgUrl} from "./images.js";
</script>

<template>
  <h1 class="main-title">💐 Le calendrier des fleurs 💐</h1>
  <div class="calendar-container">
  <div class="calendar-container__left" :style="activeFlower ? {backgroundImage: `url(${getImgUrl(activeFlower.picture)})`} : {}">
    <div class="backdrop">
      <div v-if="activeFlower" class="flower-card flower-card--first">
        <FlowerCard v-bind:flower="activeFlower"/>
      </div>
    </div>
  </div>
  <ul class="calendar-card__container">
    <li class="calendar-card"
        @click="clickMonth(month.name); activeMonth = month.name"
        :class="{'active-month': activeMonth === month.name,
        'inactive-month': activeMonth && activeMonth!==month.name}"
        v-for="month in months">
      <CalendarCard v-bind:month="month"/>
    </li>
  </ul>
  </div>
  <button class="see-all" @click="resetDatas">Voir toutes les fleurs</button>
  <ul class="flower-card__container">
    <li class="flower-card"
        @click="clickFlower(flower.months); activeFlower = flower"
        v-for="flower in flowers">
      <FlowerCard v-bind:flower="flower"/>
    </li>
  </ul>
</template>

<script>
import flowersData from "./assets/flowers.json";
const allFlowers = []
for (const flower of flowersData) {
  allFlowers.push({...flower, months: flower.months.split(',')})
}
// Sort by alphabetical order
allFlowers.sort((a, b) => a.name.localeCompare(b.name))

const allMonths = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

function findMonthMatches(matchingMonths) {
  let newArray = []
  for (let month of allMonths) {
    let matches = matchingMonths.includes(month);
    newArray.push({name: month, matches: matches}) // new format for months
  }
  return newArray
}

export default {
  data() {
    return {
      activeFlower: null,
      activeMonth: null,
      flowers: allFlowers,
      months: findMonthMatches([]),
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 80,
        behavior: 'smooth'
      })
    },
    resetDatas() {
      this.months = findMonthMatches([])
      this.flowers = allFlowers
      this.activeMonth=null
      this.activeFlower=null
    },
    clickFlower(flowerMonths) {
      this.scrollToTop()
      this.months = findMonthMatches(flowerMonths);
      this.flowers = allFlowers // reinitialisation
      this.activeMonth= null // reinitialisation
    },
    clickMonth(month) {
      let newArray = []
      for(let flower of allFlowers) {
        if(flower.months.includes(month)) {
          newArray.push(flower)
        }
      }
      this.months = findMonthMatches([]) // reinitialisation
      this.flowers = newArray
      this.activeFlower=null // reinitialisation
    }
  }
}
</script>

<style>
ul {
  list-style-type: none;
}
.main-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 40px;
  color:black;
}
.calendar-container {
  display: flex;
  flex-direction: row;
}
.calendar-container__left {
  width: 40%;
  background: palevioletred;
  display: flex;
  background-size: cover;
  background-position: center;
}
.calendar-container__left__text {
  margin: 20px;
  font-size: 30px;
  font-family: Helvetica,sans-serif;
  font-weight: lighter;
  color:floralwhite;
}
.flower-card__container,
.calendar-card__container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto 0;
  padding: 0;
}
.calendar-card__container {
  background-color: white;
  padding: 20px 0;
}
.see-all {
  margin: 40px auto 20px;
  display: block;
  border-radius: 10px;
  font-family: helvetica, sans-serif;
  font-size: 20px;
  padding: 10px 16px;
  font-weight: lighter;
  background: transparent;
  border: 1px solid black;
  color: black;
}
.see-all:hover {
  cursor: pointer;
  background-color: palevioletred;
  color: white;
  border-color: white;
}
.backdrop {
  width: 100%;
  align-items: center;
  display: flex;
  backdrop-filter: blur(50px);
}
@media (max-width: 768px) {
  .calendar-container {
    flex-direction: column;
  }
  .calendar-container__left {
    width: 100%;
  }
  .calendar-card__container {
  }
}
</style>