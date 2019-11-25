
import Link from 'umi/link';
import styles from './prolist.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Icon, Col, } from 'antd';
import * as api from '../../utils/products';

const { Search } = Input;

const data = [];
for (let i = 0; i < 1; i++) {
  data.push({
    key: i.toString(),
  });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      isShow: false,
    }
  }

  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      message,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}


class EditableTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data,
      editingKey: '',
      list: null,
    };

  }


  isEditing = record => record.key === this.state.editingKey;

  cancel = (id) => {
    console.log(id)
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const { data } = this.state;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }


  edit(key) {
    console.log(key)
    this.setState({ editingKey: key });
  }


  componentDidMount() {
    api.getList(
      { per: 50,},
      localStorage.getItem("token"))
      .then((data) => {
        // console.log(data.data.products)
        var list = data.data.products
        for (var i = 0; i < data.data.products.length; i++) {
          list[i].key = i + 1
          list[i].img = data.data.products[i].coverImg;
          list[i].name = data.data.products[i].name;
          list[i].desc = data.data.products[i].descriptions;
          list[i].price = data.data.products[i].price;
          list[i].num = data.data.products[i].quantity;
          list[i].id = data.data.products[i]._id;
        }
        // console.log(list)
        this.setState({
          list: list,
        })
      })

  }

  isEditing = (record) => {
    const { editingKey } = this.state;
    return record.key === editingKey;
  };

  cancel = (key) => {
    if (key.length > 6) {
      const { data } = this.state;
      const newData = data;
      newData.splice(data.length - 1, 1);
      this.setState({ data: newData, editingKey: key });
    }
    this.setState({ editingKey: '' });
  };

  
  handleDelete = key => {
    const dataSource = [...this.state.list];
    this.setState({ list: dataSource.filter(item => item.key !== key) });
  };

  delete(text) {
    // console.log(text)
    api.del(
        text._id,
        localStorage.getItem("token"))
      .then((data)=>{
        // console.log(data.data)
      })     
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

  render() {
    const { users, isShow } = this.state
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    this.columns = [
      {
        title: '商品图片',
        dataIndex: 'img',
        editable: true,
        render: img => <img src={img} className={styles.img} />,
        width: 90,
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
        editable: true,
        ellipsis: true,
        width: 90,
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        render: text => <a>{'￥' + text}</a>,
        editable: true,
        width: 90,
      },
      {
        title: '商品数量',
        dataIndex: 'num',
        editable: true,
        width: 90,
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        editable: true,
        ellipsis: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
              <Button disabled={editingKey !== ''} onClick={() => this.edit(record.key)}  onClick={() => this.setState({ isShow: true })}>
                修改
            </Button>
            );
        },
        width:100,
      },
      {
        key:2,
        width: '5%',
        editable: true,
        render: (text, record) =>
        this.state.list.length >= 1 ? (
          <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.key)}>
           <Button type="danger" onClick={()=>this.delete(text,record)}>删除</Button>
          </Popconfirm>
        ) : null,
        width:100,
      },
      

    ];


    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <div>
        <div className={styles.data}>
          <h2 className={styles.title}>商品列表</h2>
          <div className={styles.act}>
            <Button type='primary' className={styles.btn}> <Icon type="plus" />新建</Button>
            <Col span={8}>
              <Search placeholder="搜索商品" className={styles.sear}
                onSearch={
                  value => console.log(value)
                }
                enterButton 
              />
            </Col>
          </div>
        </div>
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.list}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 7
          }}
        />
      </EditableContext.Provider>
      {/* <Modal
          title="修改地址"
          visible={isShow}
          onOk={() => this.setState({ isShow: false })}
          onCancel={() => this.setState({ isShow: false })}
        >   

       <UserForm
            setForm={form => this.form = form}
          />
       </Modal> */}
      </div>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable