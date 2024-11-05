<template>
    <div class="parent">
        <button class="drawer-icon" @click="openDrawer = !openDrawer">
            <span>&#9776;</span> <!-- Hamburger icon -->
        </button>

        <!-- Left-Side Drawer Menu -->
        <div :class="['left-side', { 'open': openDrawer }]">
            <div class="icons">
                <hr />
                <div class="grid">
                    <a href=""><img :src="require('../components/img/icon6.png')" alt="Icon 3"
                            class="icon" /><span>Overview</span></a>
                </div>
                <div class="grid">
                    <a href=""><img :src="require('../components/img/icon1.png')" alt="Icon 1"
                            class="icon" /><span>Appointments</span></a>
                </div>
                <div class="grid">
                    <a href=""><img :src="require('../components/img/icon2.png')" alt="Icon 2"
                            class="icon" /><span>Schedule
                            Time</span></a>
                </div>
                <div class="grid"> <a href=""><img :src="require('../components/img/icon4.png')" alt="Icon 1"
                            class="icon" /><span>Chats</span></a></div>
                <div class="grid">
                    <h3 style="margin-top: 100px" class="acc">Account</h3>
                </div>
                <div class="grid">
                    <a href=""><img :src="require('../components/img/icon3.png')" alt="Icon 3"
                            class="icon" /><span>Settings</span></a>
                </div>
                <div class="grid">
                    <a href=""><img :src="require('../components/img/icon5.png')" alt="Icon 2"
                            class="icon" /><span>Logout</span></a>
                </div>
                <div class="grid">
                    <a href=""><img :src="require('../components/img/messages (1).png')" alt="Icon 2"
                            class="icon" /></a>
                </div>
            </div>
            <div class="emergency">
                <hr />
                <h4>Emergency Hotlines</h4>
                <h4>01011905009</h4>
            </div>
        </div>
        <div class="right-side">
            <div class="search">
                <input type="text" v-model="searchWord" placeholder="Search here..." />
                <h3>Dr. Hossam</h3>
            </div>
            <div class="patients-cards">
                <div class="card" v-for="(patient, index) in paginatedPatients" :key="index">
                    <div class="image-container" style="margin-top: 50px;">
                        <img src="../components/img/hossam.png" class="card-img-top" alt="patient image" />
                    </div>
                    <div class="card-body">
                        <div class="title-container" style="margin-bottom: 100px;">
                            <h5 class="card-title">Hossam {{ index + 1 + (currentPage - 1) * itemsPerPage }}</h5>
                            <h5 class="card-subtitle">Male</h5>
                        </div>
                        <div class="buttons">
                            <a href="#" class="btn">Phone Number</a>
                            <a href="#" class="btn add-report">Add Report</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination">
                <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "patientComponent",
    data() {
        return {
            openDrawer: false,
            searchWord: "",
            currentPage: 1,
            itemsPerPage: 8,
            patients: Array.from({ length: 50 }) // Example: 50 patients
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.patients.length / this.itemsPerPage);
        },
        paginatedPatients() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.patients.slice(start, start + this.itemsPerPage);
        }
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    }
};
</script>

<style scoped>
.parent {
    display: flex;
    flex-wrap: wrap;
    background: rgba(242, 214, 246, 0.5);
    justify-content: space-around;
}



.left-side {
    width: 12%;
    background: rgba(142, 66, 179, 1);
    height: 100vh;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: white;
    overflow: auto;
}

.grid{
    display: grid;
    grid-template-columns: auto auto;
    text-align: center;
}

.icons {
    width: 100%;
    text-align: center;
    margin-top: 120px;
}

.icons a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-size: 1.2em;
    margin-top: 30px;
}

.icons img {
    width: 30px;
    margin-right: 10px;
}

.emergency {
    margin-top: auto;
    text-align: center;
}

.right-side {
    width: 80%;
    padding: 20px;
}

.search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(142, 66, 179, 1);
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 20px;
    color: white;
}

.search input[type="text"] {
    width: 70%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
}

.search input[type="text"]::placeholder {
    color: #aaa;
}

.patients-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* Space between cards */
}

.card {
    width: calc(25% - 10px);
    /* 4 cards per row with margin */
    margin: 5px;
    /* Add margin for spacing between cards */
}

.image-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.card-img-top {
    width: 100px;
    /* Adjusted size for better fit */
    height: 100px;
    /* Adjusted size for better fit */
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(142, 66, 179, 1);
}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}

.card-title {
    margin: 0;
}

.card-subtitle {
    margin-top: 5px;
    font-size: 0.9em;
    color: grey;
}

.card-text {
    margin: 15px 0;
    color: #333;
}

.buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.btn {
    width: 100%;
    border: 1px solid grey;
    padding: 8px;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    color: black;
}

.add-report {
    background-color: rgba(142, 66, 179, 1);
    color: white;
}

/* Pagination styles */
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
}

.pagination button {
    padding: 10px 15px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    background-color: rgba(142, 66, 179, 1);
    color: white;
    cursor: pointer;
}

.pagination button:disabled {
    background-color: grey;
    cursor: not-allowed;
}

/* Responsive Styles */
@media (max-width: 1200px) {
    .card {
        width: calc(33.33% - 10px);
        /* 3 cards per row */
    }
}

@media (max-width: 800px) {
    .card {
        width: calc(50% - 10px);
        /* 2 cards per row */
    }
}

@media (max-width: 600px) {
    .card {
        width: calc(100% - 10px);
        /* 1 card per row */
    }
}

.drawer-icon {
    display: none;
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(142, 66, 179, 1);
    z-index: 1100;
}

/* Left-side Menu */
.left-side {
    background: rgba(142, 66, 179, 1);
    height: 100vh;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: white;
    transition: transform 0.3s ease;
    overflow-y: auto;
}

/* Drawer Toggle Effect */
.left-side.open {
    transform: translateX(0);
}

@media (max-width: 1439px) {
    .container {
        grid-template-columns: 1fr;
        /* Single column layout */
    }

    .drawer-icon {
        display: block;
        /* Show the drawer icon on smaller screens */
    }

    .left-side {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 250px;
        transform: translateX(-100%);
        z-index: 1000;
    }

    .left-side.open {
        transform: translateX(0);
        /* Slide-in effect */
    }

    .right-side {
        padding-left: 10px;
        margin-left: 10px;
    }

    .right-side {
        width: 100%;
    }
}

.icons a {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    justify-items: start;
    color: white;
    text-decoration: none;
    font-size: 1.2em;
    margin-top: 30px;
    font-weight: bold;
    
}

.icons img {
    width: 30px;
    /* no margin needed here since grid alignment handles spacing */
}

.grid{
    transform: translateX(20%);
}

.acc{
    position: relative;
    transform: translateX(-20%);
}

</style>