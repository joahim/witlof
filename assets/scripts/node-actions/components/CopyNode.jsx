import React, { Component, PropTypes } from 'react'

import { Modal, ModalTitle, ModalBody, ModalFooter } from '../../components/Modal'

export default class CopyNode extends Component {

  render() {
    return (
      <span>
        <button className="action" onClick={e => this.refs.copyModal.open()}>Copy</button>

        <Modal ref="copyModal">
          <ModalTitle>Copy document</ModalTitle>
          <ModalBody>
            <p>Please select the document where you want to copy the current document:</p>
            <div>TODO</div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={e => this.copyNode()}>Copy document</button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }

  copyNode() {
    this.refs.copyModal.close()
  }
}

CopyNode.propTypes = {
  parentNodeId: PropTypes.number.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
}
