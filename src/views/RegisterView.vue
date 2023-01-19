<template>
    <div class="bg-gradient-primary">
      <div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">
  
          <div class="col-lg-12 col-md-9">
  
              <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                      <!-- Nested Row within Card Body -->
                      <div class="row">
                          <div class="col-lg-5 d-none d-lg-block bg-login-image"></div>
                          <div class="col-lg-7">
                              <div class="p-5">
                                  <div class="text-center">
                                      <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                                      <div v-if="message" class="alert alert-warning rounded-pill">{{message}}</div>
                                  </div>
                                  <form @submit.prevent="register" class="user">
                                        <div class="form-group">
                                          <input v-model="dataUser.name" type="text" :class="{'is-invalid' : errors.name}" class="form-control form-control-user"
                                              id="exampleInputName" aria-describedby="emailHelp"
                                              placeholder="Enter Full Name" required>
                                          <div class="invalid-feedback">{{errors.name}}</div>
                                        </div>
                                      <div class="form-group">
                                          <input v-model="dataUser.email" type="email" :class="{'is-invalid' : errors.email}" class="form-control form-control-user"
                                              id="exampleInputEmail" aria-describedby="emailHelp"
                                              placeholder="Enter Email Address." required>
                                          <div class="invalid-feedback">{{errors.email}}</div>
  
                                      </div>
                                      <div class="form-group row">
                                          <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input v-model="dataUser.password" type="password" :class="{'is-invalid' : errors.password}" class="form-control form-control-user"
                                              id="exampleInputPassword" placeholder="Password" required>
                                            <div class="invalid-feedback">{{errors.password}}</div>
                                          </div>

                                          <div class="col-sm-6">
                                            <input v-model="dataUser.passwordConfirm" type="password" :class="{'is-invalid' : errors.passwordConfirm}" class="form-control form-control-user"
                                              id="exampleInputPasswordConfirm" placeholder="Password Confirm" required>
                                            <div class="invalid-feedback">{{errors.passwordConfirm}}</div>
                                          </div>
  
                                      </div>
                                      <button type="submit" class="btn btn-primary btn-user btn-block">
                                          <div v-if="loading" class="spinner-border spinner-border-sm text-light" role="status">
                                              <span class="sr-only">Loading...</span>
                                          </div>
                                          <span v-else>Register</span>
                                      </button>
  
                                      <hr>
                                      <a href="index.html" class="btn btn-google btn-user btn-block">
                                          <i class="fab fa-google fa-fw"></i> Register with Google
                                      </a>
                                      <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                          <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                      </a>
                                  </form>
                                  <hr>
                                  <div class="text-center">
                                    <a href="javascript:;" @click="$router.push('login')" class="small">Already have an Account!</a>
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
                  name:'',
                  email: '',
                  password: '',
                  passwordConfirm:''
              })
              const errors = reactive({
                    name: '',
                  email: '',
                  password: '',
                  passwordConfirm: ''
              })
              const message = ref('')
              const loading = ref(false)
              const authStore = useAuthStore()
  
              const register = async () => {
                  console.log('register')
                  loading.value = true

                  await authStore.register(dataUser)
                  .catch(err => {
                      console.log(err)
                      // console.log(errors)
                      message.value = err.message
                      if(err.errors) {
                        errors.name = ''
                        errors.email = ''
                        errors.password = ''
                        errors.passwordConfirm = ''

                        err.errors.map(item => {
                            console.log(item)
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
                  register,
                  dataUser,
                  message,
                  errors,
                  loading
              }
          }
      })
  </script>
  <style scoped>
    .container {
      min-height: 100vh;
    }
  </style>