<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">

        <div class="col-xl-10 col-lg-12 col-md-9">

            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="row">
                        <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        <div class="col-lg-6">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    <div v-if="message" class="alert alert-warning rounded-pill">{{message}}</div>
                                </div>
                                <form @submit.prevent="login" class="user">
                                    <div class="form-group">
                                        <input v-model="dataUser.email" type="email" :class="{'is-invalid' : errors.email}" class="form-control form-control-user"
                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                            placeholder="Enter Email Address..." required>
                                        <div class="invalid-feedback">{{errors.email}}</div>

                                    </div>
                                    <div class="form-group">
                                        <input v-model="dataUser.password" type="password" :class="{'is-invalid' : errors.password}" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password" required>
                                        <div class="invalid-feedback">{{errors.password}}</div>

                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox small">
                                            <input type="checkbox" class="custom-control-input" id="customCheck">
                                            <label class="custom-control-label" for="customCheck">Remember
                                                Me</label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-user btn-block">
                                        <div v-if="loading" class="spinner-border spinner-border-sm text-light" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <span v-else>Login</span>
                                    </button>

                                    <hr>
                                    <a href="index.html" class="btn btn-google btn-user btn-block">
                                        <i class="fab fa-google fa-fw"></i> Login with Google
                                    </a>
                                    <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                        <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                    </a>
                                </form>
                                <hr>
                                <div class="text-center">
                                    <a class="small" href="forgot-password.html">Forgot Password?</a>
                                </div>
                                <div class="text-center">
                                    <a class="small" href="register.html">Create an Account!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        </div>
    </div>
  </div>
</template>
<script>
    import { ref, reactive } from 'vue';
    import { useAuthStore } from '@/store';

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
<style>
  .container {
    min-height: 100vh;
  }
</style>