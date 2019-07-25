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
            author : 'SF轻小说',
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

var comicClass = [
    { link:'https://163.bilibili.com/source/4317076104890059052',img:'https://manhua-163.hdslb.com/pic/2015/07/02/2466e4a4393f4e7abc2b0824264fa060.jpg',title:'杀手古德',new:'1459 兽人',click:'25.38亿'},
    { link:'https://163.bilibili.com/source/4316808069910049882',img:'https://manhua-163.hdslb.com/pic20180326269db0d58bd24df788d8712548f19fcd.jpg',title:'我才不会被女孩子欺负呢',new:'391 八卦的宫彩彩',click:'22.62亿'},
    { link:'https://163.bilibili.com/source/4317064958460058888',img:'https://manhua-163.hdslb.com/pic201902111dcf3a3b390b4476adced4a04c5adb73.jpg',title:'诡异杂谈',new:'394 生人禁地 15',click:'19.66亿'},
    { link:'https://163.bilibili.com/source/4771945676810120861',img:'https://online-public-manhua.nos-eastchina1.126.net/pic201907159b41b8888bfd4f4abee9bcbe48e65a0b.jpg',title:'厄运之王',new:'135 135',click:'17.2亿'},
    { link:'https://163.bilibili.com/source/5015165829890111936',img:'https://manhua-163.hdslb.com/pic20170801f20425ccc59747d29e849f87cf5774e3.jpg',title:'航海王（海贼王）',new:'第948章 河童河松登场',click:'14.85亿'},
    { link:'https://163.bilibili.com/source/4376930639940112883',img:'https://manhua-163.hdslb.com/pic201808216366eff8d44043a18f98109c9d6d38c8.jpg',title:'讨喜笨王妃',new:'166下 王妃要侍寝·一百一十四',click:'13.91亿'},
    { link:'https://163.bilibili.com/source/4316808070150070932',img:'https://manhua-163.hdslb.com/pic20160125b8f89b5020f840e6aa35983f28724723.jpeg',title:'仙世录',new:'10-5 战神 3',click:'13.67亿'},
    { link:'https://163.bilibili.com/source/4828421593230128690',img:'https://manhua-163.hdslb.com/pic20161230012c958535754c09a677608b048f2600.jpg',title:'永恒至尊',new:'185 杀一人灭一门',click:'13.27亿'},
    { link:'https://163.bilibili.com/source/4458002705630123099',img:'https://manhua-163.hdslb.com/pic/2016/03/08/103cda4afde3411db1f0cfcad907ac21.jpg',title:'黑执事',new:'154 那位执事，远处',click:'12.72亿'},
    { link:'https://163.bilibili.com/source/4615324882390118047',img:'https://manhua-163.hdslb.com/pic20180620275462f06017490d83d8b174b867f375.jpg',title:'皇上别碰我',new:'329-1 贫民与平民',click:'12.38亿'},
    { link:'https://163.bilibili.com/source/4751245936130130207',img:'https://online-public-manhua.nos-eastchina1.126.net/pic20190712b276000977ab429cb369463ae8518e8d.jpg',title:'草莓狂战记',new:'146-下 马上就要完成了',click:'12.16亿'},
    { link:'https://163.bilibili.com/source/4573238801760108343',img:'https://manhua-163.hdslb.com/pic201807095038ee029fb24d7f95aa6ce5adf7a72a.jpg',title:'斗罗大陆',new:'249话 第227话 告白（2）',click:'11.67亿'},
    { link:'https://163.bilibili.com/source/4844371285780343897',img:'https://online-public-manhua.nos-eastchina1.126.net/pic2019062406e872acdc524fb6be95f967bb684a92.jpg',title:'我在皇宫当巨巨',new:'公告 变更',click:'11.53亿'},
    { link:'https://163.bilibili.com/source/4317047100100077914',img:'https://manhua-163.hdslb.com/pic20180326c9f59bc61c354c26bdef6bb3d908a197.jpg',title:'世变',new:'正150[火凤]',click:'11.27亿'},
    { link:'https://163.bilibili.com/source/4415012932660122246',img:'https://manhua-163.hdslb.com/pic20160125ab73092197d24e0f9e76168c73cf076e.jpeg',title:'猎行者',new:'第454话 后会有期',click:'11.15亿'},
    { link:'https://163.bilibili.com/source/4316808069920053167',img:'https://manhua-163.hdslb.com/pic20190211364f0906f0fb41a78db42efb40811902.jpg',title:'嗜谎之神',new:'51 蜗牛（上）',click:'10.98亿'},
    { link:'https://163.bilibili.com/source/4350534790310120228',img:'https://manhua-163.hdslb.com/pic20180721d7dd430ee0e84cf4806135b025261d60.jpg',title:'妖神记',new:'375 第232话 铭文师聂离（上）',click:'10.5亿'},
    { link:'https://163.bilibili.com/source/4316808070150076188',img:'https://online-public-manhua.nos-eastchina1.126.net/pic201905314fd91d09bbc64d1da94252acaeb52454.jpg',title:'战国武校',new:'195 困兽之斗',click:'9.65亿'},
    { link:'https://163.bilibili.com/source/4639712296520118385',img:'https://online-public-manhua.nos-eastchina1.126.net/pic20190603e552f8aff1bd4272af1b06031a74ee61.jpg',title:'吾乃不死神',new:'269 我们一起走',click:'8.67亿'},
    { link:'https://163.bilibili.com/source/4432191056040099387',img:'https://manhua-163.hdslb.com/pic20181101ff51a0c3110042d296ec1c4cdee1116d.jpg',title:'甜蜜禁忌',new:'完结篇 甜蜜再也无需禁忌',click:'8.51亿'},
    { link:'https://163.bilibili.com/source/5151343932440115775',img:'https://manhua-163.hdslb.com/pic20180105ef9c292f7dfc4fb3bb16f59fdc28a993.jpg',title:'《阴阳师》官方漫画',new:'48 强大的敌人',click:'8.38亿'},
    { link:'https://163.bilibili.com/source/4340892233000112529',img:'https://manhua-163.hdslb.com/pic201803261fead702cf794eb78f6db2be6f4cec17.jpg',title:'赤铁之心',new:'Act.135',click:'8.28亿'},
    { link:'https://163.bilibili.com/source/4566399073990126076',img:'https://manhua-163.hdslb.com/pic20180314dbdd5f4c931445be9392830c8a16bb13.jpg',title:'李泰和方小甜的平行世界',new:'83 新作预告',click:'8.27亿'},
    { link:'https://163.bilibili.com/source/4961322651750342291',img:'https://manhua-163.hdslb.com/pic201902116d14c0c5cabc4a1a81b89c686d9fd3eb.jpg',title:'爱我吧，苏东坡',new:'第219话 大宋亡了？！',click:'7.98亿'},
    { link:'https://163.bilibili.com/source/5179627218700125502',img:'https://manhua-163.hdslb.com/pic20190517b7a15a3e58994dfca9a95b899b6a42ce.jpg',title:'女装大佬养成记',new:'212 太巫教圣女',click:'7.78亿'},
    { link:'https://163.bilibili.com/source/5140276124140516564',img:'https://manhua-163.hdslb.com/pic20190209f34a1891abbf48bf81633446ae65ed88.jpg',title:'吃鸡游戏',new:'70.3 新能力者',click:'7.73亿'},
    { link:'https://163.bilibili.com/source/4639712296520113040',img:'https://manhua-163.hdslb.com/pic201605302f788e8898d84591984b3b6abaa453e0.jpeg',title:'王牌校草',new:'316 第316话',click:'7.64亿'},
    { link:'https://163.bilibili.com/source/5119647669120515326',img:'https://manhua-163.hdslb.com/pic201903081f2d9b149ce943b0b66ff7fbaa51786f.jpg',title:'逍遥法外',new:'八二卦上 你欺负了她，你必须死',click:'7.55亿'},
    { link:'https://163.bilibili.com/source/4317039006300068050',img:'https://manhua-163.hdslb.com/pic201807214f1fa39ca1494e249008fe9743e25c31.jpg',title:'大唐无双',new:'80下',click:'7.02亿'},
    { link:'https://163.bilibili.com/source/4951522795260351081',img:'https://manhua-163.hdslb.com/pic201710175a8b010379904fe693976d19a6f37929.jpg',title:'杀道行者',new:'341 第340话：梦的守护者（下）',click:'6.75亿'},
    { link:'https://163.bilibili.com/source/4886099943680354529',img:'https://online-public-manhua.nos-eastchina1.126.net/pic20190610a19da5dc0f6044adad447571dcb86975.jpg',title:'男友在修罗场',new:'活动 番外篇启动',click:'6.57亿'},
    { link:'https://163.bilibili.com/source/4446410884720093254',img:'https://manhua-163.hdslb.com/pic/2015/12/07/18cc65c7f4534e0db980048c8eab0250.jpg',title:'我家大师兄脑子有坑',new:'番外 被迫营业坑（伏魔大会篇结束）',click:'6.37亿'},
    { link:'https://163.bilibili.com/source/4559486971000115977',img:'https://manhua-163.hdslb.com/pic20180419e744e79726174156823a5c9f8346e5e7.jpg',title:'漫画家与大明星：悦蓉与悦成',new:'完结礼物 完结礼物',click:'6.23亿'},
    { link:'https://163.bilibili.com/source/5209499881480501556',img:'https://manhua-163.hdslb.com/pic20180419131558b87ebb48418c4ddd6ad8bb0aca.jpg',title:'诸子37区',new:'165 你想怎么做',click:'6.08亿'},
    { link:'https://163.bilibili.com/source/4698660045160124534',img:'https://manhua-163.hdslb.com/pic20180418e446f8b4ebb949d29d9088fe6179cf6b.jpg',title:'盛唐妖异志',new:'266 君采送相思（四）遗憾的完结',click:'5.85亿'},
    { link:'https://163.bilibili.com/source/5149063881130114550',img:'https://manhua-163.hdslb.com/pic20181128740c4124619a4b08b43dcb50d6ebae6b.jpg',title:'我家少主计无双',new:'123 我从未想要伤害你',click:'5.84亿'},
    { link:'https://163.bilibili.com/source/4623259618240099500',img:'https://manhua-163.hdslb.com/pic201801241f53b351a2bc4fd3bca0f766ac589cd0.jpg',title:'唐寅在异界',new:'320 英雄难过美人关（1）',click:'5.52亿'},
    { link:'https://163.bilibili.com/source/4639788950150120754',img:'https://manhua-163.hdslb.com/pic2016083158b924edaea9450882959a537cfc581b.jpg',title:'太子',new:'63 第二十五回',click:'5.4亿'},
    { link:'https://163.bilibili.com/source/5308467837720025004',img:'https://manhua-163.hdslb.com/pic201808144efd36e5609a4386a3c3f602e6bd11e5.jpg',title:'街球江湖',new:'第45话 第45话',click:'5.35亿'},
    { link:'https://163.bilibili.com/source/4477190601790120299',img:'https://manhua-163.hdslb.com/pic20180808c9e56aced1a141d5966b3c1a164faee3.jpg',title:'非人哉',new:'第480话 如意金箍棒一万三千五百斤',click:'5.27亿'},
    { link:'https://163.bilibili.com/source/4947662278590158493',img:'https://manhua-163.hdslb.com/pic201906105822a66aa2fb4014bb5b1c3a8a5c9ef1.jpg',title:'女子学院的男生',new:'268 你复习了吗？',click:'5.15亿'},
    { link:'https://163.bilibili.com/source/4316965340990055253',img:'https://manhua-163.hdslb.com/pic/2016/01/03/145bd2595b034becb9265d84e0d8e5ac.jpg',title:'诡谲日常',new:'306 理想③',click:'4.95亿'},
    { link:'https://163.bilibili.com/source/4706627122660090011',img:'https://manhua-163.hdslb.com/pic20181130a91b1543ead745c99f23104525e85de5.jpg',title:'中华神医',new:'307 深夜交谈',click:'4.91亿'},
    { link:'https://163.bilibili.com/source/4639712296520113752',img:'https://manhua-163.hdslb.com/pic20190211325e1c6d66274155b75757ad086c3a0d.jpg',title:'王爷你好贱',new:'第458话 吵架',click:'4.88亿'},
    { link:'https://163.bilibili.com/source/4943378577070513820',img:'https://manhua-163.hdslb.com/pic20190211a8f6683d631846d7b51cca6c9461f65e.jpg',title:'二小姐使不得啊',new:'192集 小刺激',click:'4.76亿'},
    { link:'https://163.bilibili.com/source/4942174423450126134',img:'https://manhua-163.hdslb.com/pic201902135c3adf1b5e8a4efe94c7fb3ea20d8255.jpg',title:'学校有诡',new:'34(4) 会飞的头（四）',click:'4.6亿'},
    { link:'https://163.bilibili.com/source/4346777413000105271',img:'https://manhua-163.hdslb.com/pic201706202994d093396a43d4ac1ec287595d9e2b.jpg',title:'进化萌宠',new:'135 逃离HB',click:'4.58亿'},
    { link:'https://163.bilibili.com/source/4618239389800097226',img:'https://manhua-163.hdslb.com/pic201904102ac2879fcae5477c8485d6351656e697.jpg',title:'驭灵师',new:'18(14) 离殇',click:'4.56亿'},
    { link:'https://163.bilibili.com/source/5043514892150354047',img:'https://manhua-163.hdslb.com/pic2019060692faca51fb1b4763976522c915393244.jpg',title:'我是人类，更是吸血鬼',new:'090 袭击（上）',click:'4.48亿'},
    { link:'https://163.bilibili.com/source/5119732667930155707',img:'https://manhua-163.hdslb.com/pic20171130458af36cbb684951aa5c7d56711e9404.jpg',title:'关于我转生变成史莱姆这档事',new:'59 绝望与希望',click:'4.44亿'},
    { link:'https://163.bilibili.com/source/5232441787740344351',img:'https://manhua-163.hdslb.com/pic20190521a8c0e62110ac47b7bbeda1a710156cd5.jpg',title:'打开男神的正确姿势',new:'115 抽二手烟',click:'4.32亿'},
    { link:'https://163.bilibili.com/source/4316808069910044571',img:'https://manhua-163.hdslb.com/pic2016012597d948377f154d628d560950494f0954.jpeg',title:'百战学霸',new:'122 公告',click:'4.25亿'},
    { link:'https://163.bilibili.com/source/4986015905820129437',img:'https://manhua-163.hdslb.com/pic2018062127f0ee7f7f5f462aa884bc1d775185ec.jpg',title:'不嫁总裁嫁男仆',new:'第208话 出逃',click:'4.14亿'},
    { link:'https://163.bilibili.com/source/5132233943920509982',img:'https://manhua-163.hdslb.com/pic20180329e38876af9ed142bba51ad21d34c6677e.jpg',title:'钟小姐的钱世金生',new:'136 大结局：婚礼',click:'4.11亿'},
    { link:'https://163.bilibili.com/source/4316808070150079404',img:'https://manhua-163.hdslb.com/pic201710098dc5ca10a6974fceb4566a7c8d4e3807.jpg',title:'猎魂',new:'46(3) 完结章【永不言弃】',click:'4.09亿'},
    { link:'https://163.bilibili.com/source/4519595986040095989',img:'https://manhua-163.hdslb.com/pic20180827f6f890dd265142cd96163b3d9e4b97b0.jpg',title:'我的男友风净尘',new:'430 想和风净尘做的事',click:'4.01亿'},
    { link:'https://163.bilibili.com/source/5014768596550359076',img:'https://manhua-163.hdslb.com/pic201708010bac282ab89b4eccb19c8619745dc341.jpg',title:'火影忍者',new:'第700话',click:'3.97亿'},
    { link:'https://163.bilibili.com/source/5301408429510021770',img:'https://manhua-163.hdslb.com/pic201901046a0b9943ef32495cb593b269666ef584.jpg',title:'大佬重返16岁',new:'111 不为人知的过去',click:'3.84亿'},
    { link:'https://163.bilibili.com/source/4860241824180357708',img:'https://manhua-163.hdslb.com/pic201901025cdd77c52b3a4c6e8647e964155c48d2.jpg',title:'青蛙王子快走开!',new:'93 心动的人',click:'3.74亿'},
    { link:'https://163.bilibili.com/source/4806799487140116827',img:'https://manhua-163.hdslb.com/pic2019021112fd1930b61141a8af4e126748398285.jpg',title:'王爷不好婚',new:'76(上) 各有所得',click:'3.67亿'},
    { link:'https://163.bilibili.com/source/5130956633340504574',img:'https://online-public-manhua.nos-eastchina1.126.net/pic201905311da13c04a7ce44599862233e1c8c218e.jpg',title:'我的老婆是妲己',new:'100 劫仙门派！',click:'3.63亿'},
    { link:'https://163.bilibili.com/source/4891040955760352729',img:'https://manhua-163.hdslb.com/pic201703100f4e98dc9204467abc215b10ad3a4f71.jpg',title:'重生豪门之强势归来',new:'第254话 急于求成',click:'3.61亿'},
    { link:'https://163.bilibili.com/source/4394282662640119988',img:'https://manhua-163.hdslb.com/pic/2015/11/27/3cbe9049836b40fb9f9b8089484c4f20.jpeg',title:'黑白诡录',new:'117 最终话',click:'3.39亿'},
    { link:'https://163.bilibili.com/source/4316808070160064785',img:'https://manhua-163.hdslb.com/pic/2015/07/02/e59c092c3b8a46099c3c660522aaa562.jpg',title:'狐话狐说',new:'81 禀告太子大人！',click:'3.35亿'},
    { link:'https://163.bilibili.com/source/5015115116720343963',img:'https://manhua-163.hdslb.com/pic20170801ad7251570163437597c2d70ed6d23139.jpg',title:'境·界（BLEACH死神）',new:'686话',click:'3.33亿'},
    { link:'https://163.bilibili.com/source/4316808069920050251',img:'https://manhua-163.hdslb.com/pic20171019c4a8d7570e384e18ae2a831c9b326e09.jpg',title:'羽烟纱',new:'28(10) 凡人的生活（10）（完）',click:'3.32亿'},
    { link:'https://163.bilibili.com/source/4316808070160065188',img:'https://manhua-163.hdslb.com/pic201803270cc68b32251a46b0b4030757d860c923.jpg',title:'逆转天使',new:'98 后会有期',click:'3.21亿'},
    { link:'https://163.bilibili.com/source/4920179441830512120',img:'https://manhua-163.hdslb.com/pic20170414f40ef21717cf45b18a51b9e42b1ada44.jpg',title:'偷星九月天',new:'番外18 生日夜惊魂',click:'3.2亿'},
    { link:'https://163.bilibili.com/source/4847754234270513769',img:'https://manhua-163.hdslb.com/pic201701193d01ba37e522413291a1a0cbbfcffc1d.jpg',title:'女生请止步',new:'170 我会保护你',click:'3.16亿'},
    { link:'https://163.bilibili.com/source/4961131420850500467',img:'https://manhua-163.hdslb.com/pic201709146ea9113648eb4a0883d1f30776ea683b.jpg',title:'总裁爱上两个我',new:'最终话',click:'3.1亿'},
    { link:'https://163.bilibili.com/source/4891226865760513870',img:'https://manhua-163.hdslb.com/pic20170310fba58affb7d248229bd4faae14cff6ec.jpg',title:'禀告皇子大人',new:'93 第一季end，期待再见面',click:'3.02亿'},
    { link:'https://163.bilibili.com/source/4926046160470129413',img:'https://manhua-163.hdslb.com/pic201711098d094e0340af4f50afbe58603f0e84cb.jpg',title:'JM特殊客人服务部',new:'最终话 总监回来了？',click:'2.85亿'},
]

router.get('/getComic',(request,response) =>{
    response.status(200).json(comic);
})

router.get('/getComicClass',(request,response)=>{
    response.status(200).json(comicClass);
})
//导出router
module.exports=router;