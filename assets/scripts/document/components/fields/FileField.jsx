import React from 'react'
import Numeral from 'numeral'
import Dropzone from 'react-dropzone'
import SimpleField from './SimpleField'

export default class FileField extends SimpleField {
  render_input(id, data, dataPath, actions) {
    return (
      <div className="dropzone-container">
        <Dropzone onDrop={this.onDrop.bind(this)} multiple={false} className="dropzone" activeClassName="dropzone dropzone-active">
          <span className="fa fa-file"></span>
        </Dropzone>
        {data ? this.render_file() : ''}
      </div>
    )
  }

  onDrop(files) {
    var { dataPath, actions } = this.props
    actions.postFile(window.witlof.documentId, dataPath, files[0])
  }

  render_file() {
    var { data } = this.props
    return (
      <div className="preview">
        <div className="data">
          <button title="Remove" className="action action-remove fa fa-times-circle" onClick={e => this.handleRemove(e)}></button>
          <div className="link"><a className="link" href={data.get('link')} target="_blank">{data.get('name')}</a></div>
          <div className="size">Size: {Numeral(data.get('size')).format('0.0 b')}</div>
          <div className="type">Type: {data.get('content_type')}</div>
        </div>
      </div>
    )
  }

  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this attachment?'))
      this.props.actions.removeItem(this.props.dataPath)
  }
}
