<template>
<div>
    <top v-if="$route.meta.needHeader"/>

    <transition mode="out-in">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
    </transition>

    <transition mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"/>
    </transition>

    <bottom v-if="$route.meta.needFooter"/>
</div>
</template>

<script>
export default {
    components: {
        top: ()=> import('@components/common/header.vue'),
        bottom: ()=> import('@components/common/footer.vue')
    }
};
</script>

<style>
.v-enter,.v-leave-to{
    opacity: 0;
    transform: translate3d(100px,0,100px);
}
.v-enter-active,.v-leave-active{
    transition: all 0.1s;
}
.el-popover--plain {
    padding: 10px !important;
    min-width:50px !important;
    margin-bottom:0;
}
</style>
