import { defineStore } from 'pinia';
import { fetcWrapper } from '../utils';
import router from '../router';
const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            try {
                const user = await fetcWrapper.post(`${baseUrl}/auth/login`, {email, password})
                console.log(user)
                this.user = user
                localStorage.setItem('user', JSON.stringify(user))
                router.push('/')
            } catch (error) {
                throw error
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
})