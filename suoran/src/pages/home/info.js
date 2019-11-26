import 'antd/dist/antd.css';
import styles from './info.css';
import Link from 'umi/link'
import axios from 'axios'
import * as api from '../utils/getpro';
import UserForm from './new'
import React, { Component } from 'react';

import {
  Table, Button, Popconfirm, Modal
  , Col, Icon, Dropdown, Menu, Input, Form,
  Select,
  InputNumber,
  Upload,
  message
} from 'antd';
import Password from 'antd/lib/input/Password';


const data = [];
for (let i = 0; i < 1; i++) {
  data.push({
    key: i.toString(),
  });
}

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


const Item = Form.Item

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}





class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: null,
      dataSource: [],
      isShow: false,
      loading: false,
      userName: "",
      password: "",


    }
  }


  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
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

  delete(text,record) {
    console.log(text,record)
    api.delacc(text._id,
      localStorage.getItem("token"))
      .then((data) => {
        console.log(data.data)
      })
  }

  edit() {
    api.edit(
      {
        userName: 'admin001',
      }, localStorage.getItem("token"))
      .then((data) => {
        console.log(data.data)
      })
  }

normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      )
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    var _this = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      _this.setState({
        userName: values.name,
        password: values.pwd,
        nickName: values.nick
      })
      
    });
  }

  adduser() {
    console.log(this.state.name)
    // api.getAdd({
    //   userName: this.state.name,
    //   password: this.state.pwd,
    //   nickName: this.state.nick,
    //   avatar: ''
    // }, localStorage.getItem("token")
    // ).then((data) => {
    //   console.log(data)
    // })


    this.setState({ isShow: false })

  }

  


  addorUpdateUser = () => {
    // api.getAdd({
    //     userName:this.input.value,
    //     password:'',
    //     nick:'',
    //     avatar:''
    // },localStorage.getItem("token")
    // ).then((data)=>{
    //   console.log(data)
    // })
    // const val = this.name.value
    // console.log(this.name.value)
    // console.log(this.pwd.value)
    // console.log(this.nick.value)

    // const user = this.form.getFieldsValue()
    // this.form.resetFields()
    // const result = await api.getAdd(user)
    // if(result.status===0){
    //   message.success('添加用户成功')
    // this.getUsers()
    // }
  }

  componentDidMount() {
    api.getInfo(
      { per: 50, page: 3 },
      localStorage.getItem("token"))
      .then((data) => {
        console.log(data.data.users)
        var list = data.data.users
        for (let i = 0; i < data.data.users.length; i++) {
          list[i].key = i + 1
          list[i].tou = data.data.users[i].avatar;
          list[i].nick = data.data.users[i].nickName;
          list[i].name = data.data.users[i].userName;
          list[i].age = data.data.users[i].createdAt;
          list[i].id = data.data.users[i]._id;
        }
        // console.log(list)
        this.setState({
          list: list,
        })
      })
  }

  
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { imageUrl } = this.state;

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
    const { users, isShow } = this.state
    const columns = [
      {
        title: '头像',
        dataIndex: 'tou',
        editable: true,
        render: img => <img src={img} className={styles.img} />,
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
        title: 'ID',
        dataIndex: 'id',
        width: '25%',
        editable: true,
      },
      {
        title: '操作',
        key: 1,
        width: '5%',
        editable: true,
        render: () => <Button type="default" onClick={() => this.edit()} >编辑</Button>,
      },
      {
        key: 2,
        width: '5%',
        editable: true,
        render: (text, record) =>
          this.state.list.length >= 1 ? (
            <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.key)}>
              <Button type="danger" onClick={() => this.delete(text, record)}>删除</Button>
            </Popconfirm>
          ) : null,
      },
    ];

    return (
      <div>
        {/* <h1>用户信息</h1> */}
        <div className={styles.data}>
          <Button type='primary' onClick={() => this.setState({ isShow: true })}> <Icon type="plus" />新建用户</Button>
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
        <Table rowSelection={rowSelection} pagination={{ pageSize: 4 }} columns={columns} dataSource={this.state.list} />
        <Modal
          title="添加用户"
          visible={isShow}
          onOk={this.addorUpdateUser}
          onCancel={() => this.setState({ isShow: false })}
        >
          {/* <UserForm
            setForm={form => this.form = form}
          /> */}
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Item label='用户名' >
              {getFieldDecorator('name', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '用户名为必填' }
                  ]
                })(<Input type="text" placeholder='请输入用户名' />)
              }
            </Item>
            <Item label='密码' >
              {getFieldDecorator('pwd', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '密码为必填' }
                  ]
                })(<Input.Password placeholder="请输入密码" />)
              }
            </Item>
            <Item label='昵称' >
              {getFieldDecorator('nick', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '昵称为必填' }
                  ]
                })(<Input type="text" placeholder='请输入昵称'  />)
              }
            </Item>

            <Item label="上传头像" extra="">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload ref={input => this.img = input}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              )}
            </Item>
            <Button  htmlType="submit" onClick={() => this.adduser()}>确定</Button>
          </Form>


        </Modal>

      </div>
    )

  }
}

export default Form.create({ name: 'normal_login' })(App)



