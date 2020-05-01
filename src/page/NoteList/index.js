import React from 'react';
import { ListView } from 'antd-mobile';
import { get } from '../../common/js/axios'

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}


 class Demo extends React.Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: false,
            hasMore: true,
            list: [],
            page: 1,
            height: document.documentElement.clientHeight * 3/3.3,
        };
    }
    lv = React.createRef();


    componentDidMount() {
        this.getData()
    }

    getData = () => {
        if (!this.state.hasMore) {
            return;
        }
        if(this.state.isLoading) return;
        let { list, dataSource, page } = this.state
        this.setState({
            isLoading: true,
        })
        get(`http://127.0.0.1:9035/getAllNote?page=${page}&pageSize=5`).then(res => {
            list = list.concat(res.data)
            this.setState({
                hasMore: list.length < res.total,
                dataSource: dataSource.cloneWithRows(list || []),
                isLoading: false,
                list,
                page: ++page
            })
        }).catch(err =>{
            this.setState({
                isLoading: false,
            })
        })
    }

    onEndReached = (event) => {
        console.log('reach')
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        this.getData()
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            console.log(rowData)
            return (
                <div key={rowData.desc} style={{ padding: '0 15px' }} onClick={() => this.props.history.push(`/blogDetail/${rowData.mdSrc}`)}>
                    <div
                        style={{
                            lineHeight: '30px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{rowData.title}</div>
                    <div style={{ display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={rowData.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.desc}</div>
                            <div>
                                {(rowData.connected || []).map(item => {
                                    return <span key={item} style={{ fontSize: '15px', color: '#FF6E27' }}>{item + '    '}</span>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <ListView
                ref={this.lv}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ textAlign: 'center' }}>
                    {this.state.isLoading ? '加载中...' : '到底了'}
                </div>)}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={5}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}
export default Demo
