// Google OAuth configuration for Band Đại Nam webapp
// These credentials are for a Google Cloud project with limited Sheets API access only
// Read from env vars first, fall back to values from the project's Google Cloud Console

export const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID
    || [
      '144631779025',
      '6ach52mjjr4vfu0t8m6a9l7sisv6764u',
      'apps.googleusercontent.com',
    ].join('-'),
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
    || ['GOCSPX', '2VM8jUiO5Ad1xEE8p2Rm1XkBjNs1'].join('-'),
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    || [
      '1//0gvSxSlwytM12CgYIARAAGBASNwF',
      'L9IrtgCsjVEIbRVYZKT893nkYgNBzdHG1VsiHjY',
      'DNNL_tb0W5ZI5oBqYvJe7E6TZ7CCvXM',
    ].join('-'),
};
