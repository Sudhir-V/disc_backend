const axios = require('axios');

const MSG91_URL = "https://api.msg91.com/api/v5";
const AUTH_KEY = "115744ANcrbhctQw255a97aa34";
const TEMPLATE_ID = "62fbaa73d646b500b9095a12";

/**
 * Send OTP via Msg91
 * @param {string} mobile - 10 digit mobile number
 */
exports.sendOtp = async (mobile) => {
    try {
        // Construct URL: BASE/otp?authkey=...&mobile=91...&template_id=...
        const url = `${MSG91_URL}/otp?authkey=${AUTH_KEY}&mobile=91${mobile}&template_id=${TEMPLATE_ID}`;

        // Msg91 expects a POST body, often with context. Their docs say body `{"APP":"App Name"}` is fine.
        const response = await axios.post(url, { APP: "DISC Assessment" });
        return response.data;
    } catch (error) {
        console.error("Msg91 Send OTP Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Retry OTP via Msg91
 * @param {string} mobile - 10 digit mobile number
 */
exports.retryOtp = async (mobile) => {
    try {
        // URL: BASE/otp/retry?authkey=...&mobile=91...&retrytype=text
        const url = `${MSG91_URL}/otp/retry?authkey=${AUTH_KEY}&mobile=91${mobile}&retrytype=text`;

        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error("Msg91 Retry OTP Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Verify OTP via Msg91
 * @param {string} mobile - 10 digit mobile number
 * @param {string} otp - The OTP to verify
 */
exports.verifyOtp = async (mobile, otp) => {
    try {
        // URL: BASE/otp/verify?authkey=...&mobile=91...&otp=...
        const url = `${MSG91_URL}/otp/verify?authkey=${AUTH_KEY}&mobile=91${mobile}&otp=${otp}`;

        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        // Msg91 throws 4xx if OTP is invalid
        console.error("Msg91 Verify OTP Error:", error.response?.data || error.message);
        // We might want to handle this gracefully or let controller catch it
        // If it's a verification failure, we usually get a specific type in response data if successful request but failed verification logic
        // But Msg91 API typically returns error status for bad OTP.
        throw error;
    }
};
