<template>
    <div style="width:100px;height:40px;float:right">
        <canvas id="s-canvas" @click="refreshCode" width="100px" height="40px"></canvas>
    </div>
</template>

<script>
export default {
    name: 'validCode',
    data () {
        return {
        codeList: [],
        chars:'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
        }
    },
    mounted () {
        this.creatCode()
    },
    methods:{
        refreshCode () {
            this.creatCode()
        },
        creatCode(){
            let canvas = document.getElementById('s-canvas');
            let ctx = canvas.getContext('2d');
            ctx.textBaseLine = 'bottom';//设置文本基线
            ctx.fillStyle = "white";//设置背景填充色
            ctx.fillRect(0,0,100,40);//设置canvas填充矩形
            // 生成4位验证码
            this.codeList = [];
            for(let i = 0;i<4;i++){
                this.codeList.push(this.chars.charAt(Math.floor(Math.random() * this.chars.length)));
            }
            for(let i = 0;i<4;i++){
                ctx.fillStyle = this.randomColor(50,160);
                ctx.font = this.randomNum(16,38)+'px SimHei';
                let x = (i+1)*(100/5);
                let y = this.randomNum(16,40);
                var deg = this.randomNum(-45,45);
                ctx.translate(x,y);
                ctx.rotate(deg*Math.PI/180);
                ctx.fillText(this.codeList[i],0,0);
                ctx.rotate(-deg*Math.PI/180);
                ctx.translate(-x,-y);
            }
            for (let i = 0; i < 5; i++) {
                ctx.strokeStyle = this.randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(this.randomNum(0, 100), this.randomNum(0, 40));
                ctx.lineTo(this.randomNum(0, 100), this.randomNum(0, 40));
                ctx.stroke();
            }
            // 绘制干扰点
            for (let i = 0; i < 50; i++) {
                ctx.fillStyle = this.randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(this.randomNum(0, 100), this.randomNum(0,40), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
            // 向父组件暴露验证码
            this.$emit('update:value',this.codeList.map(item => item).join(''));
        },
        // 生成一个随机数
        randomNum (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        // 生成一个随机的颜色
        randomColor (min, max) {
            let r = this.randomNum(min, max);
            let g = this.randomNum(min, max);
            let b = this.randomNum(min, max);
            return `rgb(${r},${g},${b})`;
        },
    }
}
</script>
