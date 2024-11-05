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
        </div>

        <!-- Right-Side Form Section -->
        <div class="right-side">
            <div style="display: flex; margin-top: 15px;">
                <label for="form">Settings</label>
            </div>
            <div class="label_form">
                <label for="form">Account Details</label>
            </div>
            <div class="form" id="form">
                <div class="inputs">
                    <label for="name">Name</label>
                    <input style="padding: 15px;" id="name" type="text" placeholder="Enter your name..." />

                    <label for="email">Email</label>
                    <input style="padding: 15px;" id="email" type="email" placeholder="Enter your email..." />

                    <label for="phone">Phone Number</label>
                    <input style="padding: 15px;" id="phone" type="tel" placeholder="Enter your phone number..." />

                    <label for="specialization">Specialization</label>
                    <select style="padding: 15px;" id="specialization">
                        <option disabled selected>Select your specialization...</option>
                        <option>Web Development</option>
                        <option>Mobile Development</option>
                        <option>Data Science</option>
                        <option>Machine Learning</option>
                    </select>
                    <label for="about">About Me</label>
                    <textarea id="about" rows="5" placeholder="Tell us about yourself..."></textarea>
                    <div>
                        <button style="margin-top: 50px; color: white; border-radius: 25px 25px 25px 25px; font-size: x-large;" class="save">Save Buttons</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "setttingComponent",
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

.grid {
    transform: translateX(20%);
}

.acc {
    position: relative;
    transform: translateX(-20%);
}


.right-side {
    width: 80%;
    padding: 20px;
    border-radius: 10px 0 0 10px;
    border: 1px solid rgba(142, 66, 179, 1);
}

label {
    color: rgba(142, 66, 179, 1);
    font-size: 1.5em;
}

.form {
    margin-top: 60px;
    height: max-content;
    border: 1px solid rgba(142, 66, 179, 1);
    display: flex;
    justify-content: center;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
    width: 40%;
}



.inputs label {
    font-size: 1.2em;
    color: rgba(142, 66, 179, 1);
    font-weight: bold;
}

.inputs input,
.inputs select,
.inputs textarea {
    padding: 10px;
    font-size: 1em;
    border: 1px solid rgba(142, 66, 179, 0.6);
    border-radius: 5px;
    background-color: #f9f9f9;
    color: #333;
}

.inputs input:focus,
.inputs select:focus,
.inputs textarea:focus {
    outline: none;
    border-color: rgba(142, 66, 179, 1);
    box-shadow: 0 0 5px rgba(142, 66, 179, 0.5);
}

.inputs select {
    cursor: pointer;
    background-color: #fff;
}

.form {
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
}

.save {
    padding: 15px;
    width: 100%;
    background-color: rgba(142, 66, 179, 1);
    border: none;
}
.inputs input,
.inputs select,
.inputs textarea {
    padding: 10px;
    font-size: 1em;
    border: 1px solid rgba(142, 66, 179, 0.6);
    border-radius: 25px 25px 25px 25px; /* Make this round */
    background-color: #fff;
    color: #333;
    width: 100%;
}

.parent {
    display: flex;
    flex-wrap: wrap;
    background: rgba(242, 214, 246, 0.5);
    justify-content: space-around;
}

/* Left-side Drawer Styling */
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
    transition: transform 0.3s ease;
    overflow-y: auto;
}

.left-side.open {
    transform: translateX(0);
}

/* Drawer toggle button (hamburger icon) */
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

.grid {
    transform: translateX(20%);
}

/* Right-side Form Section */
.right-side {
    width: 80%;
    padding: 20px;
    border-radius: 10px 0 0 10px;
    border: 1px solid rgba(142, 66, 179, 1);
}

label {
    color: rgba(142, 66, 179, 1);
    font-size: 1.5em;
}

.form {
    margin-top: 60px;
    height: max-content;
    border: 1px solid rgba(142, 66, 179, 1);
    display: flex;
    justify-content: center;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
    width: 100%; /* Full-width for mobile screens */
}

.inputs input,
.inputs select,
.inputs textarea {
    padding: 10px;
    font-size: 1em;
    border: 1px solid rgba(142, 66, 179, 0.6);
    border-radius: 25px; /* Rounded corners */
    background-color: #fff;
    color: #333;
    width: 100%;
}

.inputs{
    width: 50%;
}

.save {
    padding: 15px;
    width: 100%;
    background-color: rgba(142, 66, 179, 1);
    border: none;
    border-radius: 25px; /* Rounded save button */
    color: white;
    font-size: x-large;
    margin-top: 50px;
}

/* Responsive Styling */
@media (max-width: 1439px) {
    .drawer-icon {
        display: block; /* Show drawer icon on smaller screens */
    }

    .right-side {
        width: 100%;
        margin-left: 10px;
        padding: 10px;
    }
}

@media (max-width: 768px) {
    /* Adjust layout for very small screens */
    .parent {
        flex-direction: column;
        align-items: center;
    }

    

    .right-side {
        width: 90%;
        padding: 15px;
    }

    .inputs {
        width: 100%;
    }
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

.grid {
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

</style>