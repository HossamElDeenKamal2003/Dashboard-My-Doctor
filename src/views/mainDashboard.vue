<template>
  <div class="parent">
    <div class="left-side">
      <div class="icons">
        <a href=""><img :src="require('../components/img/icon1.png')" alt="Icon 1" class="icon" /></a>
        <a href=""><img :src="require('../components/img/icon2.png')" alt="Icon 2" class="icon" /></a>
        <a href=""><img :src="require('../components/img/icon3.png')" alt="Icon 3" class="icon" /></a>
        <a href=""><img :src="require('../components/img/icon4.png')" alt="Icon 1" class="icon" /></a>
        <a href=""><img :src="require('../components/img/icon6.png')" alt="Icon 3" class="icon" /></a>
        <a href=""><img :src="require('../components/img/icon5.png')" alt="Icon 2" class="icon" /></a>
        <a href=""><img :src="require('../components/img/messages (1).png')" alt="Icon 2" class="icon" /></a>
        <!-- Add more icons as needed -->
      </div>
    </div>
    <div class="right-side">
      <div class="top-bar">
        <div class="search">
          <input type="text" v-model="searchQuery" placeholder="Search here...">
        </div>
        <div class="navigation">
          Navigation
        </div>
      </div>
      <div class="doctor-card">
        <div class="hello">
          <pre>Hello, </pre>
          <h1 style="color: rgba(142, 66, 179, 1);">Dr Fady</h1>
        </div>
        <div class="doctor-row">
          <div class="card-doc card shadow p-4 border-0">
            <div class="visits-today">
              <h2>Visits for Today</h2>
              <h2 class="visit-count">104</h2>
            </div>
            <div class="d-flex justify-content-between mt-3">
              <div class="card border-primary mb-3">
                <div class="card-body">
                  <h5 class="card-title">New Patients</h5>
                  <p class="card-text">40</p>
                </div>
              </div>
              <div class="card border-primary mb-3">
                <div class="card-body">
                  <h5 class="card-title">Old Patients</h5>
                  <p class="card-text">64</p>
                </div>
              </div>
            </div>
            <div class="image">
              <img :src="require('../components/img/hossam.png')" alt="" />
            </div>
          </div>
          <div class="calendar">
            <h2>Set Work Days and Times</h2>
            <div class="form-group">
              <label for="day-select">Select Day:</label>
              <select v-model="selectedDay" id="day-select" class="form-control">
                <option v-for="(day, index) in daysOfWeek" :key="index" :value="day">{{ day }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="start-time">Start Time:</label>
              <input type="time" v-model="startTime" id="start-time" class="form-control" />
            </div>
            <div class="form-group">
              <label for="end-time">End Time:</label>
              <input type="time" v-model="endTime" id="end-time" class="form-control" />
            </div>
            <button @click="addWorkHours" class="btn btn-primary">Add Work Hours</button>
          </div>
        </div>
        <div class="patients">
          <table class="patient-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <!-- Add other table headers as needed -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in filteredPatients" :key="patient.id">
                <td>{{ patient.name }}</td>
                <td>{{ patient.age }}</td>
                <td>{{ patient.gender }}</td>
                <!-- Add other patient data as needed -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "mainDashboard",
  data() {
    return {
      searchWord: "",
      selectedDay: "Monday",
      startTime: "09:00",
      endTime: "17:00",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      patients: [
        { name: "John Doe", today: "2024-11-03", id: "123456", gender: "Male", age: 30 },
        { name: "Jane Smith", today: "2024-11-03", id: "789012", gender: "Female", age: 25 },
        { name: "Michael Johnson", today: "2024-11-03", id: "345678", gender: "Male", age: 40 },
        { name: "Emily Davis", today: "2024-11-03", id: "901234", gender: "Female", age: 35 },
        // Add more patients as needed
      ],
      id: localStorage.getItem('id')
    };
  },
  methods: {
    addWorkHours() {
      // Logic to save the selected day and times
      console.log(`Added work hours: ${this.selectedDay} from ${this.startTime} to ${this.endTime}`);
      // You can add the logic to save this data to a backend or store it in your state
    },

    getPatients() {
      console.log("id before", this.id);
      axios.get('https://backend-my-doctor-1.onrender.com/auth-org/get-my-orders', {
        organizationId: this.id
      })
        .then(response => {
          console.log(response.data);  // Check the response data
        })
        .catch(error => {
          console.log(error.message);
          alert("Error While Fetching Data");
        });
    }


  },
 created(){
  this.id = localStorage.getItem('id');
  this.getPatients();
 }

};
</script>

