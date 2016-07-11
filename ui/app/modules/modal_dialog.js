import React from 'react'


export default class ModalDialog extends React.Component {
  render() {
    return (
      <div className="modal fade" tabindex="-1" role="dialog" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Вакансия</h4>
            </div>
            <div className="modal-body">
              <p>{this.props.message}</p>
            </div>
            <div className="modal-footer">
              <a className="btn btn-default" href={this.props.url}>ОК</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
