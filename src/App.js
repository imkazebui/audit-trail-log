import React from "react";
import { Layout, Menu, Breadcrumb, Icon, BackTop } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import List from "./List";
import { Info } from "./Info";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class App extends React.Component {
    state = {
        collapsed: false,
        isOpen: false
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    handleClickRow = idx => () => {
        this.toggle();
    };

    toggle = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

    render() {
        const { isOpen } = this.state;
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Header className='header'>
                    <div className='logo' />
                    <Menu
                        theme='dark'
                        mode='horizontal'
                        defaultSelectedKeys={["2"]}
                        style={{ lineHeight: "64px" }}
                    >
                        <Menu.Item key='1'>nav 1</Menu.Item>
                        <Menu.Item key='2'>nav 2</Menu.Item>
                        <Menu.Item key='3'>nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <Menu
                            theme='dark'
                            defaultSelectedKeys={["1"]}
                            mode='inline'
                        >
                            <Menu.Item key='1'>
                                <Icon type='pie-chart' />
                                <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item key='2'>
                                <Icon type='desktop' />
                                <span>Option 2</span>
                            </Menu.Item>
                            <SubMenu
                                key='sub1'
                                title={
                                    <span>
                                        <Icon type='user' />
                                        <span>User</span>
                                    </span>
                                }
                            >
                                <Menu.Item key='3'>Tom</Menu.Item>
                                <Menu.Item key='4'>Bill</Menu.Item>
                                <Menu.Item key='5'>Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key='sub2'
                                title={
                                    <span>
                                        <Icon type='team' />
                                        <span>Team</span>
                                    </span>
                                }
                            >
                                <Menu.Item key='6'>Team 1</Menu.Item>
                                <Menu.Item key='8'>Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key='9'>
                                <Icon type='file' />
                                <span>File</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: "#fff",
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                            }}
                        >
                            <List onClick={this.handleClickRow} />
                            <Info toggle={this.toggle} isOpen={isOpen} />
                        </Content>
                        <Footer style={{ textAlign: "center" }}>@kaze</Footer>
                    </Layout>
                </Layout>
                <BackTop>
                    <div className='ant-back-top-inner'>
                        <Icon type='arrow-up' />
                    </div>
                </BackTop>
            </Layout>
        );
    }
}

export default App;
