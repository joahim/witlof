import React from 'react'
import SimpleField from './SimpleField'

export default class CharField extends SimpleField {
  render_input(id, data, dataPath, actions) {
    return (<input type="text" id={id}
      value={data} onChange={(e) => actions.fieldValueChange(dataPath, e.target.value)} />)
  }
}
