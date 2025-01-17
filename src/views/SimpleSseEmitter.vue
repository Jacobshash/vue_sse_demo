<template>
  <div>
    <h1>Server-Sent Events Demo By SimpleSseEmitter</h1>
    <div v-if="events.length">
      <h2>Events:</h2>
      <ul>
        <li v-for="(event, index) in events" :key="index">
          {{event}}
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
  name: 'SimpleSseEmitter',
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    const eventSource = new EventSource('http://localhost:8080/sse/sse-emitter');
    eventSource.onmessage = (event) => {
      const data = event.data + "-" +new Date().toLocaleString()
      this.events.push(data);
    };

    eventSource.onerror = () => {
      console.error('Error occurred in SSE connection');
      eventSource.close();
    };
  },
};
</script>

<style>
h1 {
  color: #42b983;
}
</style>
