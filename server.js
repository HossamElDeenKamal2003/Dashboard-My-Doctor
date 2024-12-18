const wbm = require('wbm');
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require('./controller/booking/offerWebsocket');
const offerController = require('./controller/booking/offers')
const tripSocketHandler = require('./controller/booking/allTripswebSocket');
const chatHandler = require('./controller/chating/newChatHandler');
const chatRoutes = require('./router/chatingRouter/createChat2');
const { driverDataHandler } = require('./controller/booking/statusTripSockets/acceotTripSockets');

dotenv.config();
console.log(process.env.NODE_ENV);
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

//connected to MONGODB
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process with failure code
    });

// Ensure the directory exists before setting up multer storage
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for local file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

// Import routes
const user = require("./router/userRouter/userRouter");
const driver = require("./router/userRouter/driverRouter");
const book = require("./router/bookTrip/bookingRouting");
const userProfile = require("./router/userProfile/patchUser");
const driverProfile = require("./router/userProfile/patchDriver");
const prices = require("./router/bookTrip/priceRouter");
const createChat = require("./router/chatingRouter/createChat");
const admin = require('./router/admin/adminRouters');
const supportChat = require('./router/supportChatrouter');
// Middleware for static files
app.use('support-chat', supportChat);
app.use("/uploads", express.static(uploadDir));
app.use("/auth", user);
app.use("/authdriver", driver);
app.use("/book", book);
app.use("/user-profile", userProfile);
app.use("/driverprofile", driverProfile);
app.use("/prices", prices);
app.use("/create", createChat);
app.use("/admin", admin);
app.use('/chat', chatRoutes);

// Track user searches
const userSearches = new Map(); // Map<socketId, searchCriteria>

const locationHandler = require('./controller/booking/driverDest'); // Adjust the path as necessary
const costHandler = require('./controller/booking/costUpdate');
const handleSocketConnection = require('./controller/booking/tripsPending');
offerController.setSocketInstance(io);

// Initialize WebSocket handler
// socketHandler(io);
socketHandler(io);
tripSocketHandler(io);
costHandler(io);
//driverSocketHandler(io); // Driver-specific WebSocket handler
chatHandler(io);
//tripStatusHandler(io);
driverDataHandler(io);
locationHandler(io) // Attaches the socket instance to the HTTP server
handleSocketConnection(io);
//updateLocation(io);

global.io = io;
//const io = new Server(server);
const connectedUsers = {}; // Change from Map to an object

io.on('connection', (socket) => {
    console.log('New connection');
    // When a user disconnects
    socket.on('disconnect', () => {
        // Remove userId from connectedUsers if necessary
        console.log('disconnected')
    });
});

module.exports = { connectedUsers, io };
app.get("/", (req, res) => {
    res.send("Express");
});

app.get('/payment-result', (req, res) => {
    res.send("Payment Successful! Transaction ID: " + transaction_id);
});


app.get('/payment-callback', (req, res)=>{
    res.status('payment callback')
})

app.get('/home', (req, res)=>{
    
});

app.get('/privacy-policy', (req, res) => {
    res.render(path.join(__dirname, 'views', 'index.ejs'));
  });
  

const axios = require('axios');



app.post('/pay', async (req, res) => {
    const { amount, currency, customerDetails } = req.body;

    const data = {
        profile_id: process.env.PAYTABS_PROFILE_ID,  // Set PayTabs Profile ID in .env
        tran_type: 'sale',
        tran_class: 'ecom',
        cart_id: `cart_${Date.now()}`,
        cart_description: "Product Purchase",
        cart_currency: currency,
        cart_amount: amount,
        customer_details: customerDetails,
        return: 'https://backend-5ig1.onrender.com/payment-result', 
        callback: 'https://backend-5ig1.onrender.com/payment-callback'
    };

    try {
        const response = await axios.post('https://secure-egypt.paytabs.com/payment/request', data, {
            headers: {
                'Authorization': "SMJ9NJNMKR-JJWL2MBMTZ-GGTWRWK2ZB"
            }
        });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Payment initiation error:", error);
        res.status(500).send("Payment initiation failed.");
    }
});


// Payment result route to handle the return from PayTabs
app.post('/payment-result', (req, res) => {
    // Log the request body to inspect what is returned by PayTabs
    console.log('Payment result data:', req.body);

    try {
        // Extract 'tran_status' (or the correct field) from the request body
        const tranStatus = req.body.tran_status; // Adjust according to PayTabs response format
        
        if (tranStatus === 'A') { // Assuming 'A' means the payment was approved
            res.json({ message: 'Payment succeeded' });
        } else if (tranStatus === 'D') { // Assuming 'D' means payment was declined
            return res.status(400).json({ message: 'Payment declined. Please try again.' });
        } else if (tranStatus === 'V') { // Assuming 'V' means the payment was voided
            return res.status(400).json({ message: 'Payment voided.' });
        } else {
            res.status(400).json({ message: 'Payment failed or unknown status' });
        }
    } catch (error) {
        console.error("Error verifying payment result:", error);
        res.status(500).json({ message: error.message });
    }
});
// wbm.start().then(async () => {
//     const phones = ['01011905009'];
//     const message = 'Good Morning.';
//     await wbm.send(phones, message);
//     await wbm.end();
// }).catch(err => console.log(err));
// // Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// Handle graceful shutdown 
process.on("SIGTERM", () => {
    server.close(() => {
        console.log("Process terminated");
    });
});
module.exports = app;
// Utility function to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
}