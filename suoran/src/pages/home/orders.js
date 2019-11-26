import { Table, Col, Input} from 'antd';
import * as api from '../../utils/order';
import Link from 'umi/link'
import styles from './orders.css'

const { Search } = Input;
class App extends React.Component {
  state = {
    list:[]
  };

  componentDidMount(){
    api.getList(
      {per:50,page:6},
      localStorage.getItem("token"),
      )
      .then((data) => {
        // console.log(data)
        // console.log(data.data.orders)
        var list=data.data.orders
        for (var i = 0; i < data.data.orders.length; i++) {
          list[i].key = i + 1
          list[i].img = data.data.orders[i].coverImg;
          list[i].name = data.data.orders[i].name;
          list[i].desc = data.data.orders[i].descriptions;
          list[i].price = data.data.orders[i].price;
          list[i].num = data.data.orders[i].quantity;
          list[i].id = data.data.orders[i]._id;
        }
        // console.log(list)
        this.setState({
          list:list,
        })
      })
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        ellipsis: true,
        width:220,
      },
      {
        title: '用户',
        dataIndex: 'name',
        ellipsis: true,
        width:80,
      },
      {
        title: '订单号',
        dataIndex: 'orderID',
        ellipsis: true,
        width:160,
      },
      {
        title: '收货地址',
        dataIndex: 'address',
        ellipsis: true,
      },
      {
        title: '下单时间',
        dataIndex: 'start',
        ellipsis: true,
      },
      {
        title: '完成时间',
        dataIndex: 'end',
        ellipsis: true,
      },
    ];
    
    const data = [];
    for (let i = 0; i < this.state.list.length; i++) {
      data.push({
        key: i,
        id:this.state.list[i].id,
        name: this.state.list[i].receiver,
        orderID: this.state.list[i].no,
        price:this.state.list[i].price,
        address:this.state.list[i].regions + this.state.list[i].address,
        start:this.state.list[i].createdAt,
        end:this.state.list[i].updatedAt,
      });
    }
    return (
      <div>
        <div className={styles.data}>
          <h2 className={styles.title}>订单列表</h2>
          <div className={styles.act}>
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
      <Table columns={columns} dataSource={data} bordered pagination={{ pageSize: 7}} />
      </div>
    )
  }
}
export default App;