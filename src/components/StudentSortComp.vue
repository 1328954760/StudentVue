<template>
    <h1 style="font-size: 30px">学生成绩列表</h1>
    <el-button type="danger" @click="getStudentList">获取学生成绩</el-button>
    <!--button @click="getStudentList">获取学生成绩</button-->
    <div>
        <!--el-table :data="studentList" stripe style="width: 100%"-->
        <el-table :data="students_page" @sort-change="handleSortChange" stripe style="width: 100%">
            <el-table-column prop="id" sortable label="学号">
                <template #default="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名">
                <template #default="scope">
                    <span>{{ scope.row.name }}</span>
                    </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别">
                <template #default="scope">
                    <span>{{ scope.row.gender }}</span>
                    </template>
            </el-table-column>
            <el-table-column prop="gpa" sortable label="绩点">
                <template #default="scope">
                    <span>{{ scope.row.gpa }}</span>
                    </template>
            </el-table-column>
        </el-table>
    </div>
    <div>
        <el-pagination
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :page-size="pageSize" 
            :current-page="currentPage" 
            :page-sizes="[5, 10, 20, 40, 100]" 
            layout="total, sizes, prev, pager, next, jumper"
            :total="studentList.length">
        </el-pagination>
    </div>
</template>
<script>
import axios from "axios"
import { set, cloneDeep } from 'lodash-es'

export default {
data() {
    return {
        studentList: [],
        currentPage : 1,
        pageSize : 10
    };
},
computed : { // 分页显示
  students_page() {
    return this.studentList.slice((this.currentPage - 1) * this.pageSize, 
                                this.currentPage * this.pageSize);
  }
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
        let item = this.studentList[(this.currentPage - 1) * 5 + index] // 计算当前页数据在学生数组中的对应下标
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
                this.studentList.splice((this.currentPage - 1) * 5 + index, 1)
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

    handleSortChange(val) {
      let sortedList = cloneDeep(this.studentList);
      let descending = (val.order === "descending");
      
      sortedList.sort(this.compare(val.prop, descending));
       
      this.studentList = sortedList
    },

    compare(key, descending) {
      let desc = descending ? 1 : -1;
      return (v1, v2) => {
          return v2[key] > v1[key] ? desc : - desc;
      }
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },

    handleSizeChange(val) {
      this.pageSize = val;
    },

},

}

</script>