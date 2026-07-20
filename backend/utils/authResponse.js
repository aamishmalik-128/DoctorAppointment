const buildAuthResponse = (user, accessToken) => {

    return {

        accessToken,

        user: {

            id: user._id,

            fullName: user.fullName,

            email: user.email,

            role: user.role,

        },

    };

};