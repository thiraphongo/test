<template>
    <div >
        <div class="product-header ">
 <h2>ชื่อร้าน : LONGXX26</h2> <div>
 <form>
 <input type="text" v-model="search" placeholder="Search">
 </form>
</div>
 <div><br>
 <button class="btn btn-sm btn-warning"  v-on:click="navigateTo('/product/create')">create
product</button>
<br><br>
 <strong> จํานวน product: </strong> {{products.length}}</div>
 <br>
 </div>

 <div v-if="products.length === 0" class="empty-product">
 *** ไม่มีข้อมูล***
 </div>



 <div v-for="product in products" v-bind:key="product.id" class="product-list">
 <!-- <p>id: {{ product.id }}</p> -->
 <div class="product-pic">
 <transition name="fade">
 <div class="thumbnail-pic" v-if="product.thumbnail != 'null'">
 <img :src="BASE_URL+product.thumbnail" alt="thumbnail">
 </div>
 </transition>
 </div>

 <h3>{{ product.name }}</h3>
 <div v-html="product.taste.slice(0,200)"></div>
 <p><strong>price :</strong> {{ product.status }}</p>
 
 <!-- <p>status: {{ product.status }}</p> -->
 
 <p>
<button class="btn btn-sm btn-info" v-on:click="navigateTo('/product/'+product.id)">ดูสินค้า</button>
<button class="btn btn-sm btn-warning" v-on:click="navigateTo('/product/edit/'+ product.id)">แก้ไขสินค้า</button>
<button class="btn btn-sm btn-danger" v-on:click="deleteBlog(product)">ลบข้อมูล</button>
</p>

 </div>

 <div class="clearfix"></div>
 </div>

</template>
<script>
    import ProductService from '@/services/ProductService'
    import _ from 'lodash'
    export default {
        data () {
            return {
                search: '',
                products: [],
                BASE_URL: "http://localhost:8081/assets/uploads/",
                pictures: [],
            }
            
        },
        watch: {
                search: _.debounce(async function (value) {
                const route = {
                    name: 'products'
                }
                if(this.search !== '') {
                    route.query = {
                        search: this.search
                    }
                }

                console.log('search: ' + this.search)
                this.$router.push(route)
                }, 700),

                '$route.query.search': {
                    immediate: true,
                    async handler (value) {
                        this.products = (await ProductService.index(value)).data
                    }
                }
            },
        async created () {
            this.products = (await ProductService.index()).data
        },
        methods: {
            logout () {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setBlog', null)
                this.$router.push({
                    name: 'login'
                })
            },
            navigateTo (route) {
                this.$router.push(route)
            },
            async deleteBlog (product) {
                let result = confirm("Want to delete?")
                if (result) {
                    try {
                        await ProductService.delete(product)
                        this.refreshData()
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            async refreshData() {
                this.products = (await ProductService.index()).data
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