import React, { Component } from 'react'
import classnames from 'classnames'

import slugify from 'slug'

import { saveNodeMetadata } from '../actions'

const fields = ['title', 'slug', 'description', 'is_subsite', 'show_in_menu', 'menu_title']

export default class Node extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFormInFocus: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetching && !this.state.isFormInFocus) {
      for (var i = 0 ; i < fields.length ; i++) {
        const field = fields[i]
        this.setState({[field]: nextProps.node.get(field)})
      }
    }
  }

  render() {
    const isRoot = (this.props.node.get('path') === undefined) ? false : this.props.node.get('path') === ''

    return (
      <div>
        <h2>Document metadata</h2>
        <div
          onKeyDown={this.handleKeys.bind(this)}
          onFocus={() => this.setState({isFormInFocus: true})}
          className={classnames({'node-metadata': true, 'editing': this.state.isFormInFocus})}>
          <div className="form-group row">
            <label htmlFor="node-metadata-title" className="col-md-3 form-control-label">Title:</label>
            <div className="col-md-7">
              <input type="text" id="node-metadata-title" className="form-control" value={this.state.title} onChange={this.handleChangeTitle.bind(this)} />
            </div>
          </div>

          { isRoot ? '' :
            <div className="form-group row">
              <label htmlFor="node-metadata-slug" className="col-md-3 form-control-label">Name in path:</label>
              <div className="col-md-7">
                <input id="node-metadata-slug" type="text" className="form-control" value={this.state.slug} onChange={this.handleChangeSlug.bind(this)} />
              </div>
            </div>
          }

          <div className="form-group row">
            <label htmlFor="node-metadata-description" className="col-md-3 form-control-label">Description:</label>
            <div className="col-md-7">
              <input id="node-metadata-description" type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
            </div>
          </div>

          { isRoot ? '' :
            <div className="form-group row">
              <label htmlFor="node-metadata-is-subsite" className="col-md-3">Subsite:</label>
              <div className="col-md-7">
                <div className="checkbox">
                  <label><input id="node-metadata-is-subsite" type="checkbox" checked={this.state.is_subsite} onChange={(e) => this.setState({is_subsite: !this.state.is_subsite})} /> <span className="help-text">This document is the root of a new subsite</span></label>
                </div>
              </div>
            </div>
          }

          { isRoot ? '' :
            <div className="form-group row">
              <label htmlFor="node-metadata-show-in-menu" className="col-md-3">Show in menu:</label>
              <div className="col-md-7">
                <div className="checkbox">
                  <label><input id="node-metadata-show-in-menu" type="checkbox" checked={this.state.show_in_menu} onChange={this.handleChangeShowInMenu.bind(this)} /> <span className="help-text">Show this document in site navigation menu(s)</span></label>
                </div>
              </div>
            </div>
          }

          { (isRoot || !this.state.show_in_menu) ? '' :
            <div className="form-group row">
              <label htmlFor="node-metadata-description" className="col-md-3 form-control-label">Title in menu:</label>
              <div className="col-md-7">
                <input id="node-metadata-menu-title" type="text" className="form-control" value={this.state.menu_title} onChange={(e) => this.setState({menu_title: e.target.value})} />
              </div>
            </div>
          }

          { !this.state.isFormInFocus ? null :
            <div className="form-group row save-or-cancel">
              <div className="col-md-offset-3 col-sm-7">
                <button className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</button>
                <span className="or-cancel">or</span>
                <button className="btn btn-link action" onClick={this.handleCancel.bind(this)}>Cancel</button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

  handleKeys(e) {
    switch (e.which) {
      case 13:
        e.target.blur()
        this.handleSave()
      case 27:
        e.target.blur()
        this.handleCancel()
    }
  }

  handleChangeTitle(e) {
    this.setState({
      title: e.target.value,
      slug: slugify(e.target.value, {lower: true}),
    })
  }

  handleChangeSlug(e) {
    this.setState({slug: slugify(e.target.value, {lower: true})})
  }

  handleChangeShowInMenu(e) {
    this.setState({show_in_menu: !this.state.show_in_menu})
    if (!this.state.show_in_menu) {
      this.setState({menu_title: ''})
    }
  }

  handleCancel(e) {
    this.setState({isFormInFocus: false})
    this.setState(this.props.node)
  }

  handleSave(e) {
    this.setState({isFormInFocus: false})

    var payload = {}
    for (var i = 0 ; i < fields.length ; i++) {
      const field = fields[i]
      payload[field] = this.state[field]
    }

    this.props.dispatch(saveNodeMetadata(this.props.nodeId, payload))
  }
}
