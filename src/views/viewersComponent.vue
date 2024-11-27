<template>
  <div>
    <video ref="remoteVideo" autoplay playsinline></video>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: null,          // Socket instance
      roomName: "room123",   // Room name (can be dynamic)
      peerConnection: null,  // WebRTC PeerConnection
      remoteStream: null,    // Remote video stream
    };
  },
  created() {
    // Start the viewing process when the component is mounted
    this.startViewing();
  },
  methods: {
    // Initialize socket connection and start listening
    startViewing() {
      this.socket = io("https://backend-my-doctor-1.onrender.com");

      this.socket.on(`offer/${this.roomName}`, ({ offer }) => {
        console.log("Received offer:", offer);
        this.handleOffer(offer);
      });

      this.socket.on(`ice-candidate/${this.roomName}`, ({ candidate }) => {
        console.log("Received ICE candidate:", candidate);

        // Ensure peerConnection is defined before calling addIceCandidate
        if (this.peerConnection) {
          this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
            .catch((err) => {
              console.error("Error adding ICE candidate:", err);
            });
        } else {
          console.log("Peer connection not yet established, candidate not added.");
        }
      });


      this.socket.on(`answer/${this.roomName}`, ({ answer }) => {
        console.log("Received answer:", answer);
        this.handleAnswer(answer);
      });

      this.setupPeerConnection();
    },

    // Set up peer connection for the viewer
    setupPeerConnection() {
      this.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      this.peerConnection.ontrack = (event) => {
        this.remoteStream = event.streams[0];
        this.$refs.remoteVideo.srcObject = this.remoteStream;
      };

      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate:", event.candidate);
          this.socket.emit("ice-candidate", {
            candidate: event.candidate,
            roomName: this.roomName,
          });
        }
      };
    },

    // Handle the offer received from the broadcaster
    // Handle the offer received from another peer
    handleOffer(offer) {
      // Check if the peer connection is in a stable state before processing the offer
      if (this.peerConnection.signalingState !== "stable") {
        console.log("PeerConnection is not in a stable state, ignoring offer");
        return; // Ignore offer if not in the correct state
      }

      // Set the remote description with the offer
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => {
          console.log("Remote description set successfully");

          // Create an answer after setting the remote description
          return this.peerConnection.createAnswer();
        })
        .then((answer) => {
          console.log("Answer created successfully");

          // Send the answer to the server
          this.socket.emit("answer", { answer, roomName: this.roomName });

          // Set the local description with the answer
          return this.peerConnection.setLocalDescription(answer);
        })
        .then(() => {
          console.log("Local description set successfully");

          // Handle any ICE candidates once the descriptions are set
          this.iceCandidates.forEach((candidate) => {
            this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
              .catch((err) => {
                console.error("Error adding ICE candidate:", err);
              });
          });

          // Clear the ICE candidates array
          this.iceCandidates = [];
        })
        .catch((err) => {
          console.error("Error handling offer:", err);
        });
    },

    // Handle the answer received from the other peer
    handleAnswer(answer) {
      // Ensure the peer connection is in the correct state before handling the answer
      if (this.peerConnection.signalingState === "stable") {
        console.log("PeerConnection is in the 'stable' state, ignoring answer.");
        return;
      }

      // Handle the answer only if the peer connection is in the 'have-remote-offer' state
      if (this.peerConnection.signalingState !== "have-remote-offer") {
        console.log("PeerConnection is not in the 'have-remote-offer' state, cannot set remote answer.");
        return;
      }

      // Set the remote description with the answer
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
        .then(() => {
          console.log("Remote description set with the answer successfully");
        })
        .catch((err) => {
          console.error("Error handling remote answer:", err);
        });
    },
  },

  beforeUnmount() {
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  },
};
</script>
