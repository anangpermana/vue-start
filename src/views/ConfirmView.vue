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
                                      <h1 class="h4 text-gray-900 mb-4">Insert Confirmation Code!</h1>
                                      <p class="mb-4">We send confirmation code. Just enter your email address below
                                            and we'll send you confirmation code! </p>
                                      <div v-if="message" class="alert alert-warning rounded-pill">{{message}}</div>
                                  </div>
                                  <form @submit.prevent="confirm" class="user">
                                      <div class="form-group">
                                          <input v-model="dataForm.code" type="text" :class="{'is-invalid' : errors.code}" class="form-control form-control-user"
                                              id="exampleInputEmail" aria-describedby="emailHelp"
                                              placeholder="Enter Confirmation Code" required>
                                          <div class="invalid-feedback">{{errors.code}}</div>
  
                                      </div>
                                      <button type="submit" class="btn btn-primary btn-user btn-block">
                                          <div v-if="loading" class="spinner-border spinner-border-sm text-light" role="status">
                                              <span class="sr-only">Loading...</span>
                                          </div>
                                          <span v-else>Send</span>
                                      </button>
                                  </form>
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
              const dataForm = reactive({
                  code: ''
              })
              const errors = reactive({
                  code: ''
              })
              const message = ref('')
              const loading = ref(false)
              const authStore = useAuthStore()
              
              const confirm = async () => {
                  console.log('login')
                  loading.value = true
                  console.log(dataForm)
                  
                //   await authStore.login(dataForm)
                //   .catch(err => {
                //       console.log(err)
                //       // console.log(errors)
                //       message.value = err.message
                //       if(err.errors) {
                //           errors.code = ''
                //           err.errors.map(item => {
                //               let key = Object.keys(item)[0]
                //               let val = Object.values(item)[0]
                //               errors[key] = val
                //           })
                //       }else{
                //           errors.code = ''
                //       }
                //       console.log(errors)
                //   })
  
                  loading.value = false
                  
              }
  
              return {
                  confirm,
                  dataForm,
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