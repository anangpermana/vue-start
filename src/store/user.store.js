import { defineStore } from 'pinia';
import { fetcWrapper } from '../utils';
const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useUsersStore = defineStore({
    id:'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getMe() {
            this.users = {loading:true};
            fetcWrapper.get(`${baseUrl}/users/me`)
            .then(users => {
                if(users.status === 'success') {
                    this.users = users.data.user
                }
            })
            .catch(error => this.users = {error})
        }
    }
})