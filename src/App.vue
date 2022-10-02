<script setup>
import CalendarCard from "./components/CalendarCard.vue";
import FlowerCard from "./components/FlowerCard.vue";
import {getImgUrl} from "./images.js";
</script>

<template>
  <h1 class="main-title">💐 Le calendrier des fleurs 💐</h1>
  <button class="high-contrast-button" @click="toggleHighContrast">☯</button>
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
        @click="clickMonth(month)"
        :class="{'active-month': activeMonth === month,
        'inactive-month': activeMonth && activeMonth!==month}"
        v-for="month in allMonths">
      <CalendarCard v-bind:label="month" v-bind:isChecked="activeFlower && activeFlower.months.includes(month)"/>
    </li>
  </ul>
  </div>
  <button class="see-all" @click="resetDatas">Voir toutes les fleurs</button>
  <ul class="flower-card__container">
    <li class="flower-card"
        @click="clickFlower(flower)"
        v-for="flower in flowers">
      <FlowerCard v-bind:flower="flower"/>
    </li>
  </ul>
</template>

<script>
import flowersData from "./assets/flowers.json";
const allFlowers = flowersData
    .sort((a, b) => a.name.localeCompare(b.name)) // sort by alphabetical order
    .map(flower => ({...flower, months: flower.months.split(',')})) // format months value

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

export default {
  data() {
    return {
      activeFlower: null,
      activeMonth: null,
      flowers: allFlowers,
    }
  },
  methods: {
    toggleHighContrast() {
      document.body.classList.toggle('high-contrast')
    },
    scrollToTop() {
      window.scrollTo({
        top: 80,
        behavior: 'smooth'
      })
    },
    resetDatas() {
      this.flowers = allFlowers
      this.activeMonth = null
      this.activeFlower = null
    },
    clickFlower(flower) {
      this.scrollToTop()
      this.activeFlower = flower
      this.flowers = allFlowers // reinitialisation
      this.activeMonth = null // reinitialisation
    },
    clickMonth(month) {
      this.flowers = allFlowers.filter(flower => flower.months.includes(month))
      this.activeMonth = month
      this.activeFlower = null // reinitialisation
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
.see-all:hover,
.high-contrast-button:hover {
  cursor: pointer;
  background-color: floralwhite;
}
.backdrop {
  width: 100%;
  align-items: center;
  display: flex;
  backdrop-filter: blur(50px);
}
.high-contrast-button {
  position: absolute;
  top: 38px;
  border: 1px solid black;
  background: transparent;
  color: black;
  border-radius: 10px;
  font-size: 30px;
}
@media (max-width: 768px) {
  .calendar-container {
    flex-direction: column;
  }
  .calendar-container__left {
    width: 100%;
  }
  .main-title {
    margin-top: 60px;
  }
}
.high-contrast .main-title {
  color: white;
}
.high-contrast .see-all {
  border-color: white;
  color: white;
}
.high-contrast .see-all:hover,
.high-contrast .high-contrast-button:hover {
  background-color: lightgoldenrodyellow;
  color: black;
}
.high-contrast .calendar-container__left,
.high-contrast .calendar-card__container {
  background-color: black;
}
.high-contrast .calendar-container__left {
  background-image: none;
}
.high-contrast .high-contrast-button {
  color: white;
  border-color: white;
}
</style>