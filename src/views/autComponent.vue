
//AuthComponent
<template>
  <div class="parent">
    <div class="cont" :class="{ 's--signup': isSignUp }">
      <div class="form sign-in">
        <div class="contain">
          <div class="first-line">
            <h1>M</h1>
            <img src="../assets/Logo App.jpg" alt="">
          </div>
          <div class="second-line">
            <h1>Doctor</h1>
          </div>
        </div>
        <label>
          <span>Phone Number</span> 
          <input type="email" v-model="signInForm.phoneNumber" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" v-model="signInForm.password" />
        </label>
        <!-- <p class="forgot-pass">Forgot password?</p> -->
        <button type="button" class="submit" @click="signIn">Sign In</button>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h3>Don't have an account? Please Sign up!</h3>
          </div>
          <div class="img__text m--in">
            <h3>If you already have an account, just sign in.</h3>
          </div>
          <div class="img__btn" @click="toggleSignUp">
            <span class="m--up">Sign Up</span>
            <span class="m--in">Sign In</span>
          </div>
        </div>
        <div class="form sign-up" style="overflow: auto;">
          <form id="signupForm" @submit.prevent="handleSignUp">
            <label>
              <span>Username</span>
              <input type="text" v-model="signUpForm.username" required />
            </label>
            <label>
              <span>Profile Image</span>
              <input type="file" @change="handleImageUpload" accept="image/*" required />
            </label>
            <label>
              <span>Role</span>
              <select v-model="signUpForm.role" required>
                <option value="">Select Role</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>
              <span>Meta Role</span>
              <select v-model="signUpForm.metaRole" required>
                <option value="">Select Meta Role</option>
                <option value="dentist">Dentist</option>
                <option value="pediatrician">Pediatrician</option>
                <option value="surgeon">Surgeon</option>
              </select>
            </label>
            <label>
              <span>Phone Number</span>
              <input type="tel" v-model="signUpForm.phoneNumber" required />
            </label>
            <label>
              <span>Gender</span>
              <input type="tel" v-model="signUpForm.gender" required />
            </label>
            <label>
              <span>Date Of Birth</span>
              <input type="text" v-model="signUpForm.date_of_birth" required />
            </label>
            <label>
              <span>Password</span>
              <input type="password" v-model="signUpForm.password" required />
            </label>
            <label>
              <span>Address</span>
              <input type="text" v-model="signUpForm.address" required />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
// import HomeComponent from './HomeComponent.vue';

import axios from 'axios';
export default {
  name: 'AuthComponent',
  data() {
    return {
      isSignUp: false,
      signInForm: {
        phoneNumber: '',
        password: ''
      },
      signUpForm: {
        username: '',
        profile_image: '',
        role: '',
        metaRole: '',
        phoneNumber: '',
        password: '',
        address: '',
        gender: '',
        date_of_birth: '',
        workDays: []  // This can be an array if needed
      }
    };
  },
  methods: {
    toggleSignUp() {
      this.isSignUp = !this.isSignUp;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.signUpForm.profile_image = file; // Store the file in the signUpForm
      }
    },
    signIn() {
      // Handle sign in logic here
      console.log('Sign In with:', this.signInForm);

      axios.post('https://backend-my-doctor-1.onrender.com/auth-org/signin', {
        phoneNumber: this.signInForm.phoneNumber,
        password: this.signInForm.password
      })
        .then(response => {
          console.log(response);
          localStorage.setItem('phoneNumber', response.data.user.phoneNumber); // Adjusted to access data correctly
        })
        .catch(error => {
          console.log(error);
        });
    },

    async handleSignUp() {
    console.log('Sign Up with:', this.signUpForm);
    console.log(this.signUpForm.date_of_birth);
    const formData = new FormData(); // Create FormData instance

    // Append each field from signUpForm to formData
    formData.append('username', this.signUpForm.username);
    formData.append('profile_image', this.signUpForm.profile_image); // Ensure this is a file input
    formData.append('role', this.signUpForm.role);
    formData.append('metaRole', this.signUpForm.metaRole);
    formData.append('phoneNumber', this.signUpForm.phoneNumber);
    formData.append('password', this.signUpForm.password);
    formData.append('address', this.signUpForm.address);
    formData.append('gender', this.signUpForm.gender);
    formData.append('date_of_birth', this.signUpForm.date_of_birth);
    formData.append('workDays', JSON.stringify(this.signUpForm.workDays)); // Append workDays as JSON

    try {
      const response = await fetch('https://backend-my-doctor-1.onrender.com/auth-org/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('User registered successfully');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up.');
    }
  },

  }
};
</script>

