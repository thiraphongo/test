<template>
<div class="bg"><br>
    <div class="container blog-wrapper" > 
        <div class="product-header ">
        <main-header navsel="back"></main-header>
        
        <div class="hero-wrapper">
<div class="hero">
<img src="@/assets/longxx26.jpg" class="logo" style="float:left">
<br><br><br>
<h1>ชื่อร้าน Longxx.26</h1>
<h2>IG : Longxx.26 </h2>

</div>
</div>
        <br>
        <center>
        <h1>Show product</h1>
        <p><b>Title: </b> {{ product.name }} </p>
        <transition name="fade">
 <div class="thumbnail-pic" v-if="product.thumbnail != 'null'">
 <img :src="BASE_URL+product.thumbnail" alt="thumbnail">
 </div>
 </transition> <br>
        <div v-html="product.taste.slice(0,200)"></div>
        <p><b>price: </b> {{ product.price }}</p>
        <p><b> status: </b>{{ product.status }}</p>
        <p>
        <button class="btn btn-sm btn-warning" v-on:click="navigateTo('/product/edit/'+ product.id)">แก้ไข Product</button>
        <button class="btn btn-sm btn-danger" v-on:click="navigateTo('/products')">กลับ</button>
        
        </p>
        </center>
    </div>
    </div>
</div>
</template>
<script>
    import ProductService from '@/services/ProductService'
    export default {
        data () {
            return {
                BASE_URL: "http://localhost:8081/assets/uploads/",
                product: null
            }
        },
        async created () {
            try {
                let productId = this.$route.params.productId
                this.product = (await ProductService.show(productId)).data
            } catch (error) {
                console.log (error)
            }
        },
        methods : {
            navigateTo (route) {
                this.$router.push(route)
            },
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

.blog-wrapper {
margin-top:20px;
padding: 40px;
box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
}

.hero {
margin-top: 80px;
border-radius: 5px;
background: black;
height:250px;
color:white;
padding: 20px;
}

.bg{
    background: silver;
}
</style>