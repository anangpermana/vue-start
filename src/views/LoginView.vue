<template>
    <div>
        <div v-if="message" class="alert alert-warning">
            {{message}}
        </div>
        <p>Login</p>
        <form @submit.prevent="login">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="dataUser.email" :class="{'is-invalid' : errors.email}" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                <div class="invalid-feedback">{{errors.email}}</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="dataUser.password" :class="{'is-invalid' : errors.password}" type="password" class="form-control" id="exampleInputPassword1">
                <div class="invalid-feedback">{{errors.password}}</div>

            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import { ref, reactive } from 'vue';
    import { useAuthStore } from '@/store'

    export default ({
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
            const login = () => {
                const authStore = useAuthStore()
                console.log('login')
                console.log(dataUser.email)
                return authStore.login(dataUser.email, dataUser.password)
                .catch(err => {
                    // console.log(err)
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
                
            }

            return {
                login,
                dataUser,
                message,
                errors
            }
        }
    })
</script>