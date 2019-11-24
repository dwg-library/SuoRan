import 'antd/dist/antd.css';
import styles from './info.css';
import Link from 'umi/link'
import axios from 'axios'
import * as api from '../../utils/getpro';
import { Table,Form, Button, Popconfirm, Checkbox, Col, Icon, Dropdown, Menu, Layout, Input, } from 'antd';



const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  console.log('click', e);
}

class App extends React.Component {
  constructor(props){
    super(props)
     this.state = {
      list: null,
      dataSource:[],
      selectedRowKeys: []
  }
}

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    })
  }
  handleDelete = key => {
    const dataSource = [...this.state.list];
    this.setState({ list: dataSource.filter(item => item.key !== key) });
  };

  
  handleSave = row => {
   
    const newData = [...this.state.list];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ list: newData });
  };
  

  componentDidMount(){
    api.getInfo(
      localStorage.getItem("token"))
      .then((data) => {
        console.log(data.data.users)
        var list=data.data.users
        for(let i=0;i<data.data.users.length;i++){
            list[i].tou=data.data.users[i].avatar;
            list[i].nick=data.data.users[i].nickName;
            list[i].name=data.data.users[i].userName;
            list[i].age=data.data.users[i].createdAt;
            list[i].id=data.data.users[i]._id;
        }
        console.log(list)
        this.setState({
          list:list,
         
        })
      
      })
  }
  delete() {
      api.del(
        localStorage.getItem("token"))
      .then((data)=>{
        console.log(data.data)
      })
  }

  edit() {
    api.edit(
      {
        userName:'admin001',
      },localStorage.getItem("token"))
    .then((data)=>{
      console.log(data.data)
    })
}


  render() {
    
    
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', 
        name: record.name,
      }),
    }
    const { Search } = Input;
    const columns = [
      {
        title: '头像',
        dataIndex: 'tou',      
        editable: true,
        render: img => <img src={img} className={styles.img}/>,
        width: '10%',
      },
      {
        title: '昵称',
        dataIndex: 'nick',
        render: text => <a>{text}</a>,
        width: '10%',
        editable: true,
      },
      {
        title: '用户名',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
        width: '10%',
        editable: true,
      },
      {
        title: '创建日期',
        dataIndex: 'age',
        width: '25%',
        editable: true,
      },
      {
        title: '更新日期',
        dataIndex: 'id',
        width: '25%',
        editable: true,
      },
      {
        title: '编辑',
        dataIndex: '',
        key:1,
        width: '5%',
        editable: true,
        render: () => <Button type="default" onClick={()=>this.edit()}>编辑</Button>,
      },
      {
        title: '操作',
        dataIndex: '',
        key:2,
        width: '5%',
        editable: true,
        render: (text, record) =>
        this.state.list.length >= 1 ? (
          <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.key)}>
           <Button type="danger" onClick={()=>this.delete()}>删除</Button>
          </Popconfirm>
        ) : null,
      },
      
    ];

    return (
      <div>
        {/* <h1>用户信息</h1> */}
        <div className={styles.data}>
          <Link to='./new'><Button type='primary'> <Icon type="plus" />新建</Button></Link>
          <Dropdown overlay={menu}>
            <Button type="default">
              更多操作 <Icon type="down" />
            </Button>
          </Dropdown>
          <Col span={8}>
            <Search placeholder="搜索用户" className={styles.sear}
              onSearch={value => console.log(value)} enterButton />
          </Col>
        </div>
        
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.list} >
          
        </Table>
      </div>
    )
  }
}
export default App


