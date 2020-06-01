import React from 'react'
import ImageUploader from '../components/ImageUploader'

export default class extends React.Component {

  state = {
    url: ''
  }

  render() {
    return (
      <div>
        <h1>欢迎使用电影管理系统</h1>
        <ImageUploader url={this.state.url} onUrlChange={newUrl => {
          this.setState({
            url: newUrl
          })
        }}/>
      </div>
    )
  }
}