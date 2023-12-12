import axios from 'axios';
// define an interceptor
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/apiman-gateway/default/users/1.0'
});

async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    const params = new URLSearchParams();
    params.append('client_id', 'test-client'); // Replace with your client ID
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    try {
        const response = await axios.post(
            'http://localhost:8080/auth/realms/myCoolRealm/protocol/openid-connect/token',  params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token, refresh_token: newRefreshToken } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', newRefreshToken);
        return access_token;
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Handle refresh token failure (e.g., redirect to login)
        throw error;
    }
}


axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401 && !error.config._retry) {
            error.config._retry = true;
            try {
                const newAccessToken = await refreshToken(); // Implement refreshToken function
                error.config.headers['Authorization'] = 'Bearer ' + newAccessToken;
                return axiosInstance(error.config);
            } catch (refreshError) {
                // Handle failed refresh here
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);



export default axiosInstance;