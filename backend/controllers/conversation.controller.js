import * as conversationService from "../services/conversation.services.js";

export const createOrGetConversation = async (
    req,
    res,
    next
) => {
    try {

        const conversation =
            await conversationService.createOrGetConversation(
                req.user.id,
                req.user.role,
                req.body.doctorId
            );

        return res.status(200).json({
            success: true,
            conversation,
        });

    } catch (error) {
        next(error);
    }
};

export const getMyConversations = async (
    req,
    res,
    next
) => {
    try {

        const conversations =
            await conversationService.getMyConversations(
                req.user.id,
                req.user.role
            );

        return res.status(200).json({
            success: true,
            conversations,
        });

    } catch (error) {
        next(error);
    }
};