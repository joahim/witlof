import React, { Component } from 'react'
import { id_of_path } from './utils'

export default class SimpleField extends Component {

  render_choices(id, data, dataPath, choices, actions) {
    return (
      <select id={id} value={data} onChange={(e) => actions.fieldValueChange(dataPath, e.target.value)}>
        <option value="">---- Please select ----</option>
        {choices.map(choice =>
          <option key={choice.get(0)} value={choice.get(0)}>{choice.get(1)}</option>
        )}
      </select>
    )
  }

  render() {
    var { data, dataPath, field, actions } = this.props
    var id = id_of_path(dataPath)
    var fieldType = field.get('type')

    if (field.get('choices') !== null) {
      return (
        <div className={`field field-${fieldType} field-choice`}>
          <label htmlFor={id}>{field.get('verbose_name')}</label>
          {this.render_choices(id, data, dataPath, field.get('choices'), actions)}
        </div>
      )
    } else {
      return (
        <div className={`field field-${fieldType}`}>
          <label htmlFor={id}>{field.get('verbose_name')}</label>
          {this.render_input(id, data, dataPath, actions)}
        </div>
      )
    }
  }
}
