import styles from './new.css'
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber,Upload, Icon, message,Avatar   } from 'antd';
import {connect} from 'dva'
import ReactDOM from 'react-router-dom'

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};



class App extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

render() {
 
  
return(
  <div>
  <div className={styles.aside}>
    <h1>基本信息</h1>
  </div>
  <Form {...formItemLayout} className={styles.form}>
    <Form.Item label="姓名" validateStatus="warning">
      <Input placeholder="" id="姓名" />
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <DatePicker style={{ width: '50%' }} />
    </Form.Item>

   
    <Form.Item label="Warning" hasFeedback validateStatus="warning">
      <TimePicker style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Error" hasFeedback validateStatus="error">
      <Select defaultValue="1">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    </Form.Item>

    <Form.Item label="inline" style={{ marginBottom: 0 }}>
      <Form.Item
        validateStatus="error"
        help="Please select the correct date"
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
      >
        <DatePicker />
      </Form.Item>
      <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
      <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
        <DatePicker />
      </Form.Item>
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
  </Form>
  </div>
 
);
}
}


export default connect(state=>state.info)(App)