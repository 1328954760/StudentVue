<template>
    <h1 style="font-size: 30px">学生成绩列表</h1>
    <el-button type="danger" @click.once="initEchart">获取学生成绩</el-button>

    <div>
        <div id="pie" style="width:100%;height:600px;"></div>
    </div>
</template>
<script>

import axios from "axios"
import * as echarts from "echarts";
export default {
    data() {
        return {
            name: [],
            GPA: []
        };
    },

    mounted() {
        //this.initBie();

    },

    methods: {
        initEchart() {
            axios({
                url: "http://localhost:8100/student/pie",
                method: "GET"
            }).then(res => {

                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    this.name.push(res.data[i].name)
                    this.GPA.push(res.data[i].value)
                }
                this.initPie();
                console.log(this.name, this.GPA);
            });
        },

        initPie() {
            let chartDom = document.getElementById('pie');
            let myChart = echarts.init(chartDom);
            let option;

            // option = {
            //     title: {
            //         text: '学生信息',
            //         subtext: '学生绩点',
            //         left: 'center'
            //     },
            //     tooltip: {
            //         trigger: 'item'
            //     },
            //     legend: {
            //         orient: 'vertical',
            //         left: '5%'
            //     },
            //     series: [
            //         {
            //             name: '学生绩点',
            //             type: 'pie',
            //             radius: '75%',
            //             data: data,
            //             emphasis: {
            //                 itemStyle: {
            //                     shadowBlur: 10,
            //                     shadowOffsetX: 0,
            //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //                 }
            //             }
            //         }
            //     ]
            // };
            option = {
                xAxis: {
                    type: 'category',
                    data: this.name,
                    //splitNumber: 1,
                    axisLabel: {
                         rotate: 30
                    }

                },
                yAxis: {
                    // type: 'value'
                },
                series: [
                    {
                        data: this.GPA,
                        type: 'bar'
                    }
                ]
            };

            option && myChart.setOption(option);

        },
    },


}

</script>