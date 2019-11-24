import { Col, Input} from 'antd';
import styles from './O-details.css'
const { Search } = Input;

class App extends React.Component {
  state = {
    list:[]
  };

  render() {
    return (
      <div>
        <div className={styles.data}>
          <h2 className={styles.title}>订单详情</h2>
          <div className={styles.act}>
            <Col span={8}>
              <Search placeholder="搜索商品" className={styles.sear}
                onSearch={ value => console.log(value) } enterButton/>
            </Col>
          </div>
        </div>
      </div>
    )
  }
}
export default App;