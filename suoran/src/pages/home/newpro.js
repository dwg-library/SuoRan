import { Input, Button  } from 'antd';

import styles from './newpro.css';

const { TextArea } = Input;

const onChange = e => {
  console.log(e);
};

class NewPro extends React.Component {
  constructor(props){
    super(props)
    this.state={
      list:[]
    }
  }

  render() {

    return(
      <div className={styles.box}>
        <h2>xadad</h2>
      </div>
    )
  }
}

export default NewPro;