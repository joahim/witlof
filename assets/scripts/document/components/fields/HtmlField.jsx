import React, { Component } from 'react'
import { CSRF_TOKEN } from '../../../utils'
import { id_of_path } from './utils'

export default class HtmlField extends Component {

  componentDidMount() {

    var options = this.props.field.getIn(['options', 'froala'])
      .set('imageUploadURL', '../../api/document/' + window.witlof.documentId + '/image/')
      .setIn(['imageUploadParams', 'csrfmiddlewaretoken'], CSRF_TOKEN)
      .set('fileUploadURL', '../../api/document/' + window.witlof.documentId + '/attachment/')
      .setIn(['fileUploadParams', 'csrfmiddlewaretoken'], CSRF_TOKEN)

    var froala = $('#' + id_of_path(this.props.dataPath)).froalaEditor(options.toJS())

    froala.on('froalaEditor.contentChanged', (e, editor) =>
      this.props.actions.fieldValueChange(this.props.dataPath, editor.html.get())
    )
  }

  render() {
    var { data, dataPath, field } = this.props
    var id = id_of_path(dataPath)

    return (
      <div className="field field-HtmlField">
        <label htmlFor={id}>{field.get('verbose_name')}</label>
        <textarea id={id} value={data} onChange={e => e} />
      </div>
    )
  }
}
