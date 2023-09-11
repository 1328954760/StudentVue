import { createRouter, createWebHashHistory } from "vue-router"
//导入路由组件
import StudentComp from "../components/StudentComp"
import CourseComp from "../components/CourseComp"
import ContainerComp from "../components/ContainerComp"

const routes = [{
    path:"/",
    component:ContainerComp,
    children:[
      {
        path: 'student',
        name: 'student',
        component: StudentComp
      },
      {
        path: 'course',
        name: 'course',
        component: CourseComp
      }
    ]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router