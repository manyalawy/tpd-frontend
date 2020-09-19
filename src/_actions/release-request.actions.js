import { releaseRequestConstants } from "../_constants";
import { releaseRequestService } from "../_services";

export const releaseRequestActions = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    releaseRequestService.getAll().then(
      (releaseRequests) => dispatch(success(releaseRequests)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: releaseRequestConstants.GETALL_REQUEST };
  }
  function success(releaseRequests) {
    return { type: releaseRequestConstants.GETALL_SUCCESS, releaseRequests };
  }
  function failure(error) {
    return { type: releaseRequestConstants.GETALL_FAILURE, error };
  }
}

function getById(reference_number) {
  return (dispatch) => {
    dispatch(request(reference_number));

    releaseRequestService.getById(reference_number).then(
      (releaseRequest) => dispatch(success(releaseRequest)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(reference_number) {
    return { type: releaseRequestConstants.GETALL_REQUEST, reference_number };
  }
  function success(releaseRequest) {
    return { type: releaseRequestConstants.GETALL_SUCCESS, releaseRequest };
  }
  function failure(error) {
    return { type: releaseRequestConstants.GETALL_FAILURE, error };
  }
}

function create(releaseRequest) {
  return (dispatch) => {
    dispatch(request(releaseRequest));

    releaseRequestService.create(releaseRequest).then(
      (releaseRequest) => {
        dispatch(success(releaseRequest));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(releaseRequest) {
    return { type: releaseRequestConstants.CREATE_REQUEST, releaseRequest };
  }
  function success(releaseRequest) {
    return { type: releaseRequestConstants.CREATE_SUCCESS, releaseRequest };
  }
  function failure(error) {
    return { type: releaseRequestConstants.CREATE_FAILURE, error };
  }
}

function update(releaseRequest) {
  return (dispatch) => {
    dispatch(request(releaseRequest));

    releaseRequestService.update(releaseRequest).then(
      (releaseRequest) => {
        dispatch(success(releaseRequest));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(releaseRequest) {
    return { type: releaseRequestConstants.UPDATE_REQUEST, releaseRequest };
  }
  function success(releaseRequest) {
    return { type: releaseRequestConstants.UPDATE_SUCCESS, releaseRequest };
  }
  function failure(error) {
    return { type: releaseRequestConstants.UPDATE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(reference_number) {
  return (dispatch) => {
    dispatch(request(reference_number));

    releaseRequestService.delete(reference_number).then(
      (releaseRequest) => dispatch(success(reference_number)),
      (error) => dispatch(failure(reference_number, error.toString()))
    );
  };

  function request(reference_number) {
    return { type: releaseRequestConstants.DELETE_REQUEST, reference_number };
  }
  function success(reference_number) {
    return { type: releaseRequestConstants.DELETE_SUCCESS, reference_number };
  }
  function failure(reference_number, error) {
    return {
      type: releaseRequestConstants.DELETE_FAILURE,
      reference_number,
      error,
    };
  }
}
