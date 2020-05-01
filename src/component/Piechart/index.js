import React, { Component } from 'react';
import './index.less'

class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rate: this.props.rate,
        }
        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.init()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.rate !== prevState.rate) {
            return {
                rate: nextProps.rate,
            }
        }
        return null
    }

    componentDidUpdate(prevProps) {
        if (this.props.rate !== prevProps.rate && this.canvas) {
            this.drawProcess(this.props.rate);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.rate != nextProps.rate && this.canvas) {
            return true
        }
        return false
    }

    initCanvas() {
        const { bgColor = 'blue' } = this.props
        const chart = this.canvas.current
        // 一下代码注释，用css去控制canvas高度，不然会引起强制回流
        let scale = window.devicePixelRatio || 1
        if (!chart) return;
        const height = Math.floor(this.canvas.clientHeight * scale)
        const width = 2 * height
        chart.setAttribute('width', 100 + 'px'); // 设置画布大小
        chart.setAttribute('height', 100 + 'px');
        this.x = chart.width / 2
        this.y = chart.height
        this.lineWidth = this.x / 5.5
        this.r = this.x - this.lineWidth
        this.canvasContext = chart.getContext('2d');
        console.log(this.canvasContext, 'this.canvasContext')
        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = this.lineWidth   // 比底色多处一个像素，盖住边缘可能出现的毛刺
        this.canvasContext.arc(
            this.x, this.y, this.r, 0, Math.PI, true,
        );
        this.canvasContext.strokeStyle = bgColor;
        this.canvasContext.stroke();
    }

    drawProcess(rate) {
        this.noAnimation(rate)
    }

    noAnimation(rate) {
        console.log('rate', rate)
        const { color = 'green' } = this.props
        const chart = this.canvas.current
        try {
            this.canvasContext.clearRect(
                0, 0, chart.width, chart.height,
            );
            this.initCanvas()
            this.canvasContext.beginPath();
            this.canvasContext.lineWidth = this.lineWidth + 2
            this.canvasContext.arc(
                this.x, this.y, this.r, Math.PI, Math.PI * rate, false,
            );
            this.canvasContext.strokeStyle = color;
            this.canvasContext.stroke();
        } catch (error) {
            console.log(error)
        }
    }
    init =  () => {
        const { rate = 0.7 } = this.props
        const devicePixelRatio =  window.devicePixelRatio
        let canvas = this.canvas.current;
        // 去锯齿
        canvas.style.width = 190 + "px";
        canvas.style.height = 190 + "px";
        canvas.height = 190 * devicePixelRatio;
        canvas.width = 190 * devicePixelRatio;
        let van = canvas.getContext("2d");
        van.scale(devicePixelRatio, devicePixelRatio)
        drawCircle();
        let currentDeg = 0
        drawArc(currentDeg++);

        function drawArc(deg) {
            // 计算deg次时的开始角度
            let from = (Math.PI/180)*deg;
            // 计算deg次时的结束角度
            let to = (Math.PI/180)*deg + Math.PI/180;
            van.beginPath();
            van.lineWidth = 6;
            // 设置线头的样式为圆头，默认是方形(不圆润)
            van.lineCap = 'round';
            van.strokeStyle = 'green';
            van.arc(100,100,80,from,to,false);
            // 清空画布上的文字，这里不是清除整个画布哦
            van.clearRect(90,80,40,40);
            van.font = '18px serif';
            let text = (currentDeg / 360 * 100).toFixed(0) + '%';
            van.fillText(text,90,100);
            van.stroke();
            van.closePath()
            if(currentDeg <= rate*360){
                setTimeout(function () {
                    drawArc(currentDeg++);
                },10)
            }
        }

        function drawCircle() {
            van.beginPath();
            van.lineWidth = 6;
            van.strokeStyle = '#ccc';
            van.arc(100,100,80,0,Math.PI*2,false);
            van.stroke();
            van.closePath()
        }
    }

    render() {
        return (
            <canvas ref={this.canvas}/>
        );
    }
}

export default PieChart
