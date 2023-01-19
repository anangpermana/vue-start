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
                this.user = user.data
                localStorage.setItem('user', JSON.stringify(user.data))
                router.push('/')
            } catch (error) {
                throw error
            }
        },
        async register(dataUser) {
            try {
                const register = await fetcWrapper.post(`${baseUrl}/auth/register`, dataUser)
                if(register.status) {
                    router.push('/confirm')
                }
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