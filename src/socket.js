import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  userId: "673879a6ac8248fa4c31bfdd", // Example userId, you can replace this dynamically
  streamTitle: "My Awesome Stream", // Example stream title
});

// const URL = process.env.NODE_ENV === "production"
//   ? "https://backend-my-doctor-1.onrender.com"
//   : "http://localhost:3000";

  const socket = io('https://backend-my-doctor-1.onrender.com');  // Example URL

socket.on("connect", () => {
  state.connected = true;
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("Socket disconnected:", socket.id);

});

socket.on("startStream", (stream) => {
  console.log("New stream started:", stream);
  state.fooEvents.push(`New stream: ${stream.title}`);
});

// Trigger to start the stream
export const startStream = () => {
  const { userId, streamTitle } = state;
  if (userId && streamTitle) {
    socket.emit("startStream", { userId, title: streamTitle });
  } else {
    console.error("UserId or Stream Title is missing!");
  }
};

socket.on("streamEnded", (streamId) => {
  console.log("Stream ended:", streamId);
  state.fooEvents.push(`Stream ended: ${streamId}`);
});

socket.emit("offer", (offer) => {
  // Handle offer from broadcaster (e.g., for viewers)
  console.log("Offer received:", offer);
});

socket.on("answer", (answer) => {
  // Handle answer from viewer to broadcaster
  console.log("Answer received:", answer);
});

socket.on("ice-candidate", (candidate) => {
  // Handle ICE candidates for peer connection
  console.log("ICE candidate received:", candidate);
});
export { socket };
