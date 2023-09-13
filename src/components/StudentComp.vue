<template>
        <h1 style="font-size: 30px">学生成绩列表</h1>
        <el-button type="danger" @click="getStudentList">获取学生成绩</el-button>
        <table class="table">
            <thead>
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>GPA</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stu in studentList" :key="stu.id">
                    <th> {{ stu.id }}</th>
                    <th> {{ stu.name }}</th>
                    <th> {{ stu.gender }}</th>
                    <th> {{ stu.gpa }}</th>
                </tr>
            </tbody>
        </table>
</template>
<script>

import axios from "axios"
export default {
    data() {
        return {
            studentList: [],
        };
    },
    methods: {
        getStudentList() {
            axios({
                url: "http://localhost:8100/student",
                method: "GET"
            }).then(res => {
                this.studentList = res.data;
            });
        },
    }
}

</script>