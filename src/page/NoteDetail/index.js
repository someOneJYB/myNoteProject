import React from 'react'
import ReactMarkdown from 'react-markdown'
import Header from '../../component/Header'
import { get } from '../../common/js/axios'
import './index.less'
export default class BlogDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            articleDetail:'### hello word',
            count: 0,
        }
    }
    componentDidMount() {
        // document.getElementById('hhh').onclick = this.nativeSet.bind(this)
        console.log('123')
        this.setState({
            count: ++this.state.count
        }, ()=>console.log(this.state.count))
        console.log('state end')
        get(`http://127.0.0.1:9035/api/${this.props.match.params.count || 1}`).then(res => this.setState({
            articleDetail: res.data,
            title: res.title,
        })).catch(err => console.log(err))
    }

    nativeSet = () => {
        this.setState({
            count: ++this.state.count
        })
        console.log(this.state.count)
    }

    set = () => {
        console.log(0)
        debugger
        this.setState({
            count: ++this.state.count
        }, () => console.log(this.state.count))
        console.log('first get', this.state.count)
        this.setState({
            count: ++this.state.count
        }, () => console.log('hehehe'))
    }

    render(){
        const { title = '', articleDetail } = this.state
        return(
            <div>
                <Header { ...this.props } title={title||''} />
            <div className="detail-container">
            <ReactMarkdown source={articleDetail}
                           escapeHtml={false}></ReactMarkdown>
            </div>
            </div>
        )
    }
}
