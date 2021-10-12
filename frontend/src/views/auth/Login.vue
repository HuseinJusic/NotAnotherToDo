<template>
  <div class="login">
    <Button label="Primary" class="p-button-outlined" />
  </div>
</template>

<script>
// @ is an alias to /src

import User from '@/model/user'
import Button from 'primevue/button'

export default {
  name: 'Login',
  components: {
    Button
  },
  data: () => ({
    user: new User('huse', '123456')
  }),
  created () {
    console.log(this.$store.state.auth)
    // this.handleRegister()
    // this.handleLogin()
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('auth/login', this.user).then(
        () => {
          // this.$router.push('/profile')
        },
        error => {
          this.loading = false
          this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
        }
      )
    },
    handleRegister () {
      this.$store.dispatch('auth/register', this.user).then(
        () => {
          return true
        },
        error => {
          this.loading = false
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        }
      )
    }
  }
}
</script>
