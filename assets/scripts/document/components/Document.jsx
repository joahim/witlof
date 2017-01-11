import { Map, List } from 'immutable'

import React, { Component, PropTypes } from 'react'

import Field from './fields/Field'

export class Document extends Component {
  render() {
    var { schema, data, actions } = this.props
    var schemaPath = List.of('fields')
    var dataPath = new List()

    return (
      <fieldset className="document">
        {schema.get('fields').map((field, index) =>
          <Field key={field.get('name')} field={field}
            schemaPath={schemaPath.push(index)}
            dataPath={dataPath.push(field.get('name'))}
            data={data.get(field.get('name'))} actions={actions}
          />
        )}
        <input type="hidden" name="content" value={JSON.stringify(data.toJS())} />
      </fieldset>
    )
  }
}

Document.propTypes = {
  schema: PropTypes.instanceOf(Map).isRequired,
  data: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired
}
