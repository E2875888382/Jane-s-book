var express=require('express');
var router=express.Router();
var mysql=require('mysql');

var comic = [
    {
        className :'恐怖',
        firstItem : {
            img:'https://manhua-163.hdslb.com/pic20190319684dc7495bf04296a4667a3b325369a5.jpg',
            title : '致命冲动',
            summary:'一个致命的微信红包',
            new : '第59话 新的任务',
            author : '万画筒漫画',
            hot : '2430万',
            tag : ['恐怖','校园','悬疑']
        },
        otherItem : [
            { title:'染色体47号',new:'227 第227话'},
            { title:'鬼面英雄2',new:'45 来者零'},
            { title:'夜梦恐惧',new:'第十六话 歌剧 上'},
            { title:'诡异杂谈',new:'394 生人禁地 15'},
            { title:'诡异志',new:'172 长腿怪人 14'}
        ]
    },
    {
        className :'古风',
        firstItem : {
            img:'https://manhua-163.hdslb.com/pic2018042708953167d88c4c5d881238e2c0c4bb8f.jpg',
            title : '武林之王的隐退生活',
            summary : '武林之王的隐退生活',
            new : '66 第六十四话',
            author : 'SF轻小说合火人工作室',
            hot : '9990.1万',
            tag : ['后宫','武侠','古风']
        },
        otherItem : [
            { title:'逆天毒医：龙尊求放过',new:'99 噬魂印'},
            { title:'大唐不断网',new:'100 冒险上2'},
            { title:'王爷你好坏',new:'第132话 逃心再起'},
            { title:'皇后娘娘的五毛特效',new:'第155回 庐山面目'},
            { title:'萌妻食神',new:'27 第二十七话'}
        ]
    },
    {
        className :'恋爱',
        firstItem : {
            img:'https://manhua-163.hdslb.com/pic201703100f4e98dc9204467abc215b10ad3a4f71.jpg',
            title : '重生豪门之强势归来',
            summary : '重生复仇谈个恋爱',
            new : '第254话 急于求成',
            author : '万画筒漫画',
            hot : '3.61亿',
            tag : ['校园','恋爱']
        },
        otherItem : [
            { title:'和反派BOSS同居的日子',new:'32 本尊比你受欢迎'},
            { title:'一个钢镚儿',new:'020 我们...什么时候走'},
            { title:'没白活',new:'21 危机四伏（中）'},
            { title:'对不起，我丑到你了',new:'34 想要的更多'},
            { title:'我的男友可食用',new:'33 吃醋了么'}
        ]
    },
    {
        className :'搞笑',
        firstItem : {
            img:'https://manhua-163.hdslb.com/pic201901046a0b9943ef32495cb593b269666ef584.jpg',
            title : '大佬重返16岁',
            summary : '黑道大佬变衰仔',
            new : '111 不为人知的过去',
            author : '三猫/夜一/星空社',
            hot : '3.83亿',
            tag : ['都市','搞笑','热血']
        },
        otherItem : [
            { title:'影子猫',new:'223 神道外规则'},
            { title:'诸子37区',new:'165 你想怎么做'},
            { title:'我开动物园那些年',new:'035 名为乐乐'},
            { title:'非人学院',new:'天亮51 易燃易爆'},
            { title:'女子学院的男生',new:'268 你复习了吗？'}
        ]
    },
    {
        className :'热血',
        firstItem : {
            img:'https://manhua-163.hdslb.com/pic2018120457f1ed9941194b3d8d2d8a1c2bf970bb.jpg',
            title : '武神天下',
            summary : '废材少年的逆天之路',
            new : '90 090：想赖账？',
            author : '逐浪动漫',
            hot : '2956.9万',
            tag : ['热血','玄幻','战斗']
        },
        otherItem : [
            { title:'草莓狂战记',new:'146-下 马上就要完成了'},
            { title:'极武玄帝',new:'77 找帮手'},
            { title:'苍穹榜之圣灵纪',new:'93 赵家二哥（下）'},
            { title:'异能少年王',new:'28 下课后来操场'},
            { title:'妙手狂医',new:'14 惹毛了神医'}
        ]
    },
    {
        className :'校园',
        firstItem : {
            img:'https://manhua-163.hdslb.com/pic201902112994618e0b9f4d90a7dc35ab8793430d.jpg',
            title : '斗战狂潮',
            summary : '王同学撬动英魂世界',
            new : '234 第二百三十四话',
            author : '阅动文化/阅文漫画',
            hot : '5154.5万',
            tag : ['校园','科幻','热血']
        },
        otherItem : [
            { title:'全职法师',new:'第338回 白布人，心系灵！'},
            { title:'喂！别动我的奶酪',new:'112 时间解决'},
            { title:'奥拉星·平行宇宙',new:'76 首富云腾'},
            { title:'学霸哥哥别碰我',new:'234 攻略男神大作战'},
            { title:'我在日本当道士',new:'58 桃花，我们回家吧！'}
        ]
    },
]

router.get('/getComic',(request,response) =>{
    response.status(200).json(comic);
})
//导出router
module.exports=router;