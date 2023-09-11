<template>
    <div>
        <h1>学生课程列表</h1>
        <elButton type="danger" @click="getCourseList">获取学生课程</elButton>
        <!--button @click="getCourseList">获取学生课程</button-->
        <!--p>{{ courseList }}</p-->
        <table class="table">
            <thead>
                <tr>
                    <th>课程代码</th>
                    <th>课程名称</th>
                    <th>课程学分</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cou in courseList" :key="cou.id">
                    <th> {{ cou.id }}</th>
                    <th> {{ cou.name }}</th>
                    <th> {{ cou.credit }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            studentList: [],
            courseList: []
        };
    },
    methods: {
        getCourseList() {
            axios({
                url: "http://localhost:8100/course",
                method: "GET"
            }).then(res => {
                this.courseList = res.data;
            });
        }
    },
}

</script>