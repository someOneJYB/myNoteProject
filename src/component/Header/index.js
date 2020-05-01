import React from 'react'
import { Icon, NavBar } from "antd-mobile";


export default function Header(props) {
    return   <NavBar
        mode="light"
        style={{ position: 'fixed', top: 0, width: '100%'}}
        icon={<Icon type="left" />}
        onLeftClick={() => props.history.go(-1)}
        rightContent={[
            <Icon key="1" type="ellipsis" />,
        ]}
    >{props.title || ''}</NavBar>
}
