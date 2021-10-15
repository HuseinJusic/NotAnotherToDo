<template>
  <router-view/>
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
  created () {
    this.$store.dispatch('todo/load')
  }
}
</script>

<style>

</style>