<style scoped>
.parent {
  width: 100%;
  height: 100vh;
  background: rgba(142, 66, 179, 1);
  display: flex;
  justify-content: space-between;
}

.left-side {
  width: 10%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.icons {
  height: 70%;
  width: 60%;

}

.right-side {
  width: 200%;
  height: 100%;
  border: 2px solid rgba(142, 66, 179, 1);
  background-color: whitesmoke;
  border-radius: 25px 0 0 25px;
  padding: 20px;
}

.top-bar {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 20px;
}

.search input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: rgba(217, 217, 217, 1);
}

.search input[type="text"]::placeholder {
  color: #aaa;
}

.navigation {
  padding-left: 20px;
}

.doctor-card {
  margin-top: 20px;
  width: 70%;
}

.card-doc {
  background: linear-gradient(66.15deg, #DFB1E7 -5.25%, rgba(223, 177, 231, 0.34) 35.43%, #8E42B3 98.77%);
  border-radius: 15px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.visits-today {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
}

.visit-count {
  font-size: 2em;
  font-weight: bold;
}

.hello {
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
}

.image {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 30%;
  z-index: 0;
}

.image img {
  width: 100%;
  height: 100%;
  /* opacity: 0.7; */
  /* Adjust opacity if needed */
}

.doctor-row {
  width: 100%;
}

pre {
  font-size: 2em;
}

.d-flex {
  width: 45%;

}

.card-doc {
  width: 70%;
}

.card {
  border: none;
  width: 40%;
}

.card-header {
  border: none;
}

.calendar {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.doctor-row {
  display: flex;
  /* Use flexbox to layout children in a row */
  justify-content: space-between;
  /* Optional: space out children */
  align-items: flex-start;
  /* Align items at the top */
}

.card-doc {
  flex: 1;
  /* Allow the card-doc to take available space */
  margin-right: 20px;
  /* Space between card-doc and calendar */
}

.calendar {
  flex: 0 0 300px;
  /* Fixed width for the calendar */
  position: absolute;
  right: 100px;
}

.patients {
  height: 50vh;
  background-color: white;
  border-radius: 20px;
  margin-top: 10px;
  overflow: auto;
}

.patient-table {
  width: 100%;
  border-collapse: collapse;
  /* Remove space between borders */
  text-align: center;
  overflow: auto;
}

.patient-table th,
.patient-table td {
  border: none;
  /* Remove borders */
  padding: 10px;
  /* Add padding for better spacing */
  text-align: left;
  /* Align text to the left */
  text-align: center;
}

.patient-table th {
  background-color: rgba(142, 66, 179, 1);
  /* Optional: Add background color for header */
  color: white;
  /* Optional: Text color for header */
  text-align: center;
}

.icons {
  height: 70%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.icon {
  width: 40px;
  /* Adjust size as needed */
  height: 40px;
  margin: 10px 0;
}

.icons img {
  margin-bottom: 50px;
}

@media (max-width: 768px) {
  .parent {
    flex-wrap: wrap;
  }

  .icons {
    flex-direction: row;
  }

  .right-side {
    width: 100%;
    height: fit-content;
  }

  .left-side {
    height: fit-content;
    width: 100%
  }

  .icons img {
    margin-right: 10px;
  }

  .doctor-card {
    display: grid;
  }

  .card-doc {
    display: grid;
  }
}
</style>
