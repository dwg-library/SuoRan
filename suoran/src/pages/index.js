import styles from './index.css';
import 'antd/dist/antd.css';
import * as api from './utils/getpro';
import {connect} from 'dva'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';



class NormalLoginForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          username:values.username,
          password:values.password
      })
      
      }
    });
  };

  tap(){
    var _this=this;
    setTimeout(function(){
    api.getMan({
      userName:_this.state.username,
      password:_this.state.password
    })
    .then((data)=>{
      console.log(data.data)
      // _this.props.dispatch({
      //   type:'info/change',
      //   payload:{
      //     token:data.data.token
      //   }
      // })
      localStorage.setItem('token',data.data.token)
      if(data.data.code=='success'){
          message.success('登录成功');
         window.location.href='./home/home'     
      }else{
        message.success('用户名或密码错误' )
      }
    })
   },1000)
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className={styles.box}>
      <div className={styles.wrap}>
        <Form onSubmit={this.handleSubmit} className={styles.loginform}>
          <h1>所然后台管理系统</h1>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.4)' }} />}
                placeholder="默认用户名:admin001"
              />,
            )}
          </Form.Item>
          <Form.Item  hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder='默认密码:admin@12138' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.4)' }} />} />)}
        </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className={styles.loginformforgot} href="">
              Forgot password
          </a>
            <Button type="primary" htmlType="submit" 
            className={styles.loginformbutton}
            onClick={()=>this.tap()}
            >
              登录
          </Button>
          {/* </Link> */}
          </Form.Item>
        </Form>
      </div>
      </section>
    );
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
// export default WrappedNormalLoginForm

export default connect(state=>state.info)(WrappedNormalLoginForm)