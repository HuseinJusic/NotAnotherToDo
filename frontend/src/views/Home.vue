<template>
  <div class="home">
    <h1>NotAnotherToDo</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style>

.home{
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background-color: aquamarine;
  color: white;
}

</style>
