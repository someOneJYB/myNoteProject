import React from 'react';
import { TabBar } from 'antd-mobile';
import NoteList from '../NoteList'
import NoteWrite from '../NoteWrite'
import Self from '../Self'
import CustomIcon from '../../component/CustomIcon'
import './index.less'

export default class TabBarExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: false,
        };
    }

    render() {
        return (
            <div className="app-wrapper">
                <TabBar unselectedTintColor="#919199"
                        tintColor="#4184F4"
                        barTintColor="white"
                        hidden={this.state.hidden}
                        tabBarPosition="bottom">
                    <TabBar.Item
                        title="笔记"
                        key="笔记"
                        icon={<CustomIcon className="homepage-tab-bar-icon" type={require('../../svg/tab_message_default.svg')} size="md" />}
                        selectedIcon={<CustomIcon className="homepage-tab-bar-icon" type={require('../../svg/message_active.svg')} size="md" />}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                    >
                        <NoteList {...this.props} />
                    </TabBar.Item>

                    <TabBar.Item
                        title="写作"
                        key="写作"
                        icon={<CustomIcon className="homepage-tab-bar-icon" type={require('../../svg/workDesk.svg')} size="md" />}
                        selectedIcon={<CustomIcon className="homepage-tab-bar-icon" type={require('../../svg/workDesk_active.svg')} size="md" />}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                    >
                        <NoteWrite {...this.props}/>
                    </TabBar.Item>

                    <TabBar.Item
                        icon={<CustomIcon className="homepage-tab-bar-icon" type={require('../../svg/profile.svg')} size="md" />}
                        selectedIcon={<CustomIcon className="homepage-tab-bar-icon" type={require('../../svg/profile_active.svg')} size="md" />}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                       >
                        <Self/>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
