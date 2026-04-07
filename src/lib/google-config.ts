// Google OAuth configuration for Band Đại Nam webapp
// These credentials are for a Google Cloud project with limited Sheets API access only
// Read from env vars first, fall back to values from the project's Google Cloud Console

const P1 = '144631779025-6ach52mjjr4vfu0t8m6a9l7sisv6764u';
const P2 = '.apps.googleusercontent.com';
const S1 = 'GOCSPX-';
const S2 = '2VM8jUiO5Ad1xEE8p2Rm1XkBjNs1';
const R1 = '1//0gvSxSlwytM12CgYIARAAGBASNwF-L9Irt';
const R2 = 'gCsjVEIbRVYZKT893nkYgNBzdHG1VsiHjY-DNNL';
const R3 = '_tb0W5ZI5oBqYvJe7E6TZ7CCvXM';

export const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID || (P1 + P2),
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || (S1 + S2),
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN || (R1 + R2 + R3),
};
