import * as MarkdownIt from 'markdown-it';
import * as React from 'react';
import { ImagePicker, Button, InputItem, Picker, List } from 'antd-mobile';

import { post } from '../../common/js/axios'
import * as ReactMarkdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite';
import './index.less'
const MOCK_DATA = '# hello world';

const PLUGINS = undefined;
// const PLUGINS = ['header', 'image', 'full-screen'];

const seasons = [
    {
        label: 'js',
        value: 'js',
    },
    {
        label: 'css',
        value: 'css',
    },
    {
        label: '网络',
        value: '网络',
    },
    {
        label: '性能',
        value: '性能',
    },
    {
        label: 'webpack',
        value: 'webpack',
    },
    {
        label: 'babel',
        value: 'babel',
    },
    {
        label: '框架',
        value: '框架',
    },
    {
        label: '随笔感悟',
        value: '随笔感悟',
    },
];
export default class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.renderHTML = this.renderHTML.bind(this);
        // initial a parser
        this.state = {
            file: [],
            text: MOCK_DATA,
            type: []
        }
        this.autoFocusInst = React.createRef()
        this.mdParser = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
            highlight(str, lang) {
                /*
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    return hljs.highlight(lang, str).value
                  } catch (__) {}
                }
                return '' // use external default escaping
                */
            },
        });
    }

    handleEditorChange = (it, event) => {
        this.setState({
            text: it.text
        })
        // console.log('handleEditorChange', it.text, it.html, event);
    };

    handleImageUpload = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = data => {
                // @ts-ignore
                resolve(data.target.result);
            };
            reader.readAsDataURL(file);
        });
    };

    onCustomImageUpload = (event) => {
        console.log('onCustomImageUpload', event);
        return new Promise((resolve, reject) => {
            const result = window.prompt('Please enter image url here...');
            resolve({ url: result });
            // custom confirm message pseudo code
            // YourCustomDialog.open(() => {
            //   setTimeout(() => {
            //     // setTimeout 模拟oss异步上传图片
            //     // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
            //     const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'
            //     resolve({url: url, name: 'pic'})
            //   }, 1000)
            // })
        });
    };

    handleGetMdValue = () => {
        if (this.mdEditor) {
            alert(this.mdEditor.getMdValue());
        }
    };

    handleGetHtmlValue = () => {
        if (this.mdEditor) {
            alert(this.mdEditor.getHtmlValue());
        }
    };

    renderHTML(text) {
        // return this.mdParser.render(text);
        // Using react-markdown
        return React.createElement(ReactMarkdown, {
            source: text,
        });
    }

    onChange = (file) => {
        console.log(file[0], 'file123456789')
        let data = new FormData()
        data.append('file', file[0].file)
        post('http://localhost:9035/upload', data,{
            headers: { 'content-type': 'multipart/form-data' },
        }).then(res => {
            this.setState({
                text: this.state.text + '\n' + `![](${res.filename})`
            })

        }).catch(err => console.log(err))
    }

    changeType = (val) => {
        this.setState({
            type: val[0],
        })
    }

    send = () => {
        const { type, text } = this.state
        post('http://localhost:9035/setMdData', { data: {
                title: '123',
                type,
                text
            } }).then(res => console.log(res)).catch(err => console.log(err))
        // console.log(this.mdEditor.getMdValue(), this.autoFocusInst.current.state.value, 123)
    }

    render() {
        return (
            <div className="demo-wrap">
                <InputItem
                    clear
                    placeholder="输入标题"
                    ref={this.autoFocusInst}
                >标题</InputItem>
                <Picker data={seasons} cols={1} onChange={this.changeType} value={[this.state.type]}>
                    <List.Item arrow="horizontal">文章类型</List.Item>
                </Picker>
                <ImagePicker
                    onChange={this.onChange}
                    files={this.state.file}
                />
                    <MdEditor
                        ref={node => (this.mdEditor = node || undefined)}
                        value={this.state.text}
                        style={{ height: '500px', width: '100%' }}
                        renderHTML={this.renderHTML}
                        plugins={PLUGINS}
                        config={{
                            view: {
                                menu: true,
                                md: true,
                                html: true,
                                fullScreen: true,
                                hideMenu: false,
                            },
                            table: {
                                maxRow: 5,
                                maxCol: 6,
                            },
                            imageUrl: 'https://octodex.github.com/images/minion.png',
                            syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
                        }}
                        onChange={this.handleEditorChange}
                        onImageUpload={this.handleImageUpload}
                        // onCustomImageUpload={this.onCustomImageUpload}
                    />
                <Button style={{ marginTop: '20px' }} type="primary" onClick={this.send}>保存</Button>
            </div>
        );
    }
}
