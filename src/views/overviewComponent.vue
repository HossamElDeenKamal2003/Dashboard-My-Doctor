//overview dashboard
<template>
    <div class="parent">
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <div class="logo">
          <p>my Logo</p>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">Login</a>
            </li>
          </ul>
        </div>
      </nav>
  
      <!-- Preloader -->
      <div v-if="loading" class="preloader">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
  
      <div v-else class="home">
        <div class="image-text">
          <div class="welcome-message">
            <h2>
              Hello, My Doctor Application Welcome everyone, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus voluptatum aspernatur doloribus atque expedita quasi enim eveniet consequatur, voluptate cum velit ipsam facilis optio eum officiis illum eius fugiat doloremque!
            </h2>
          </div>
          <div class="image">
            <img src="../components/img/blog-sidebar3.jpg" alt="img" />
          </div>
        </div>
        <div class="container mt-4">
          <div class="row">  
            <div class="col-md-4">
              <div class="card hover-card">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">Basic Offer</h5>
                  <h6 class="card-subtitle mb-2 text-muted">$10/month</h6>
                  <p class="card-text">This is a basic offer providing essential services.</p>
                  <a href="#" class="btn btn-primary mt-auto">Choose</a>
                </div>
              </div>
            </div>
  
            <div class="col-md-4">
              <div class="card hover-card">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">Standard Offer</h5>
                  <h6 class="card-subtitle mb-2 text-muted">$20/month</h6>
                  <p class="card-text">This standard offer includes additional services.</p>
                  <a href="#" class="btn btn-primary mt-auto">Choose</a>
                </div>
              </div>
            </div>
  
            <div class="col-md-4">
              <div class="card hover-card">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">Premium Offer</h5>
                  <h6 class="card-subtitle mb-2 text-muted">$30/month</h6>
                  <p class="card-text">This premium offer includes all services with extra benefits.</p>
                  <a href="#" class="btn btn-primary mt-auto">Choose</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "overView",
    data() {
      return {
        loading: true, // Set loading to true initially
      };
    },
    mounted() {
      // Simulate a loading delay
      setTimeout(() => {
        this.loading = false; // Set loading to false after 2 seconds
      }, 2000); // Adjust the time as needed
    },
  };
  </script>
  
  <style scoped>
  .image-text {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .logo p {
    font-size: 1.5rem;
    margin: 0;
  }
  
  .home {
    height: 95vh;
    background: rgba(142, 66, 179, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    flex-wrap: wrap;
  }
  
  .home .image img {
    border-radius: 50%;
  }
  
  .card {
    display: flex;
    flex-direction: column;
    height: 100%; /* Make cards full height */
    transition: transform 0.3s ease; /* Smooth transition for hover effect */
  }
  
  .card-body {
    flex: 1; /* Allow card-body to expand and take up remaining space */
  }
  
  .hover-card:hover {
    transform: scale(1.05); /* Scale up the card slightly on hover */
  }
  
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 9999; 
  }
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  </style>
  