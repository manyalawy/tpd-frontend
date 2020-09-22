import { resourceRequestConstants } from "../_constants";
import { resourceRequestService } from "../_services";

export const resourceRequestActions = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    resourceRequestService.getAll().then(
      (resourceRequests) => dispatch(success(resourceRequests)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: resourceRequestConstants.GETALL_REQUEST };
  }
  function success(resourceRequests) {
    return { type: resourceRequestConstants.GETALL_SUCCESS, resourceRequests };
  }
  function failure(error) {
    return { type: resourceRequestConstants.GETALL_FAILURE, error };
  }
}

function getById(reference_number) {
  return (dispatch) => {
    dispatch(request(reference_number));

    resourceRequestService.getById(reference_number).then(
      (resourceRequest) => dispatch(success(resourceRequest)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(reference_number) {
    return { type: resourceRequestConstants.GETALL_REQUEST, reference_number };
  }
  function success(resourceRequest) {
    return { type: resourceRequestConstants.GETALL_SUCCESS, resourceRequest };
  }
  function failure(error) {
    return { type: resourceRequestConstants.GETALL_FAILURE, error };
  }
}

function create(resourceRequest) {
  return (dispatch) => {
    dispatch(request(resourceRequest));

    resourceRequestService.create(resourceRequest).then(
      (resourceRequest) => {
        dispatch(success(resourceRequest));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(resourceRequest) {
    return { type: resourceRequestConstants.CREATE_REQUEST, resourceRequest };
  }
  function success(resourceRequest) {
    return { type: resourceRequestConstants.CREATE_SUCCESS, resourceRequest };
  }
  function failure(error) {
    return { type: resourceRequestConstants.CREATE_FAILURE, error };
  }
}

function update(resourceRequest) {
  return (dispatch) => {
    dispatch(request(resourceRequest));

    resourceRequestService.update(resourceRequest).then(
      (resourceRequest) => {
        dispatch(success(resourceRequest));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(resourceRequest) {
    return { type: resourceRequestConstants.UPDATE_REQUEST, resourceRequest };
  }
  function success(resourceRequest) {
    return { type: resourceRequestConstants.UPDATE_SUCCESS, resourceRequest };
  }
  function failure(error) {
    return { type: resourceRequestConstants.UPDATE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(reference_number) {
  return (dispatch) => {
    dispatch(request(reference_number));

    resourceRequestService.delete(reference_number).then(
      (resourceRequest) => dispatch(success(reference_number)),
      (error) => dispatch(failure(reference_number, error.toString()))
    );
  };

  function request(reference_number) {
    return { type: resourceRequestConstants.DELETE_REQUEST, reference_number };
  }
  function success(reference_number) {
    return { type: resourceRequestConstants.DELETE_SUCCESS, reference_number };
  }
  function failure(reference_number, error) {
    return {
      type: resourceRequestConstants.DELETE_FAILURE,
      reference_number,
      error,
    };
  }
}
