<template>
    <div class="product-header " >
        <h1>แก้ไขข้อมูลผู้ใช้งาน</h1>
        <form v-on:submit.prevent = "editUser">
            <p>name: <input type="text" v-model="user.name" class="form-control"></p>
            <p>lastname: <input type="text" v-model="user.lastname" class="form-control"></p>
            <p>email: <input type="text" v-model="user.email" class="form-control"></p >
            <p>password: <input type="text" v-model="user.password" class="form-control" ></p>
            <p><button class="btn btn-sm btn-warning" type="submit">edit user</button></p>
        </form>
        <hr>
        <div>
            <p>name: {{ user.name }}</p>
            <p>lastname: {{ user.lastname }}</p>
            <p>email: {{ user.email }}</p>
            <p>password: {{ user.password }}</p>
            <p></p>
        </div>
    </div>
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
        async editUser () {
            try {
                await UsersService.put(this.user)
                this.$router.push({
                    name: 'users'
                })
            } catch (err) {
                console.log(err)
            }
        }
    },
    async created () {
        try {
            let userId = this.$route.params.userId
            this.user = (await UsersService.show(userId)).data
        } catch (error) {
            console.log (error)
        }
    }
}
</script>
<style scoped>
.empty-product {
 width: 100%;
 text-align: center;
 padding:10px;
 background:darksalmon;
 color:white;
}
/* thumbnail */
.thumbnail-pic img{
 width: 200px;
 padding: 5px 10px 0px 0px;
}
.product-info {
 float: left;
}
.product-pic {
 float: left;
}
.clearfix {
 clear: both;
}
.product-list {
 border:solid 1px #dfdfdf;
 margin-bottom: 10px;
 max-width: 900px;
 margin-left: auto;
 margin-right: auto;
 padding: 5px;
 box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
}
.product-header {
 max-width: 900px;
 margin-left: auto;
 margin-right: auto;
}

</style>