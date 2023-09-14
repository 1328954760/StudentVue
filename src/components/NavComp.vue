<template>
    <!--div class="aside">
        <el-menu router default-active="$route.path"
        class="el-menu-vertical">
            <el-menu-item index="student">
                <span>学生信息</span>
            </el-menu-item>
            <el-menu-item index="course">
                <span>课程信息</span>
            </el-menu-item>
        </el-menu>
    </div-->
    <el-row class="tac">

    <el-col :span="15">
      <el-menu router default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical"
        text-color="#fff"
        text-align=center
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>基本信息显示</span>
          </template>
            <el-menu-item index="student">学生信息</el-menu-item>
            <el-menu-item index="course">课程信息</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="studentChange">
          <el-icon><icon-menu /></el-icon>
          <span>学生的增删改</span>
        </el-menu-item>
        <el-menu-item index="studentPage">
          <el-icon><document /></el-icon>
          <span>学生分页显示</span>
        </el-menu-item>
        <el-menu-item index="studentSort">
          <el-icon><setting /></el-icon>
          <span>信息跨页排序</span>
        </el-menu-item>
        <el-menu-item index="studentAll">
          <el-icon><setting /></el-icon>
          <span>管理功能整合</span>
        </el-menu-item>
        <el-menu-item index="histogram">
          <el-icon><setting /></el-icon>
          <span>柱状动态显示</span>
        </el-menu-item>
        <el-menu-item index="pie" >
          <el-icon><setting /></el-icon>
          <span>饼状动态显示</span>
        </el-menu-item>
        <el-menu-item index="8" disabled>
          <el-icon><setting /></el-icon>
          <span></span>
        </el-menu-item>
        <el-menu-item index="9" disabled>
          <el-icon><setting /></el-icon>
          <span></span>
        </el-menu-item>
        <el-menu-item index="10" disabled>
          <el-icon><setting /></el-icon>
          <span></span>
        </el-menu-item>
        <el-menu-item index="11" disabled>
          <el-icon><setting /></el-icon>
          <span></span>
        </el-menu-item>
        <el-menu-item index="/" >
          <el-icon><setting /></el-icon>
          <span>返回主页</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script >
    export default({
        name: "NavComp"
    })

</script>