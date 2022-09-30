<script setup>
import {getImgUrl} from "../images.js";
</script>

<script>
export default {
  props: ['flower'],
}
</script>

<template>
    <div class="flower-picture"
         v-bind:style="{ backgroundImage: `url(${getImgUrl(flower.picture)})` }"
         :alt="flower.name"></div>
    <div class="flower-card__text">
      <h2 class="flower-name">{{ flower.name }}</h2>
      <p>{{ flower.category }}</p>
    </div>
</template>

<style>
.flower-card {
  padding: 10px;
  width: 200px;
  margin: 20px;
  border-radius: 10px;
  background-color: floralwhite;
  color: black;
  text-align: center;
  opacity: 0.85;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 20%) 0px 20px 30px;
}
.flower-card--first {
  margin: 20px auto;
  opacity: 1;
  cursor: initial;
  height: 306px;
  color: white;
  border: 1px solid white;
  background: transparent;
}
.flower-card:hover {
  opacity: 1;
}
.flower-name {
  line-height: 24px;
  padding-top: 10px;
}
.flower-picture {
  width: auto;
  height: 180px;
  background-size: cover;
}
.flower-card__text {
  text-shadow: 0px 3px 16px grey;
  font-weight: lighter;
}
.high-contrast .flower-card {
  border: 1px solid lightgoldenrodyellow;
  color: white;
  background: black;
}
</style>