<template>
  <div>lol bye</div>
</template>

<script>
export default {
  name: 'Logout',
  created () {
    this.$store.dispatch('auth/logout')
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
