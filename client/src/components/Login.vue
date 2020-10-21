<template>
   <center> 
       
       <div class="product-header " >
       
        <h1>User Login</h1>
        <form v-on:submit.prevent="onLogin">
            <p>Username: <br><input type="text" v-model="email" class="form-control" /></p>
            <p>Password: <br><input type="password" v-model="password" class="form-control" /></p>
            <p><button class="btn btn-sm btn-info" type="submit">Login</button></p>
            <div class="error" v-if="error">{{error}}</div>
        </form>
    </div> </center>
</template>
<script>
import AuthenService from '@/services/AuthenService'

export default {
    data () {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async onLogin () {
            try {
                const response = await AuthenService.login({
                    email: this.email,
                    password: this.password
                })

                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push({
                    name: 'users'
                })

                console.log(response)
            } catch (error) {
                console.log(error)
                this.error = error.response.data.error
                this.email = ''
                this.password = ''
            }
        }
    }
}
</script>
<style scoped>
    .error {
        color:red;
    }

    .product-header {
 max-width: 900px;
 margin-left: auto;
 margin-right: auto;
}

</style>