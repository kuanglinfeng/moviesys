import React from 'react'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib/form';

class MovieForm extends React.Component<any, any> {

  formRef = React.createRef<FormInstance>();


  render() {
    console.log(this.formRef.current)
    return (
      <h1>
        电影表单
      </h1>
    )
  }
}


export default MovieForm

