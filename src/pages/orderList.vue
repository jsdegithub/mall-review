<template>
    <div class="order-list">
        <order-header title="订单列表" toPullCartCount="1" @pullCartCount="pull_cart_count">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多>></span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <loading v-if="loading"></loading>
                    <div class="order" v-for="(order, index) in list" :key="index">
                        <div class="order-title">
                            <div class="item-info fl">
                                {{order.createTime}}
                                <span>|</span>
                                {{order.receiverName}}
                                <span>|</span>
                                订单号：{{order.orderNo}}
                                <span>|</span>
                                {{order.paymentTypeDesc}}
                            </div>
                            <div class="item-money fr">
                                <span>应付金额：</span>
                                <span class="money">{{order.payment}}</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div class="order-content clearfix">
                            <div class="good-box fl">
                                <div
                                    class="good-list"
                                    v-for="(item, i) in order.orderItemVoList"
                                    :key="i"
                                >
                                    <div class="good-img">
                                        <img v-lazy="item.productImage" />
                                    </div>
                                    <div class="good-name">
                                        <div class="p-name">{{item.productName}}</div>
                                        <div
                                            class="p-money"
                                        >{{item.totalPrice + 'x' + item.quantity}}元</div>
                                    </div>
                                </div>
                            </div>
                            <div class="good-state fr" v-if="order.status==20">
                                <a href="javascript:;">{{order.statusDesc}}</a>
                            </div>
                            <div class="good-state fr" v-else>
                                <a
                                    href="javascript:;"
                                    @click="goPay(order.orderNo)"
                                >{{order.statusDesc}}</a>
                            </div>
                        </div>
                    </div>

                    <el-pagination
                        class="pagination"
                        background
                        layout="prev, pager, next"
                        :pageSize="pageSize"
                        :total="total"
                        @current-change="handleChange"
                    ></el-pagination>

                    <!-- <div
                        class="scroll-more"
                        v-infinite-scroll="scrollMore"
                        infinite-scroll-disabled="busy"
                        infinite-scroll-distance="410"
                    >
                        <img
                            src="/imgs/loading-svg/loading-bars.svg"
                            v-show="scrollLoading==true && loading==false"
                            alt
                        /> -->
                        <!-- 在122行已经禁用vue-infinite-scroll的情况下，这里已经不必再设置loading==false -->
                        <!-- 之所以scrollLoading和loading会同时为true，是因为vue-infinite-scroll会在页面刚渲染时就触发一次 -->
                        <!-- 所以才要在getOrderList里禁用vue-infinite-scroll，等首次数据渲染结束再启用vue-infinite-scroll -->
                    <!-- </div> -->
                    <no-data v-if="!loading && list.length==0"></no-data>
                    <!-- <div class="no-more" v-show="!hasNextPage">
                        <p>没有更多了</p>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import OrderHeader from "./../components/OrderHeader";
    import Loading from "./../components/Loading";
    import NoData from "./../components/NoData";
    import { Pagination } from "element-ui";
    import infiniteScroll from "vue-infinite-scroll";
    export default {
        name: "order-list",
        components: {
            OrderHeader,
            Loading,
            NoData,
            [Pagination.name]: Pagination,
        },
        directives: {
            infiniteScroll,
        },
        data() {
            return {
                scrollLoading: false,
                list: [],
                loading: true,
                pageSize: 5,
                pageNum: 1,
                total: 0,
                busy: false,
                hasNextPage: true,
            };
        },
        mounted() {
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                this.busy = true; //防止vue-infinite-scroll在页面刚渲染时就加载下一页
                this.axios
                    .get("/orders", {
                        params: {
                            pageNum: this.pageNum,
                            pageSize: this.pageSize,
                        },
                    })
                    .then((res) => {
                        this.loading = false;
                        this.list = res.list;
                        this.total = res.total;
                        this.busy = false; //在页面渲染完成后才使vue-infinite-scroll生效
                    })
                    .catch((_) => {
                        this.loading = false;
                        this.$message.error("出错了，请稍后再试。");
                    });
            },
            goPay(orderNo) {
                this.$router.push({
                    path: "/order/pay",
                    query: {
                        orderNo,
                    },
                });
            },
            handleChange(pageNum) {
                this.pageNum = pageNum;
                this.getOrderList();
            },
            scrollMore() {
                this.busy = true;
                // 在这里设置定时器得目的是给加载动画留时间
                setTimeout(() => {
                    this.pageNum++;
                    this.getList();
                }, 500);
            },
            getList() {
                this.scrollLoading = true;
                this.axios
                    .get("/orders", {
                        params: {
                            pageNum: this.pageNum,
                            pageSize: this.pageSize,
                        },
                    })
                    .then((res) => {
                        this.list = this.list.concat(res.list);
                        this.scrollLoading = false;
                        if (res.hasNextPage) {
                            this.busy = false;
                        } else {
                            this.hasNextPage = false;
                            this.busy = true;
                        }
                    })
                    .catch((_) => {
                        this.$message.error("出错了，请稍后再试。");
                    });
            },
            pull_cart_count() {
                this.axios.get("/carts/products/sum").then((res) => {
                    this.$store.dispatch("saveCartCount", res);
                });
            },
        },
    };
</script>
<style lang="scss">
    @import "./../assets/scss/config.scss";
    @import "./../assets/scss/mixin.scss";
    .order-list {
        .wrapper {
            background-color: $colorJ;
            padding-top: 33px;
            padding-bottom: 110px;
            .order-box {
                .order {
                    @include border();
                    background-color: $colorG;
                    margin-bottom: 31px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .order-title {
                        @include height(74px);
                        background-color: $colorK;
                        padding: 0 43px;
                        font-size: 16px;
                        color: $colorC;
                        .item-info {
                            span {
                                margin: 0 9px;
                            }
                        }
                        .money {
                            font-size: 26px;
                            color: $colorB;
                        }
                    }
                    .order-content {
                        padding: 0 43px;
                        .good-box {
                            width: 88%;
                            .good-list {
                                display: flex;
                                align-items: center;
                                height: 145px;
                                .good-img {
                                    width: 112px;
                                    img {
                                        width: 100%;
                                    }
                                }
                                .good-name {
                                    font-size: 20px;
                                    color: $colorB;
                                }
                            }
                        }
                        .good-state {
                            @include height(145px);
                            font-size: 20px;
                            color: $colorA;
                            a {
                                color: $colorA;
                            }
                        }
                    }
                }
                .pagination {
                    text-align: center;
                }
                .el-pagination.is-background .el-pager li:not(.disabled).active {
                    background-color: #ff6600;
                }
                .el-button--primary {
                    background-color: #ff6600;
                    border-color: #ff6600;
                }
                .load-more,
                .scroll-more {
                    text-align: center;
                    img {
                        height: 60px;
                        width: 97px;
                    }
                }
                .no-more {
                    text-align: center;
                    color: #999999;
                    font-size: 18px;
                }
            }
        }
    }
</style>