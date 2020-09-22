import { releaseRequestConstants } from "../_constants";

export function releaseRequests(state = {}, action) {
  switch (action.type) {
    //GETALL
    case releaseRequestConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case releaseRequestConstants.GETALL_SUCCESS:
      return {
        items: action.releaseRequests,
      };
    case releaseRequestConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    //GETONE
    case releaseRequestConstants.GETONE_REQUEST:
      return {
        loading: true,
        reference_number: action.reference_number,
      };
    case releaseRequestConstants.GETONE_SUCCESS:
      return {
        items: action.releaseRequest,
      };
    case releaseRequestConstants.GETONE_FAILURE:
      return {
        error: action.error,
      };

    //CREATE
    case releaseRequestConstants.CREATE_REQUEST:
      return {
        creating: true,
        releaseRequest: action.releaseRequest,
      };
    case releaseRequestConstants.CREATE_SUCCESS:
      return {
        items: action.releaseRequest,
      };
    case releaseRequestConstants.CREATE_FAILURE:
      return {
        error: action.error,
      };

    //UPDATE
    case releaseRequestConstants.UPDATE_REQUEST:
      return {
        updating: true,
        releaseRequest: action.releaseRequest,
      };
    case releaseRequestConstants.UPDATE_SUCCESS:
      return {
        items: action.releaseRequest,
      };
    case releaseRequestConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };

    //DELETE
    case releaseRequestConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((releaseRequest) =>
          releaseRequest.reference_number === action.reference_number
            ? { ...releaseRequest, deleting: true }
            : releaseRequest
        ),
      };
    case releaseRequestConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(
          (releaseRequest) =>
            releaseRequest.reference_number !== action.reference_number
        ),
      };
    case releaseRequestConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((releaseRequest) => {
          if (releaseRequest.reference_number === action.reference_number) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...releaseRequestCopy } = releaseRequest;
            // return copy of user with 'deleteError:[error]' property
            return { ...releaseRequestCopy, deleteError: action.error };
          }

          return releaseRequest;
        }),
      };
    default:
      return state;
  }
}
