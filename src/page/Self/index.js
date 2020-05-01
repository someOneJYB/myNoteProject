import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage'
import Zoom from 'react-reveal/Zoom';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import PieChart from '../../component/Piechart'

const animated = {
    0:  'flash',
    1: 'fadeInRight',
    2: 'fadeInLeft',
    3: 'fadeInDown',
    4: 'bounceIn',
    5: 'rotateIn'
}

import './index.less'
class MySelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                'js': 0.7,
                'css': 0.5,
                '工程能力': 0.6,
                '框架使用理解': 0.6,
                '后端能力': 0.3,
                '关于我': ''
            },
            desc: {
                'js': ['1、es6新特性', '2、promise', '3、模块化开发', '4、js实现基础算法'],
                css: ['1、能够使用sass，less开发并进行CSS的预编译', '2、可以熟练的使用CSS3新特性和html5的语义化开发，掌握移动端的调试方法', '3、可以实现做到较好的浏览器兼容性 ，可以使用bootstrap进行网站的设计'],
                '工程能力': ['1、可以使用webpack构建工具对项目进行打包处理', '2、babel配置和简单的插件编写', 'webpack的插件和loader', '3、webpack性能优化', '4、使用git进行合作', '5、使用charles进行线上项目的调试，进行debug'],
                '框架使用理解': ['1、react、react-router react-redux 全家桶', '2、理解redux并编写中间件', '3、熟练地使用 react 进行组件化的开发， 使用 reselect 进行性能优化'],
                '后端能力': ['1、使用 koa 进行开发', '2、了解 node 和 php、 java', '3、能够使用python进行简单的开发'],
                '关于我': ['1、2018.6-2018.10 字节跳动 前端开发\n',
                '主要是负责国际版头条topbuzz移动端的开发，主要的的技术栈:react+zepto+jsbridge+jinji(python模版或者go模 版) ，期间开发了用户个人主页中的任务页面，搜索结果页优化，重构了文章详情页面，开发 koa+react的一个服务端渲染 的 分享页面，期间使用了charles进行线上测试，使用postman发送数据，使用simulator和chrome inspect进行线上测试。', '2、2018.12-2019.3 知乎工具化和平台组 前端开发\n',
                '主要负责知乎PC主站的开发，使用的技术栈 react-redux+react+react-router。开发话题头部增加review模块，根据ab 参数显示问答页面的话题头部，用户可以对各类型的话题进行评分，统一整个话题样式，更加熟练的使用 react(包含rea ct16新特性)，熟悉redux的各个流程，修复一些jira中的bug。开发移动端问题也头部增加优化，增加收录的卡片展示， 使用的技术栈 react-redux+react+react-router，进行移动端的 bug 定位和解决\n', '3、2019.5-至今 车好多集团毛豆新车 毛豆客户平台前端开发\n' ,
                '   1、负责毛豆平台前端的代理商app的开发和维护，技术栈 react + react-redux+react-router。独立开发代理商入驻线上\n' +
                '化模块，减少了运营成本，代理商入驻时效缩短至20天，时间成本降低为原来的约0.05倍， 花费降低为原来的约0.11倍。 并进行项目的优化和工程的升级。\n' +
                '2、负责站外 vue 页面代理商签到模块开发和 im 页面 vue 的企业微信模块开发。\n' +
                '3、内部函数库维护和组件的开发。\n' +
                '4、维护和开发内部运营平台阿米巴，使用技术栈 react + react-redux+react-router+mobx。 5、维护内部后端接口数据录入平台。', '快来联系我啊', '1、我的电话:18845890119','2、我的邮箱:1329040686@qq.com\n',
                '3、我的github地址: https://github.com/someOneJYB']
            },
            animated: 'flash'
        };
        this.index = 0;
        window.fullpage('#fullpage', {
            anchors:['firstPage', 'secondPage', 'thirdPage'],
            licenseKey: 'YOUR_KEY_HERE',
            sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
        });
    }

    renderPage = (index) => {
        this.animated = animated[(++this.index)%6]
    }
    afterSlideLoad = (section, origin, destination, direction) => { console.log(section, origin, destination, direction)}
    render() {
        const { data, desc } = this.state;
        const keys = Object.keys(data)
        return (
            <div>
                <ReactFullpage
                    //fullpage options
                    licenseKey = {'YOUR_KEY_HERE'}
                    sectionsColor={["#282c34", "#ff5f45", "#0798ec", "#ff5f45", "#0798ec", "#ff5f45"]}
                    scrollingSpeed = {500} /* Options here */
                    // afterRender={this.renderPage}
                    afterLoad={this.renderPage}
                    afterSlideLoad={this.afterSlideLoad}
                    render={({ state, fullpageApi }) => {
                        return (
                            <ReactFullpage.Wrapper>
                                {
                                    keys.map((item, index) => {
                                       return <div id={index} className={`self-skill section a${index}`} key={item}>
                                           <h3 className="self-title" style={{ textAlign: 'center', color: '#fff'}}>{item}</h3>
                                           <ul>
                                               {
                                                   desc[item].map((item1, index1) => {
                                                       return  <div className="intro-font" key={item1} style={{ animationDelay: index1*0.1 + 's'}}  className={(this.animated|| '') + ' intro-font'}>{item1}</div>
                                                   })
                                               }
                                           </ul>
                                           {data[item] && <PieChart rate={data[item]}/>}
                                       </div>
                                    })
                                }
                            </ReactFullpage.Wrapper>
                        );
                    }}
                />
            </div>
        );
    }
}
export default MySelf
