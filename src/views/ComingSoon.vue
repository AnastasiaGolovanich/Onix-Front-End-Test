<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Coming soon
  div(class="coming-soon")
    p(class="title") Coming soon
</template>

<script>
export default {
  name: 'ComingSoon'
}
</script>
<style scoped>
.coming-soon {
  width: 730px;
  left: 0;
  right: 0;
  margin: 30px auto 121px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 40px 29px 68px;
  box-sizing: border-box;
  background-image: url("../assets/coming-soon.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 25%;
  min-height: 730px;
}
.title {
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  font-size: 70px;
  color: #131313;
  margin-top: 25px;
}
</style>
