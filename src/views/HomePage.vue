<template>
  <div class="button-container">
    <h1>Server-Sent Events Demo , Click button to jump</h1>
    <button @click="goToSimpleSse" class="custom-button">
      Go to Simple SSE SseEmitter
    </button>

    <button @click="goToFlux" class="custom-button">
      Go to Simple SSE Flux
    </button>

    <button @click="goToInteractiveSse" class="custom-button">
      Go to Simple Interactive Sse
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goToSimpleSse() {
      this.$router.push('/simple_sse_emitter'); // 跳转到 simple_sse.vue 页面
    },
    goToFlux() {
      this.$router.push('/simple_flux'); // 跳转到 flux.vue 页面
    },
    goToInteractiveSse() {
      this.$router.push('/interactive_sse'); // 跳转到 flux.vue 页面
    }
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}

.button-container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
}

.custom-button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px; /* 添加此行以增加间距 */
}
</style>
