<template>
    <div class="order-header">
        <div class="container clearfix">
            <div class="header-logo" @click="$emit('pullCartCount')" v-if="toPullCartCount=='1'">
                <a href="/#/index"></a>
            </div>
            <div class="header-logo" v-else>
                <a href="/#/index"></a>
            </div>
            <div class="title">
                <h2>
                    {{title}}
                    <slot name="tip"></slot>
                </h2>
            </div>
            <div class="username">
                <a href="javascript:;">{{username}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        props: {
            title: String,
            toPullCartCount: String,
        },
        computed: {
            ...mapState(["username"]),
        },
    };
</script>

<style lang="scss">
    .order-header {
        padding: 30px 0;
        border-bottom: 2px solid #ff6600;
        .header-logo {
            float: left;
        }
        .title,
        .username {
            display: inline-block;
            height: 55px;
            line-height: 55px;
        }
        .username {
            float: right;
            a {
                color: #666666;
                font-size: 16px;
            }
        }
        .title {
            float: left;
            color: #333333;
            margin-left: 54px;
            h2 {
                font-size: 28px;
            }
            span {
                font-size: 14px;
                margin-left: 17px;
                color: #999999;
                font-weight: 200;
            }
        }
    }
</style>