import React, { Component } from 'react'
import Field from './Field'

export default class ListField extends Component {
  render() {

    var { field } = this.props

    return (
      <fieldset className="list">
        <legend>{field.get('verbose_name')}</legend>
        {this.render_items()}
        <button className="add-item" onClick={e => this.handleAdd(e)}>
          <span className="action action-add fa fa-plus-circle"></span>
          <span className="text">Add another {field.get('verbose_name')} block</span>
        </button>
      </fieldset>
    )
  }

  render_items() {
    var { schemaPath, dataPath, field, data, actions } = this.props

    if (data == undefined) {
      return new List()
    } else {
      return data.map((dataItem, index) =>
        <ListItem key={dataItem.get('_key')} countItems={data.size} itemIndex={index}
          field={field} actions={actions} data={dataItem}
          schemaPath={schemaPath.push('fields')} dataPath={dataPath.push(index)}
        />
      )
    }
  }

  handleAdd(e) {
    e.preventDefault()
    this.props.actions.addItem(this.props.dataPath, this.props.schemaPath)
  }
}

class ListItem extends Component {
  render() {
    var { countItems, itemIndex, schemaPath, dataPath, field, data, actions } = this.props

    return (
      <fieldset className="item">
        {
          field.get('fields').map((field, fieldIndex) =>
            <Field key={field.get('name')} field={field}
              schemaPath={schemaPath.push(fieldIndex)}
              dataPath={dataPath.push(field.get('name'))}
              data={data.get(field.get('name'))} actions={actions}
            />
          )
        }
        <div className="actions">
          {itemIndex === 0 ? '' : <button title="Move up" className="action action-up fa fa-chevron-circle-up" onClick={e => this.handleMoveUp(e)}></button>}
          {itemIndex === countItems - 1 ? '' : <button title="Move down" className="action action-down fa fa-chevron-circle-down" onClick={e => this.handleMoveDown(e)}></button>}
          <button title="Remove" className="action action-remove fa fa-times-circle" onClick={e => this.handleRemove(e)}></button>
          <button title="Add another above" className="action action-add fa fa-plus-circle" onClick={e => this.handleAddAbove(e)}></button>
        </div>
      </fieldset>
    )
  }

  handleAddAbove(e) {
    e.preventDefault()
    this.props.actions.addItemAbove(this.props.dataPath, this.props.schemaPath)
  }

  handleMoveUp(e) {
    e.preventDefault()
    this.props.actions.moveItemUp(this.props.dataPath)
  }

  handleMoveDown(e) {
    e.preventDefault()
    this.props.actions.moveItemDown(this.props.dataPath)
  }

  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this element?'))
      this.props.actions.removeItem(this.props.dataPath)
  }
}