<style scoped>
.parent {
  background: rgba(142, 66, 179, 1);
  height: 100vh;
  display: flex;
  align-items: center;
}

.first-line {
  color: rgba(142, 66, 179, 1);
  display: flex;
  justify-content: space-between;
  width: 28%;

}

.contain {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.flex-line img {
  height: min-content;
}

.first-line h1 {
  font-size: 5em;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.contain {
  display: flex;
  flex-direction: column;
  /* Stack children vertically */
  align-items: center;
  /* Center horizontally */
}

.first-line {
  color: rgba(142, 66, 179, 1);
  display: flex;
  justify-content: space-between;
  width: 28%;
}

.second-line h1 {
  font-size: 2em;
  /* Adjust size if needed */
  color: rgba(142, 66, 179, 1);
  /* Match color to first-line */
  margin-top: 10px;
  /* Add some spacing if needed */
}

.img {
  background: rgba(142, 66, 179, 1);
}

select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid rgba(142, 66, 179, 1);
  /* Border color */
  border-radius: 5px;
  /* Rounded corners */
  background-color: white;
  /* Background color */
  color: rgba(142, 66, 179, 1);
  /* Text color */
  transition: all 0.3s ease;
  /* Smooth transition */
}

/* Hover effect */
select:hover {
  border-color: rgba(66, 142, 179, 1);
  /* Change border color on hover */
}

/* Focus effect */
select:focus {
  border-color: rgba(66, 142, 179, 1);
  /* Change border color when focused */
  outline: none;
  /* Remove outline */
}

/* Option styles */
option {
  padding: 10px;
  /* Padding for options */
}

/* Custom scrollbar for the dropdown */
select::-webkit-scrollbar {
  width: 8px;
  /* Width of the scrollbar */
}

select::-webkit-scrollbar-thumb {
  background: rgba(142, 66, 179, 1);
  /* Scrollbar color */
  border-radius: 5px;
  /* Rounded corners for the scrollbar */
}

select::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* Track color */
}

.sign-up {
  background-color: white;
}

.cont {
  height: 736px;
}

/* Your existing CSS with some tweaks for Vue's scoped styling */
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.img {
  color: rgb(114, 89, 170);
}

body {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  background: #ffffff;
}

input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

.cont {
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  width: 900px;
  height: 550px;
  margin: 0 auto 100px;
  background: #fff;
  box-shadow: -10px -10px 15px rgba(255, 255, 255, 0.3), 10px 10px 15px rgba(70, 70, 70, 0.15),
    inset -10px -10px 15px rgba(255, 255, 255, 0.3), inset 10px 10px 15px rgba(70, 70, 70, 0.15);
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: transform 1.2s ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: rgb(114, 89, 170);
  transition: transform 1.2s ease-in-out;
}

.cont.s--signup .sub-cont {
  transform: translate3d(-640px, 0, 0);
}

button {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  background: #d4af7a;
  text-transform: uppercase;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}

.img:before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  opacity: 0.8;
  background-size: cover;
  transition: transform 1.2s ease-in-out;
}

.img:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.cont.s--signup .img:before {
  transform: translate3d(640px, 0, 0);
}

.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: transform 1.2s ease-in-out;
}

.cont.s--signup .img__text.m--up {
  transform: translateX(520px);
}

.img__text.m--in {
  transform: translateX(-520px);
}

.cont.s--signup .img__text.m--in {
  transform: translateX(0);
}

.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}

.img__btn:after {
  content: '';
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 1.2s;
}

.img__btn span.m--in {
  transform: translateY(-72px);
}

.cont.s--signup .img__btn span.m--in {
  transform: translateY(0);
}

.cont.s--signup .img__btn span.m--up {
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}

label span {
  font-size: 12px;
  color: #cfcfcf;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #cfcfcf;
}
</style>
