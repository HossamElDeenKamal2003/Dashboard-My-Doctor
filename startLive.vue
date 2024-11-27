<template>
    <div>
        <button @click="startStreaming">Start Streaming</button>
        <!-- Local Video -->
        <video ref="localVideo" autoplay playsinline muted></video>
        <!-- Remote Video -->
        <video ref="remoteVideo" autoplay playsinline></video>
    </div>
</template>

<script>
import io from "socket.io-client";

export default {
    data() {
        return {
            socket: null,           // Socket instance
            roomName: "room123",    // Room name (can be dynamic)
            peerConnection: null,   // WebRTC PeerConnection
            localStream: null,      // Local video stream
            isStreaming: false,     // Streaming status
            iceCandidates: [],      // Store ICE candidates until remote description is set
        };
    },
    methods: {
        // Start streaming and initialize the socket connection
        startStreaming() {
            this.socket = io("https://backend-my-doctor-1.onrender.com");

            this.socket.on(`offer/${this.roomName}`, ({ offer }) => {
                console.log("Received offer:", offer);
                this.handleOffer(offer);
            });

            this.socket.on(`ice-candidate/${this.roomName}`, ({ candidate }) => {
                console.log("Received ICE candidate:", candidate);
                this.addIceCandidate(candidate);
            });

            this.socket.on(`answer/${this.roomName}`, ({ answer }) => {
                console.log("Received answer:", answer);
                this.handleAnswer(answer);
            });

            // Get the user's media (video/audio)
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    this.localStream = stream;
                    this.$refs.localVideo.srcObject = stream; // Show local video stream
                    this.setupPeerConnection();
                })
                .catch((err) => console.log("Error getting media:", err));
        },

        // Set up the WebRTC peer connection
        setupPeerConnection() {
            this.peerConnection = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            });

            // Add the local stream to the peer connection
            this.localStream.getTracks().forEach((track) => {
                this.peerConnection.addTrack(track, this.localStream);
            });

            // Send ICE candidates to the server
            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log("Sending ICE candidate:", event.candidate);
                    this.socket.emit("ice-candidate", {
                        candidate: event.candidate,
                        roomName: this.roomName,
                    });
                }
            };

            // Handle incoming media tracks from the remote peer
            this.peerConnection.ontrack = (event) => {
                if (event.track.kind === "video") {
                    const remoteStream = event.streams[0];
                    this.$refs.remoteVideo.srcObject = remoteStream; // Set the remote video stream to the video element
                }
            };

            // Create and send offer to the server
            this.peerConnection
                .createOffer()
                .then((offer) => {
                    console.log("Sending offer:", offer);
                    this.socket.emit("offer", { offer, roomName: this.roomName });
                    this.peerConnection.setLocalDescription(offer);
                })
                .catch((err) => console.error("Error creating offer:", err));
        },

        // Handle the offer received from another peer
        handleOffer(offer) {
            // Check if the peer connection is in a stable state

            // Set the remote description with the offer
            this.peerConnection
                .setRemoteDescription(new RTCSessionDescription(offer))
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
                        this.peerConnection
                            .addIceCandidate(new RTCIceCandidate(candidate))
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
            // Ensure the peer connection is in the right state before setting the remote answer
            if (this.peerConnection.signalingState !== "have-local-offer") {
                console.log("PeerConnection is not in the right state to set remote answer");
                return;
            }

            this.peerConnection
                .setRemoteDescription(new RTCSessionDescription(answer))
                .catch((err) => {
                    console.log("Error handling answer:", err);
                });
        },

        // Add ICE candidate received from the server
        addIceCandidate(candidate) {
            if (this.peerConnection.remoteDescription) {
                // If remote description is set, add the candidate directly
                this.peerConnection
                    .addIceCandidate(new RTCIceCandidate(candidate))
                    .catch((err) => {
                        console.log("Error adding ICE candidate:", err);
                    });
            } else {
                // Otherwise, store the candidate temporarily
                this.iceCandidates.push(candidate);
            }
        },

        // Handle the 'negotiationneeded' event
        handleNegotiationNeeded() {
            this.peerConnection.onnegotiationneeded = () => {
                console.log(
                    "Negotiation needed - connection state: ",
                    this.peerConnection.signalingState
                );
                // Call your offer handling logic here
            };
        },
    },

    // Cleanup WebRTC resources on component unmount
    beforeUnmount() {
        if (this.peerConnection) {
            this.peerConnection.close();
        }
    },
};
</script>