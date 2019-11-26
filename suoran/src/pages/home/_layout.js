import 'antd/dist/antd.css';
import styles from './home.css';
import { Menu, Icon, Button,Avatar, Layout, Input,Modal,Form} from 'antd';
import {connect} from 'dva'
import Link from 'umi/link'

const { Header, Sider, Content,Footer } = Layout;
const { SubMenu } = Menu;



class App extends React.Component {
  state = {
    collapsed: false,
    current: 'mail',
  };
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };



  logout=()=>{

    Modal.confirm({
      title: '确认退出吗?',
      onOk:()=>{
        // console.log('OK');
        this.props.history.replace('/')

      }
    });
  }


  render() {
    return (
      <div>
        <h2>欢迎使用<a>所然后台管理系统</a></h2>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className={styles.menu}>
              <Menu.Item key="mail">
                {/* <Icon type="rollback" /> */}
                <Link to='../home/home'>返回首页</Link>
              </Menu.Item>
              {/* <Menu.Item key="mail1">
                <Icon type="bell" />
                系统通知
              </Menu.Item>               */}
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                   <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                    个人中心
                   </span>
                }
              >
                <Menu.ItemGroup title="">
                  <Menu.Item key="setting:1">修改密码</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item key="mail2">
               
                欢迎您admin001
              </Menu.Item>
              <Menu.Item  >
                <a  onClick={this.logout}>
                <Icon type="logout" />
                  退出登录
                </a>
              </Menu.Item>
              
            </Menu> 
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo} >
            {/* <img src='../assets/logo.jpg' /> */}
          </div>
          
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            <SubMenu
              key="sub1"
              title={
                <span><Icon type="user" /><span>用户管理</span> </span>
              }info
            >
              <Menu.Item key="1"><Link to='./info'><Icon type="user" />用户列表</Link></Menu.Item>
              <Menu.Item key="2"><Link to='./address'><Icon type="shop" />收货地址</Link></Menu.Item>
              <Menu.Item key="3"><Link to='./feedback'><Icon type="form" />用户反馈</Link></Menu.Item>
              <Menu.Item key="4"><Link to='./record'><Icon type="diff" />消费记录</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="desktop" />
                  <span>商品管理</span>
                </span>
              }
            >
              <Menu.Item key="5"><Link to='./prolist'><Icon type="bars" />商品列表</Link></Menu.Item>
              <Menu.Item key="6"><Link to='./classify'><Icon type="gold" />商品分类</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="pie-chart" />
                  <span>订单管理</span>
                </span>
              }
            >
              <Menu.Item key="7"><Link to='./orders'><Icon type="block" />订单列表</Link></Menu.Item>
              <Menu.Item key="8"><Link to='./O-details'><Icon type="schedule" />订单详情</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>系统管理</span>
                </span>
              }
            >
              <Menu.Item key="9"><Link to='./charts'><Icon type="line-chart" />数据报表</Link></Menu.Item>
              <Menu.Item key="10"><Icon type="safety-certificate" />安全管理</Menu.Item>
              <SubMenu key="sub5" title="其它">
                <Menu.Item key="11"><Icon type="notification" />其它</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, }}
          > 
           
           {this.props.children}
          
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </Layout>

     </div>
    );
  }
}

const WrappedNormal = Form.create() (App);

export default WrappedNormal  
// export default connect(state=>state.info)(App)


    
  
