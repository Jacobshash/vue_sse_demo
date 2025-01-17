<template>
  <div>
    <h1>Server-Sent Events Demo , Click button to jump</h1>
    <button @click="goToSimpleSse" class="custom-button">
      Go to Simple SSE
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goToSimpleSse() {
      this.$router.push('/simple_sse'); // 跳转到 simple_sse.vue 页面
    }
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}

.custom-button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
