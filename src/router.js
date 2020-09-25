import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderConfirm from './pages/orderConfirm'
import OrderList from './pages/orderList'
import OrderPay from './pages/orderPay'
import Alipay from './pages/alipay'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    component: Index
                },
                {
                    path: '/product/:id',
                    component: Product
                },
                {
                    path: '/detail/:id',
                    component: Detail
                },
            ]
        },
        {
            path: '/cart',
            component: Cart
        },
        {
            path: '/order',
            component: Order,
            children: [
                {
                    path: 'list',
                    component: OrderList,
                },
                {
                    path: 'confirm',
                    component: OrderConfirm
                },
                {
                    path: 'pay',
                    component: OrderPay
                },
                {
                    path: 'alipay',
                    component: Alipay
                },
            ]
        },
    ]
});