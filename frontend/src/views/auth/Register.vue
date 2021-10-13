<template>
  <div class="register">
    <h3 class="register-element">Registration</h3>
    <span class="register-element p-float-label">
      <InputText id="username" type="text" v-model="user.username" />
      <label for="username">Username</label>
    </span>
    <span class="register-element p-float-label">
      <InputText id="password" type="password" v-model="user.password" ></InputText>
      <label for="password">Password</label>
    </span>

    <Button label="Submit" @click="handleRegister"/>
  </div>
</template>

<script>

import User from '@/model/user'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
  name: 'Register',
  data: () => ({
    user: new User('', '')
  }),
  components: {
    InputText,
    Button
  },
  methods: {
    handleRegister () {
      this.$store.dispatch('auth/register', this.user).then(
        () => {
          this.$router.push('/login')
        },
        error => {
          this.loading = false
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()

          console.log(this.message)
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">

.register{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .register-element{
    margin-bottom: 25px;
  }
}

</style>
