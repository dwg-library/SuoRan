import { Table, Button, Popconfirm, Col, Icon, Input} from 'antd';
import * as api from '../../utils/class';
import Link from 'umi/link'
import styles from './classify.css'

const { Search } = Input;
class App extends React.Component {
  state = {
    list:[]
  };

  componentDidMount(){
    api.getList(
      {per:50},
      localStorage.getItem("token"),
      )
      .then((data) => {
        // console.log(data.data.categories)
        var list=data.data.categories
        // console.log(list)
        this.setState({
          list:list,
        })
      })
  }

  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '类型图样',
        dataIndex: 'img',
        render: img => <img src={img} className={styles.img}/>,
        width: 100,
        height: 100,
      },
      {
        title: '类型描述',
        dataIndex: 'desc',
        ellipsis: true,
      },
      {
        title: '创建时间',
        dataIndex: 'create',
        ellipsis: true,
      },
      {
        title: '更新时间',
        dataIndex: 'update',
        ellipsis: true,
      },
      {
        title: '编辑',
        dataIndex: '',
        key:1,
        editable: true,
        render: () => <Button type="default" onClick={()=>this.edit()}>编辑</Button>,
      },
      {
        title: '操作',
        dataIndex: 'cz',
        editable: true,
        render: (text, record) =>
        this.state.list.length >= 1 ? (
          <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.key)}>
           <Button type="danger" onClick={()=>this.delete()}>删除</Button>
          </Popconfirm>
        ) : null,
      },
    ];
    
    const data = [];
    for (let i = 0; i < this.state.list.length; i++) {
      data.push({
        key: i,
        name: this.state.list[i].name,
        img:this.state.list[i].coverImg,
        desc:this.state.list[i].descriptions,
        create:this.state.list[i].createdAt,
        update:this.state.list[i].updatedAt,
      });
    }
    return (
      <div>
        <div className={styles.data}>
          <h2 className={styles.title}>商品分类</h2>
          <div className={styles.act}>
            <Link to='./newlist' className={styles.btn}><Button type='primary'> <Icon type="plus" />新建</Button></Link>
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
      <Table columns={columns} dataSource={data} bordered pagination={{ pageSize: 5 }} />
      </div>
    )
  }
}
export default App;