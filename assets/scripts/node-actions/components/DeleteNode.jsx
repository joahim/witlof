import React, { Component, PropTypes } from 'react'

import { Modal, ModalTitle, ModalBody, ModalFooter } from '../../components/Modal'

export default class DeleteNode extends Component {

  render() {
    return (
      <span>
        <button className="action" onClick={e => this.refs.deleteModal.open()}>Delete</button>

        <Modal ref="deleteModal">
          <ModalTitle>Confirmation</ModalTitle>
          <ModalBody>
            <p>Are you sure you want to delete this document?</p>
            <p>Please note that all its children and their data will be removed as well.</p>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" onClick={e => this.deleteNode()}>Delete document</button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }

  deleteNode() {
    this.refs.deleteModal.close()
    this.props.actions.deleteNode(this.props.parentNodeId)
  }
}

DeleteNode.propTypes = {
  parentNodeId: PropTypes.number.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
}
