import 'antd/dist/antd.css';
import styles from './home.css';
import { Menu, Icon, Button, Avatar, Layout, Empty,Card, Col, Row,Modal,List  } from 'antd';
import { connect } from 'dva'
import Link from 'umi/link'

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const data = [
  {
    title: '今日访问量',
  },
  {
    title: '今日浏览量',
  },
  {
    title: '今日登录量',
  },
  {
    title: '今日订单量',
  },
  {
    title: '今日播放量',
  },
  {
    title: '今日下单量',
  },
];

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
  render() {
    return (
      <div>
          <Layout>          
            <Content style={{ background: '#fff', minHeight: 280, }}
            >
              {this.props.children}
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Card title={item.title}>99</Card>
                  </List.Item>
                )}
              />
              
              <div className={styles.data}>
              <span>今日实时数据</span>
              <Button type="primary">刷新数据</Button>
              </div>
              <Empty className={styles.empty}
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              imageStyle={{
                height: 120,
              }}
              description={
                <span>暂无数据</span>
              }
            >
              <Button type="primary">Create Now</Button>
            </Empty>


            </Content>
           
          </Layout>
      </div>

    );
  }
}

// const WrappedNormal =  Form.create()(App);
// export default WrappedNormal
export default connect(state=>state.info)(App)




