import { Map, List } from 'immutable'
import React, { Component, PropTypes } from 'react'

import DictField from './DictField'
import ListField from './ListField'

import CharField from './CharField'
import TextField from './TextField'
import HtmlField from './HtmlField'

import ImageField from './ImageField'
import FileField from './FileField'
import DocumentLinkField from './DocumentLinkField'

export default class Field extends Component {
  render() {
    switch (this.props.field.get('type')) {
      case 'DictField':
        return <DictField {...this.props} />
      case 'ListField':
        return <ListField {...this.props} />
      case 'CharField':
        return <CharField {...this.props} />
      case 'TextField':
        return <TextField {...this.props} />
      case 'HtmlField':
        return <HtmlField {...this.props} />
      case 'ImageField':
        return <ImageField {...this.props} />
      case 'FileField':
        return <FileField {...this.props} />
      case 'DocumentLinkField':
        return <DocumentLinkField {...this.props} />
      default:
        return <div className="error">Unknown document field type: <code>{this.props.field.get('type')}</code></div>
    }
    return res
  }
}

Field.propTypes = {
  schemaPath: PropTypes.instanceOf(List).isRequired,
  dataPath: PropTypes.instanceOf(List).isRequired,
  field: PropTypes.instanceOf(Map).isRequired,
  data: PropTypes.any,
  actions: PropTypes.object.isRequired
}
