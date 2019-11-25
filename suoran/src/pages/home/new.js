
import ReactDOM from 'react-router-dom'
import styles from './new.css'
import {
  Form,
  Select,
  InputNumber,
  Input,
  Button,
  Upload,
  Icon,
  message
} from 'antd';
import { Component } from 'react';

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
class UserForm extends Component {
  state = {
    loading: false,
    isShow: false,
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  static propTypes = {
    // setForm: this.propTypes.func.isRequired,
  }
  componentWillMount(){
    this.props.setForm(this.props.form)
  }


  add(){


    this.setState({ isShow: false })

  }


  render(){
    const{getFieldDecorator} = this.props.form
    const { users, isShow } = this.state
    const formItemLayout={
      labelCol:{span:4},
      wrapperCol:{span:15},
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { imageUrl } = this.state;
    return(
      <Form {...formItemLayout}  onSubmit={this.handleSubmit}>
         <Item label='名称' >
           {
            getFieldDecorator('name',{
              initialValue:'',
              rules:[
                {required:true,message:'用户名为必填'}
              ]
            })(<Input placeholder='请输入用户名' ref={input => this.input = input}/>)
          }
        </Item>
        <Item label='价格' >
           {
            getFieldDecorator('pwd',{
              initialValue:'',
              rules:[
                {required:true,message:'密码为必填'}
              ]
            })(<Input.Password placeholder="请输入密码" ref={pwd => this.input = pwd}/>)
          }
        </Item>
        <Item label='描述' >
           {
            getFieldDecorator('nick',{
              initialValue:'',
              rules:[
                {required:true,message:'昵称为必填'}
              ]
            })(<Input placeholder='请输入昵称' ref={nick => this.input = nick}/>)
          }
        </Item>
        
        <Item label="上传图片" extra="">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload ref={tou => this.input = tou}
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
        <Button  htmlType="submit" onClick={() => this.add()}  >确定</Button>       
      </Form>
    )
   }
}

export default Form.create()(UserForm)


