import React, { Component } from 'react'
import { id_of_path } from './utils'

export default class TextField extends Component {
  render() {
    var { data, dataPath, field, actions } = this.props
    var id = id_of_path(dataPath)

    return (
      <div className="field field-TextField">
        <label htmlFor={id}>{field.get('verbose_name')}</label>
        <textarea id={id} value={data} onChange={(e) => actions.fieldValueChange(dataPath, e.target.value)} />
      </div>
    )
  }
}
