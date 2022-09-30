<script>
export default {
  props: ['month'],
}
</script>

<template>
  <h2 class="calendar-card__title">{{ month.name }}</h2>
  <p class="calendar-card__check" v-if="month.matches">✅</p>
</template>

<style>
.calendar-card {
  width: 150px;
  height: 150px;
  margin: 20px;
  flex-direction: column;
  border: 1px solid floralwhite;
  border-radius: 10px;
  text-align: center;
  background: floralwhite;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 20%) 0px 20px 30px;
}
.calendar-card:hover .calendar-card__title,
.calendar-card.inactive-month:hover .calendar-card__title{
  background-color: rgba(219, 112, 147, 0.8);
}
.calendar-card.active-month .calendar-card__title {
  background-color: crimson;
}
.calendar-card.inactive-month {
  opacity: 0.5;
}
.calendar-card__title {
  background-color: palevioletred;
  border-radius: 10px 10px 0 0;
  color: white;
  font-family: helvetica;
  font-weight: lighter;
}
.calendar-card__check {
  font-size: 44px;
  padding-top: 23px;
}

@media (max-width: 768px) {
  .calendar-card {
    width: 120px;
    height: 120px;
    margin: 10px;
  }
  .calendar-card__check {
    padding-top: 10px;
  }
}
.high-contrast .calendar-card {
  background: black;
  border: 1px solid blueviolet;
}
.high-contrast .calendar-card__title {
  background-color: black;
  border-bottom: 1px solid blueviolet;
  color: white;
}
.high-contrast .calendar-card:hover .calendar-card__title,
.high-contrast .calendar-card.inactive-month:hover .calendar-card__title{
  background-color: crimson;
}
.high-contrast .calendar-card.inactive-month {
  opacity: 0.7;
}
</style>