import axios from 'axios';

class AuthenticationService {
    private static tokenEndpoint = 'http://localhost:8080/auth/realms/myCoolRealm/protocol/openid-connect/token';

    static async login(username: string, password: string): Promise<void> {
        const params = new URLSearchParams();
        params.append('client_id', 'test-client');
        params.append('grant_type', 'password');
        params.append('username', username);
        params.append('password', password);

        try {
            const response = await axios.post(this.tokenEndpoint, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            console.log('Logged in successfully');
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // Re-throw to handle it in the component
        }
    }

    // Additional authentication methods (logout, token refresh, etc.) can be added here
}

export default AuthenticationService;
