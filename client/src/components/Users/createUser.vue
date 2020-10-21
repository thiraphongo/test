<template>
<center>
    <div class="bg"> <br>
    <div class="product-header ">
        <h1>Create User</h1>
        <form v-on:submit.prevent = "createUser">
            <p>name: <input type="text" v-model="user.name" class="form-control"></p> <br>
            <p>lastname: <input type="text" v-model="user.lastname" class="form-control"></p> <br>
            <p>email: <input type="text" v-model="user.email" class="form-control"></p> <br>
            <p>password: <input type="text" v-model="user.password" class="form-control" Width="50%"></p> <br>
            <p><button type="submit">create user</button></p> <br>
        </form>
        <hr>
        <div>
            <p>name: {{ user.name }}</p>
            <p>lastname: {{ user.lastname }}</p>
            <p>email: {{ user.email }}</p>
            <p>password: {{ user.password }}</p>
        </div>
    </div> <br><br><br>
    </div>
</center>
</template>
<script>
import UsersService from '@/services/UsersService'

export default {
    data () {
        return {
            user: {
                name: '',
                lastname: '',
                email: '',
                password: '',
                status: 'active'
            }
        }
    },
    methods: {
        async createUser () {
            try {
                await UsersService.post(this.user)
                this.$router.push({
                    name: 'users'
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>
<style scoped>
.product-header {
 max-width: 900px;
 margin-left: auto;
 margin-right: auto;
}
.bg{
    background: silver;
}
</style>