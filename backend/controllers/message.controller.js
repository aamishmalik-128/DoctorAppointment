import * as messageService from "../services/message.services.js";

export const sendMessage = async (req, res, next) => {
    try {

        const message = await messageService.sendMessage(
            req.user.id,
            req.user.role,
            req.body.conversationId,
            req.body.message
        );

        return res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            data: message,
        });

    } catch (error) {
        next(error);
    }
};

export const getConversationMessages = async (
    req,
    res,
    next
) => {
    try {

        const messages =
            await messageService.getConversationMessages(
                req.user.id,
                req.user.role,
                req.params.conversationId
            );

        return res.status(200).json({
            success: true,
            messages,
        });

    } catch (error) {
        next(error);
    }
};

export const markMessagesAsRead = async (
    req,
    res,
    next
) => {
    try {

        await messageService.markMessagesAsRead(
            req.user.id,
            req.user.role,
            req.params.conversationId
        );

        return res.status(200).json({
            success: true,
            message: "Messages marked as read.",
        });

    } catch (error) {
        next(error);
    }
};