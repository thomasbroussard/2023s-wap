// UserService.ts
import axiosInstance from './axiosInstance';

export class UserService {
    static async getUsers(page: number = 1) {
        try {
            const response = await axiosInstance.get(`http://localhost:8080/apiman-gateway/default/users/1.0?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            return response.data; // Adjust according to the new format
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
}
