<template>
  <div class="main">
    <div class="main-nav">
      <router-link v-if="!loggedIn" to="/">Home</router-link>
      <router-link v-else to="/notanothertodo">NotAnotherToDo</router-link>
      <router-link v-if="!loggedIn" class="login-margin login-element" to="/login">Signin</router-link>
<!--      <router-link v-if="!loggedIn" class="login-element" to="/register">Signup</router-link>-->
      <router-link v-if="loggedIn" class="login-margin login-element" to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>

</template>

<script>

export default {
  name: 'App',
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!this.$store.state.auth.status.loggedIn) {
          next({ name: 'Login' })
        }
      }
      next()
    })
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  }
}
</script>

<style scoped lang="scss">
.main-nav{
  margin-left: 20px;
  width: calc(100% - 20px);

  height: 60px;
  display: flex;

  align-items: center;

  .login-margin{
   margin-left: auto;
  }

  .login-element{
    margin-right: 20px;
  }
}
</style>
