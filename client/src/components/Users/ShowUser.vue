<template>
<div class="bg"> <br>
    <div class="product-header ">
        <h1>ดูข้อมูลผู้ใช้งาน</h1> <br>
        <h3>id: {{ user.id }}</h3> <br>
        <h4>ชื่อ-นามสกุล : {{ user.name }} - {{ user.lastname }}</h4> <br>
        <h4>email: {{ user.email }}</h4> <br> 
        <h4>password: {{ user.password }}</h4> <br>
    </div> <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</div>
</template>
<script>
import UsersService from '@/services/UsersService'

export default {
    data () {
        return {
            user: null
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

.bg{
    background: silver;
}
</style>