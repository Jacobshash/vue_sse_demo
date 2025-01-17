<template>
  <div>
    <h1>Interactive SSE By Input</h1>
    <input
      type="text"
      disabled
      v-model="userId"
      placeholder="please input userId"
    />
    <input
      type="text"
      v-model="inputValue"
      @keyup="sendRequest"
      placeholder="Type something..."
    />
    <div class="button-container">
      <button @click="breakConnection" class="custom-button">
        Break Connection
      </button>
      <button @click="reconnect" class="custom-button">
        Reconnect
      </button>
    </div>
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
      events: JSON.parse(localStorage.getItem('events')) || [],
      inputValue: '',
      userId: localStorage.getItem('userId') || 'loltoulan',
      close: false,
      eventSource: null,
    };
  },
  watch: {
    events: {
      handler(newVal) {
        localStorage.setItem('events', JSON.stringify(newVal));
      },
      deep: true,
    },
    userId(newVal) {
      localStorage.setItem('userId', newVal);
    },
  },
  mounted() {
    this.initEventSource();
  },
  beforeUnmount() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  },
  methods: {
    initEventSource() {
      if (this.eventSource) {
        this.eventSource.close();
      }
      this.eventSource = new EventSource(`http://localhost:8080/sse/sse-emitter/redis/${this.userId}`);
      this.eventSource.onmessage = (event) => {
        console.log('Received event:', event.data);
        const data = event.data + ' - ' + new Date().toLocaleString();
        if (event == null) {
          console.log('event is null');
        } else {
          this.events.push(data);
        }
      };

      this.eventSource.onerror = () => {
        console.error('Error occurred in SSE connection');
        if (this.close) {
          console.log('SSE connection closed.');
          this.eventSource.close();
        }
      };
    },
    sendRequest() {
      if (this.eventSource.readyState === 2) {
        console.log('SSE connection closed.');
        this.eventSource.close();
      }
      if (this.inputValue.trim() === '') return;
      if (this.userId.trim() === '') return;

      fetch(`http://localhost:8080/sse/sse-emitter/mock/${this.userId}?data=${encodeURIComponent(this.inputValue)}`)
        .then(response => {
          console.log('Response status:', response);
          // return response.json(); // 解析响应数据
        })
        .then(data => {
          console.log('Response from server:', data);
          // 处理响应数据
        })
        .catch(error => {
          console.error('Error sending request:', error);
        });
    },
    breakConnection() {
      fetch(`http://localhost:8080/sse/sse-emitter/redis/close/${this.userId}`)
        .then(response => {
          console.log('Response status:', response);
          // return response.json(); // 解析响应数据
        })
        .then(data => {
          console.log('Response from server:', data);
          // 处理响应数据
        })
        .catch(error => {
          console.error('Error sending request:', error);
        });
      this.events = [];
      this.inputValue = '';
      this.close = true;
      console.log('SSE connection closed.');
      if (this.eventSource) {
        this.eventSource.close();
      }
    },
    reconnect() {
      this.initEventSource();
      this.close = false;
      console.log('SSE connection re-established.');
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

.button-container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: right; /* 水平居中 */
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
