<template>
    <div class="parent">
        <!-- Drawer Toggle Button for smaller screens -->
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
                            class="icon" /><span>Schedule Time</span></a>
                </div>
                <div class="grid">
                    <a href=""><img :src="require('../components/img/icon4.png')" alt="Icon 1"
                            class="icon" /><span>Chats</span></a>
                </div>
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
            <div class="form">
                <div class="inputs">
                    <h2>Logout</h2>
                    <label for="email">Email</label>
                    <input style="padding: 15px;" id="email" type="email" placeholder="Enter your email..." v-model="email" />
                </div>
                <button class="save" style="width: 60%;" @click="logout()">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "logoutComponent",
    data() {
        return {
            openDrawer: false,
            email: '',
        };
    },
    methods:{
        logout(){
            const email = localStorage.getItem('email')
            if(this.email === email){
                localStorage.removeItem('id');
                localStorage.removeItem('email');
                localStorage.removeItem('phoneNumber');
            }else{
                alert('Email is not correct');
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

/* Drawer icon for smaller screens */
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

/* Left-side drawer styling */
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
    overflow-y: auto;
    transition: transform 0.3s ease;
}

.left-side.open {
    transform: translateX(0);
}

@media (max-width: 1439px) {
    .drawer-icon {
        display: block;
    }

    .left-side {
        position: fixed;
        left: 0;
        top: 0;
        width: 250px;
        transform: translateX(-100%);
    }

    .left-side.open {
        transform: translateX(0);
    }

    .right-side {
        padding-left: 10px;
        margin-left: 10px;
        width: 100%;
    }
}

.icons a {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    font-size: 1.2em;
    margin-top: 30px;
    font-weight: bold;
}

.icons img {
    width: 30px;
    margin-right: 10px;
}

.acc {
    margin-top: 100px;
    font-size: 1.5em;
    font-weight: bold;
    color: white;
}

/* Center the form horizontally and vertically */
.right-side {
    width: 80%;
    display: flex;
    justify-content: center; /* Centers form horizontally */
    align-items: center;     /* Centers form vertically */
    padding: 20px;
    border-radius: 10px 0 0 10px;
}

/* Form styling */
.form {
    width: 100%;       /* Optional: limits form width */
    border: 1px solid rgba(142, 66, 179, 1);
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;  /* Centers content vertically */
    align-items: center;
    height: 80vh;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;
}

label {
    font-size: 1.2em;
    color: rgba(142, 66, 179, 1);
}

.save {
    padding: 15px;
    width: 100%;
    background-color: rgba(142, 66, 179, 1);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: x-large;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .parent {
        flex-direction: column;
        align-items: center;
    }

    .right-side {
        width: 90%;
    }

    .inputs {
        width: 100%;
    }
}

h2{
    color: rgba(142, 66, 179, 1);
}

input{
    border-radius: 25px 25px 25px 25px;
    border: none;
}
</style>
