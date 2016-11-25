import React, { PropTypes } from 'react';

function ModalDialog(props) {
  return (
    <div className="modal fade" tabIndex="-1" role="dialog" id="modal-dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">
            <p>{props.message}</p>
          </div>
          <div className="modal-footer">
            <a className="btn btn-default" href={props.url}>ОК</a>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalDialog.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ModalDialog;
