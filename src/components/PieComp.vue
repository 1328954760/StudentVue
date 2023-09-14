<template>
    <div>
        <h1 style="font-size: 30px">学生课程列表</h1>
        <elButton type="danger" @click="initEchart">获取学生课程</elButton>
    </div>

    <div>
        <div id="pie" style="width:100%;height:500px;"></div>
    </div>

</template>

<script>
import axios from "axios"
import * as echarts from "echarts";

export default {
    data() {
        return {
            courseList:[]
        };
    },

    mounted(){
        //this.initEchart();
    },

    methods: {
        getCourseList() {
            axios({
                url: "http://localhost:8100/course",
                method: "GET"
            }).then(res => {
                this.courseList = res.data;
            });
        },
        initEchart() {
            axios({
                url: "http://localhost:8100/course/pie",
                method: "GET"
            }).then(res => {
                this.initPie(res.data);
            });
        },


         initPie(data){
            let chartDom = document.getElementById('pie');
            let myChart = echarts.init(chartDom);
            let option;

            option = {
            title: {
                text: '学生课程',
                subtext: '课程学分',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: '5%'
            },
            series: [
                {
                name: '课程学分',
                type: 'pie',
                radius: '75%',
                data: data,
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
            };

            option && myChart.setOption(option);

        },
    },


}

</script>