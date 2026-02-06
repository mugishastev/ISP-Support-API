export const jwtConfig = {
    access: {
        secret: process.env.JWT_ACCESS_SECRET || 'access-secret-key-change-in-production',
        expiresIn: 900, // 15 minutes in seconds
    },
    refresh: {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key-change-in-production',
        expiresIn: 604800, // 7 days in seconds
    },
};
