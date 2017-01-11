import React, { Component } from 'react'
import Field from './Field'

export default class DictField extends Component {
  render() {
    var { schemaPath, dataPath, field, data, actions } = this.props

    return (
      <fieldset className="dict">
        <legend>{ field.get('verbose_name') }</legend>
        {field.get('fields').map((field, index) =>
          <Field key={field.get('name')} field={field}
            schemaPath={schemaPath.push(index)}
            dataPath={dataPath.push(field.get('name'))}
            data={data.get(field.get('name'))} actions={actions}
          />
        )}
      </fieldset>
    )
  }
}
