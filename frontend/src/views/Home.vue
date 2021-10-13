<template>
  <div class="home">
    <h1>Hello!!!</h1>
    <h3>logged in: {{this.$store.state.auth.status.loggedIn}}</h3>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
