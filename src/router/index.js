import { createRouter, createWebHashHistory } from "vue-router"
//导入路由组件
import StudentComp from "../components/StudentComp"
import StudentChangeComp from "../components/StudentChangeComp"
import StudentPageComp from "../components/StudentPageComp"
import StudentSortComp from "../components/StudentSortComp"
import StudentAllComp from "../components/StudentAllComp"
import CourseComp from "../components/CourseComp"
import ContainerComp from "../components/ContainerComp"
import HistogramComp from "../components/HistogramComp"
import PieComp from "../components/PieComp"

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
      },
      {
        path: 'studentChange',
        name: 'studentChange',
        component: StudentChangeComp
      },
      {
        path: 'studentPage',
        name: 'studentPage',
        component: StudentPageComp
      },
      {
        path: 'studentSort',
        name: 'studentSort',
        component: StudentSortComp
      },
      {
        path: 'histogram',
        name: 'histogram',
        component: HistogramComp
      },
      {
        path: 'pie',
        name: 'pie',
        component: PieComp
      },
      {
        path: 'studentAll',
        name: 'studentAll',
        component: StudentAllComp
      },
    ]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router