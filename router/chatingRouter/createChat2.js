const express = require('express');
const router = express.Router();
const {
    createConversation,
    getConversationsByUserId,
    updateConversation,
    deleteConversation,
    sendMessage,
    getAllConversations,
    getAllMessages,
    getConversationById
} = require('../../controller/chating/chatController2');

// Create a new conversation
router.post('/', createConversation);

// Get all conversations for a user
router.get('/:userId', getConversationsByUserId);

// Update a conversation
router.put('/:conversationId', updateConversation);

// Delete a conversation
router.delete('/:conversationId', deleteConversation);

router.post('/sendMessage/:id', sendMessage);

router.get('/getAllconvrsations/:id', getAllConversations);
router.get('/getAllMessages/:id', getAllMessages)
router.get('/getConversationById/:id', getConversationById);
module.exports = router;