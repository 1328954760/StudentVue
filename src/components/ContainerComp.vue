<template>
    <div class="common-layout">
        <ElContainer>
            <ElHeader>学生信息管理</ElHeader>
            <ElContainer>
                <ElAside width="200px"><NavComp/></ElAside>
                <ElMain><router-view/></ElMain>
            </ElContainer>
        </ElContainer>
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