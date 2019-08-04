<template>
<div class="col-12">
    <el-tabs v-model="activeName">
        <el-tab-pane label="相簿" name="first">



        </el-tab-pane>
        <el-tab-pane label="步行街" name="second">步行街</el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    data(){
        return {
            activeName: 'first',
        }
    }
}
</script>

<style scoped>

</style>
