<template lang="pug">
nav(id="footer-nav")
  router-link(v-for="link in links" :key="link.navName" :to="link.navLink") {{ link.navName }}
</template>

<script>
export default {
  name: 'TheNavigation',
  data () {
    return {
      selected: 0,
      images: [require('@/assets/user-photo.jpg'), require('@/assets/user-photo-2.jpg'), require('@/assets/user-photo-3.jpg')],
      links: [
        {
          navName: 'Tasks',
          navLink: '/tasks'
        },
        {
          navName: 'Kanban',
          navLink: '/kanban'
        },
        {
          navName: 'Activity',
          navLink: '/activity'
        },
        {
          navName: 'Calendar',
          navLink: '/calendar'
        },
        {
          navName: 'Files',
          navLink: '/files'
        }
      ]
    }
  }
}
</script>

<style scoped>
header nav {
  display: flex;
  flex-direction: row;
  opacity: 0.7;
  font-family: 'Open Sans', sans-serif;
  font-size: 17px;
  color: #131313;
}
header nav a {
  text-decoration: none;
  padding: 23px 0 13px 0;
  color: #131313;
  margin-right: 30px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.router-link-active, .router-link-exact-active {
  border-color: orange;
}
</style>
