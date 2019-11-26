
import styles from './prolist.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Icon, Col, } from 'antd';
import * as api from '../../utils/order';

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

  search(){
    let id = this.refs.txt.value;
    // console.log(id)
    api.getpro(
      id,
      localStorage.getItem("token")
    ).then((data)=>{
      console.log(data.data)
      var list = data.data
        for (var i = 0; i < data.data.length; i++) {
          list[i].key = i + 1
          list[i].name = data.data[i].name;
          list[i].desc = data.data[i].descriptions;
          list[i].price = data.data[i].price;
          list[i].num = data.data[i].quantity;
          list[i].id = data.data[i]._id;
        }
        console.log(list)
        // this.setState({
        //   list: list,
        // })
    })
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
        title: '商品ID',
        dataIndex: 'id',
        editable: true,
        ellipsis: true
      },
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
          <h2 className={styles.title}>订单详情</h2>
          <div className={styles.search}>
            <input type="text" placeholder="搜索商品" className={styles.sear} ref="txt"/>
            <Button type='primary' className={styles.btn1} onClick={()=>this.search()}>搜索</Button>
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
      </div>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable