<template>
    <h1 style="font-size: 30px">学生成绩列表</h1>
    <el-button type="danger" @click="getStudentList">获取学生成绩</el-button>
    <el-button type="primary" @click="addStudent">新增</el-button>
    <!--button @click="getStudentList">获取学生成绩</button-->
    <div>
        <!--el-table :data="studentList" stripe style="width: 100%"-->
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
                        <el-popconfirm title="确定要删除吗?" 
                            confirm-button-text="是"
                            cancel-button-text="否"
                            @confirm="handleRowDelete(scope.$index)">
                                <template #reference>
                                    <el-button type="danger">删除</el-button>
                                </template>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios"
import { set } from 'lodash-es'
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

    // 新增联络人
    addStudent() {
        this.studentList.unshift({
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

    handleRowDelete(index) {      
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
        
    },

},
}

</script>