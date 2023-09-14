<template>
    <div class="common-layout" style="height: 500px">
        <el-container>
            <el-header style = "font-size: 40px">学生信息管理系统</el-header>
            <!--el-aside width="400px"><NavComp/></el-aside-->
            <el-container>   
                <el-aside>
                    <NavComp/>
                </el-aside>
                <el-container>
                    <el-main><router-view/></el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import NavComp from './NavComp.vue';

        export default defineComponent({
            name:"ContainerComp",
            components:{
                NavComp
            }
        })
    

</script>
<style>
    .common-layout .el-header {
        position: relative;
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary); 
    }
</style>