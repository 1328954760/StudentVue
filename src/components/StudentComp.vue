<template>
        <h1>学生成绩列表</h1>
        <el-button type="danger" @click="getStudentList">获取学生成绩</el-button>
        <el-button type="primary" @click="addStudent">新增</el-button>
        <!--button @click="getStudentList">获取学生成绩</button-->
        <!--p>{{ studentList }}</p-->
        <!--<table class="table">
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
        </table>-->

        <el-table :data="studentList" stripe style="width: 100%">
            <el-table-column prop="id" label="学号">
                <template #default="scope">
                    <el-input
                        v-if="scope.row.isEdit"
                        v-model="scope.row.id"
                        type="text"
                        placeholder="请填写"
                    />
                    <span v-else>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名">
                <template #default="scope">
                    <el-input
                        v-if="scope.row.isEdit"
                        v-model="scope.row.name"
                        type="text"
                        placeholder="请填写"
                    />
                    <span v-else>{{ scope.row.name }}</span>
                    </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别">
                <template #default="scope">
                    <el-input
                        v-if="scope.row.isEdit"
                        v-model="scope.row.gender"
                        type="text"
                        placeholder="请填写"
                    />
                    <span v-else>{{ scope.row.gender }}</span>
                    </template>
            </el-table-column>
            <el-table-column prop="gpa" label="绩点">
                <template #default="scope">
                    <el-input
                        v-if="scope.row.isEdit"
                        v-model="scope.row.gpa"
                        type="number"
                        placeholder="请填写"
                    />
                    <span v-else>{{ scope.row.gpa }}</span>
                    </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
                <template #default="scope">
                    <div v-if="scope.row.isEdit">
                        <el-button type="primary" @click="handleRowSave(scope.row)">保存</el-button>
                        <el-button type="danger" @click="handleRowCancel(scope.row, scope.$index)">取消</el-button>
                    </div>
                    <div v-else>
                        <el-button type="primary" @click="handleRowEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleRowDelete(scope.$index)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
</template>
<script>
import axios from "axios"
import { set } from 'lodash-es'
//import { ElButton } from "element-plus"

export default {
    data() {
        return {
            studentList: [],
            courseList: []
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

        getCourseList() {
            axios({
                url: "http://localhost:8100/course",
                method: "GET"
            }).then(res => {
                this.courseList = res.data;
            });
        },

        // 新增联络人
        addStudent() {
            this.studentList.push({
                id : '',
                name: '',
                gender: '',
                gpa: '',
                id2 : '', // 存放修改前数据
                name2: '',
                gender2: '',
                gpa2: '',
                isEdit: true, // 当这个值为true时表示可以编辑
                isNew: true, // 当这个值为true时表示是新数据
                isSave: false // 当这个值为false时表示未保存
            })
        },

        handleRowEdit(row) {
            //记录修改前数据以便恢复
            row.id2 = row.id
            row.name2 = row.name
            row.gender2 = row.gender
            row.gpa2 = row.gpa
            set(row, 'isEdit', true)
        },

        handleRowDelete(index)  {      
            let item = this.studentList[index]
            axios({
                url: "http://localhost:8100/delstudent",
                method : "DELETE",
                data : {
                    id: item.id,
                    name : "",
                    gender: "",
                    gpa : 0
                }
            }).then(res => {
                    console.log(res.data)
                    // 如删除成功，在表格中删除该行
                    this.studentList.splice(index, 1)
            }) 
        },

        handleRowUpdate(row)  {
            console.log(row)
            axios({
                url: "http://localhost:8100/updatestudent",
                method : "PUT",
                data : {
                        id: row.id,
                        name : row.name,
                        gender: row.gender,
                        gpa : row.gpa
                }
            }).then(res => {
                    console.log(res.data)
                    row.isEdit = false
            }) 
        },

        handleRowInsert(row)  {
            console.log(row)
            axios({
                url: "http://localhost:8100/addstudent",
                method : "POST",
                data : {
                        id: row.id,
                        name : row.name,
                        gender: row.gender,
                        gpa : row.gpa
                }
            }).then(res => {
                    console.log(res.data)
                    row.isEdit = false
                    row.isNew = false
            }) 
        },

        handleRowSave(row)  {
            console.log(row)
            if (row.isNew) {
                this.handleRowInsert(row)
            } else {
                this.handleRowUpdate(row);
            }
            row.isSave = true
        },
        handleRowCancel(row, index)  {
            if (row.isNew)
                this.studentList.splice(index, 1)
            else {
                // TODO: 恢复单个学生数据
                row.id = row.id2
                row.name = row.name2
                row.gender = row.gender2
                row.gpa = row.gpa2
                set(row, 'isEdit', false)
            }
            
        }

    },
    //components: { ElButton }
}

</script>