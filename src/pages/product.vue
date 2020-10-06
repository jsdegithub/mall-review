<template>
    <div class="product">
        <product-param>
            <template v-slot:buy>
                <button class="btn">立即购买</button>
            </template>
        </product-param>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
        <h1>hhhh</h1>
    </div>
</template>

<script>
    import ProductParam from "../components/ProductParam";
    export default {
        components: {
            ProductParam,
        },
    };
</script>

<style lang="scss">
    .product {
        .btn {
            margin-left: 20px;
        }
        h1{
            height: 150px;
        }
    }
</style>