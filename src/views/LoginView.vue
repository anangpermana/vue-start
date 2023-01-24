<template>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            
        </div>

        <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div v-if="message" class="rounded-md bg-yellow-50 p-4">
                <div class="flex">
                <div class="flex-shrink-0">
                    <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-yellow-800">{{message}}</p>
                </div>
                </div>
            </div>
            <form class="space-y-6 mt-4" @submit.prevent="login">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
                <div class="mt-1 relative">
                    <input v-model="dataUser.email" id="email" name="email" type="email" autocomplete="email" required="" :class="[errors.email ? 'border border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500' , 'appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm']" />
                    <div v-if="errors.email" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                </div>
                <p class="mt-2 text-sm text-red-600" id="email-error">{{errors.email}}</p>

            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
                <div class="mt-1 relative">
                    <input v-model="dataUser.password" id="password" name="password" type="password" autocomplete="current-password" required="" :class="[errors.password ? 'border border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500' , 'appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm']" />
                    <div v-if="errors.password" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                </div>
                <p class="mt-2 text-sm text-red-600" id="email-error">{{errors.password}}</p>

            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
                </div>

                <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                </div>
            </div>

            <div>
                <button v-if="loading" disabled type="button" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                </button>
                <button v-else type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
            </div>
            </form>
        </div>
        </div>
    </div>
</template>
<script>
    import { ref, reactive } from 'vue';
    import { useAuthStore } from '@/store';
    import { ExclamationCircleIcon, ExclamationIcon } from '@heroicons/vue/solid'
    export default ({
        components: {
            ExclamationCircleIcon, ExclamationIcon
        },
        setup() {
            const dataUser = reactive({
                email: '',
                password: ''
            })
            const errors = reactive({
                email: '',
                password: ''
            })
            const message = ref('')
            const loading = ref(false)
            const authStore = useAuthStore()

            const login = async () => {
                console.log('login')
                loading.value = true
                console.log(dataUser.email)
                await authStore.login(dataUser.email, dataUser.password)
                .catch(err => {
                    console.log(err)
                    // console.log(errors)
                    message.value = err.message
                    if(err.errors) {
                        errors.email = ''
                        errors.password = ''
                        err.errors.map(item => {
                            let key = Object.keys(item)[0]
                            let val = Object.values(item)[0]
                            errors[key] = val
                        })
                    }else{
                        errors.email = ''
                        errors.password = ''
                    }
                    console.log(errors)
                })

                loading.value = false
                
            }

            return {
                login,
                dataUser,
                message,
                errors,
                loading
            }
        }
    })
</script>