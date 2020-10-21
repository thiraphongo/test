<template>
    <div class="product-header " >
        <h2>Get all users</h2>
        <h4>จำนวนผู้ใช้งาน {{users.length}}</h4>
        <p><button v-on:click="navigateTo('/user/create')">สร้างผู้ใช้งาน</button></p>

        <div v-for="user in users" v-bind:key="user.id">
            <p>id: {{ user.id }}</p>
            <p>ชื่อ-นามสกุล : {{ user.name }} - {{ user.lastname }}</p>
            <p>email: {{ user.email }}</p>
            <p>password: {{ user.password }}</p>
                <button class="btn btn-sm btn-info" v-on:click="navigateTo('/user/'+user.id)">ดูข้อมูล</button>
                <button class="btn btn-sm btn-warning" v-on:click="navigateTo('/user/edit/'+ user.id)">แก้ไขข้อมูล</button>
                <button class="btn btn-sm btn-danger" v-on:click="deleteUser(user)">ลบข้อมูล</button> <br><br>
                <p><button class="btn btn-sm btn-warning" v-on:click="logout">Logout</button></p>
            <hr>
        </div>
    </div>
</template>
<script>
    import UsersService from '@/services/UsersService'
    
    export default {
        data () {
            return {
                users: []
            }
        },
        async created () {
            this.users = (await UsersService.index()).data
        },
        methods: {
            navigateTo (route) {
                this.$router.push(route)
            },
            logout () {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setUser', null)
                this.$router.push({
                    name: 'login'
                })
            },
            async deleteUser (user) {
                try {
                    await UsersService.delete(user)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            },
                async refreshData() {
                this.users = (await UsersService.index()).data
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