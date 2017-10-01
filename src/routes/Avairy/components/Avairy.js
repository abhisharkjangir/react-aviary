import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import './aviary.scss'
let imageEditor

class Avairy extends Component {
  constructor() {
    super()
    this.state = { file: undefined, url: undefined}
  }

  componentDidMount(){
    let fake = this
    imageEditor = new Aviary.Feather({
      apiKey: '360c8cc7bc6a4a2893b1e7184033d703',
      displayImageSize: true,
      fileFormat: 'jpg',
      jpgQuality: 100,
      onSave: function(imageID, newURL) {
        imageEditor.close()
        fake.setState({file : newURL, url : newURL})
      },
      onError: function(errorObj) {
        console.log(errorObj);
      }
    })
  }

  onDrop(files) {
    let fake = this
    let reader = new FileReader();
    reader.onload = function(e) {
      fake.setState({
        file : e.target.result,
        url  :undefined
      })
    }
    reader.readAsDataURL(files[0]);
  }

  editImage(){
    imageEditor.launch({
      image : document.getElementById('imgToEdit'),
      url : this.state.file
    })
    return  false
  }

  removeImage(){
    this.setState({
      file : undefined, url : undefined
    })
  }

  render(){
    return (
      <div className='container-div'>
        <div className='aviary' >
          <h1 className='text-center'>Image editor</h1>
          <h4 className='text-center'>Crop. Effetcs. Orientaion. Stickers. Overlay. & many more</h4>
          {!this.state.file && <Dropzone className='dropzoneStyle' accept="image/png" onDrop={this.onDrop.bind(this)} multiple={false}>
            <h3>
              Drag and Drop Image here
            </h3>
            <p>or</p>
            <h4>Click Here to upload</h4>
          </Dropzone>}
          {this.state.file && <img id='imgToEdit' src={this.state.file} className="imageToEdit" />}
          <div className='action-btn'>
            <ButtonGroup>
              {this.state.file && <Button bsStyle="primary" onClick={this.editImage.bind(this)}>Edit</Button>}
              {this.state.url && <a className='btn btn-success' download="Edited-Image" href={this.state.url}>Download</a> }
              {this.state.file && <Button bsStyle="danger" onClick={this.removeImage.bind(this)}>Remove</Button> }
            </ButtonGroup>
          </div>
        </div>
        <div className="text-center text-white"><p>Credits: <br/>Adobe Creative SDK, React-Dropzone & unsplash</p></div>
      </div>
    )
  }
}


Avairy.propTypes = {

}

export default Avairy
