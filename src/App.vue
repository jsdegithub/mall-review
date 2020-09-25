<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
import storage from "./storage/index";
export default {
    name: "App",
    components: {},
    data() {
        return {};
    },
    mounted() {
        storage.setItem('name', 'jinshuo', 'user');
    },
};
</script>

<style>
</style>
