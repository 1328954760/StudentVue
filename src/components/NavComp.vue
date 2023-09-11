<template>
    <div class="aside">
        <el-menu router default-active="$route.path"
        class="el-menu-vertical">
            <el-menu-item index="student">
                <span>学生信息</span>
            </el-menu-item>
            <el-menu-item index="course">
                <span>课程信息</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default({
        name: "NavComp"
    })
</script>