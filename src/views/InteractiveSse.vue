<template>
  <div>
    <h1>Interactive SSE By Flux</h1>
    <input
      type="text"
      v-model="userId"
      placeholder="please input userId"
    />
    <input
      type="text"
      v-model="inputValue"
      @keyup="sendRequest"
      placeholder="Type something..."
    />
    <div v-if="events.length">
      <h2>Events:</h2>
      <ul>
        <li v-for="(event, index) in events" :key="index">
          {{ event }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No events received yet...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractiveSse',
  data() {
    return {
      events: [],
      inputValue: '',
      userId: 'loltoulan',
    };
  },
  mounted() {
    const eventSource = new EventSource(`http://localhost:8080/sse/sse-emitter/redis/${this.userId}`);
    eventSource.onmessage = (event) => {
      const data = event.data + ' - ' + new Date().toLocaleString();
      this.events.push(data);
    };

    eventSource.onerror = () => {
      console.error('Error occurred in SSE connection');
      eventSource.close();
    };
  },
  methods: {
    sendRequest() {
      if (this.inputValue.trim() === '') return;
      if (this.userId.trim() === '') return;

      fetch(`http://localhost:8080/sse/sse-emitter/mock/${this.userId}?data=${encodeURIComponent(this.inputValue)}`)
        .then(response => {
          console.log('Response status:', response);
        })
        .then(data => {
          console.log('Response from server:', data);
          // 处理响应数据
        })
        .catch(error => {
          console.error('Error sending request:', error);
        });
    },
  },
};
</script>

<style>
h1 {
  color: #42b983;
}

input {
  margin-bottom: 20px;
  padding: 10px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
