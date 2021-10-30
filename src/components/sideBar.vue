<template>
  <aside>
    <section class="top-side-panel">
      <a href="#" class="logo"></a>
      <h2>Projectus</h2>
      <button aria-label="Search button"></button>
    </section>
    <section class="user-info">
      <h2 class="visually-hidden">User Info</h2>
      <img :src="userImage" alt="user photo">
      <div>
        <h2>{{ userName }}</h2>
        <p>{{ userWork }}</p>
      </div>
      <button aria-label="see-more button"></button>
    </section>
    <section class="user-statistic">
      <h2 class="visually-hidden">User Statistic</h2>
      <div>
        <p class="count" v-on:click="addTask">{{ completedTaskCount }}</p>
        <p class="title">Completed Tasks</p>
      </div>
      <div>
        <p class="count">{{ openTaskCount }}</p>
        <p class="title">Open Tasks</p>
      </div>
    </section>
    <nav>
      <p class="menu">Menu</p>
      <ul>
        <li>Home</li>
        <li>My Tasks</li>
        <li id="notification"
            v-bind:data-after="notification"
        >Notifications</li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import userImage from '../assets/user-photo.jpg'
export default ({
  props: ['notification'],
  model: {
    event: 'sendNotification'
  },
  data () {
    return {
      userImage,
      userName: 'Jean Gonzales',
      userWork: 'Product Owner',
      completedTaskCount: 372,
      openTaskCount: 11,
      imageId: 3
    }
  },
  methods: {
    addTask () {
      if (confirm('Are you sure you want to change the number of tasks?')) {
        if (this.openTaskCount > 0) {
          this.completedTaskCount++
          this.openTaskCount--
        } else {
          alert('You have no open tasks.')
        }
      }
    },
    onEnlargeText () {
      console.log('enlarging text')
    },
    test (e) {
      console.log(e)
    }

  }
  // mounted () {
  //   this.$on('new-user-question', function () {
  //     console.log('hey')
  //   })
  // }

})
</script>
