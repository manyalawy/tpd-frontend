import { resourceRequestConstants } from "../_constants";

export function resourceRequests(state = {}, action) {
  switch (action.type) {
    //GETALL
    case resourceRequestConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case resourceRequestConstants.GETALL_SUCCESS:
      return {
        items: action.resourceRequests,
      };
    case resourceRequestConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    //GETONE
    case resourceRequestConstants.GETONE_REQUEST:
      return {
        loading: true,
        reference_number: action.reference_number,
      };
    case resourceRequestConstants.GETONE_SUCCESS:
      return {
        items: action.resourceRequest,
      };
    case resourceRequestConstants.GETONE_FAILURE:
      return {
        error: action.error,
      };

    //CREATE
    case resourceRequestConstants.CREATE_REQUEST:
      return {
        creating: true,
        resourceRequest: action.resourceRequest,
      };
    case resourceRequestConstants.CREATE_SUCCESS:
      return {
        items: action.resourceRequest,
      };
    case resourceRequestConstants.CREATE_FAILURE:
      return {
        error: action.error,
      };

    //UPDATE
    case resourceRequestConstants.UPDATE_REQUEST:
      return {
        updating: true,
        resourceRequest: action.resourceRequest,
      };
    case resourceRequestConstants.UPDATE_SUCCESS:
      return {
        items: action.resourceRequest,
      };
    case resourceRequestConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };

    //DELETE
    case resourceRequestConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((resourceRequest) =>
          resourceRequest.reference_number === action.reference_number
            ? { ...resourceRequest, deleting: true }
            : resourceRequest
        ),
      };
    case resourceRequestConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(
          (resourceRequest) =>
            resourceRequest.reference_number !== action.reference_number
        ),
      };
    case resourceRequestConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((resourceRequest) => {
          if (resourceRequest.reference_number === action.reference_number) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...resourceRequestCopy } = resourceRequest;
            // return copy of user with 'deleteError:[error]' property
            return { ...resourceRequestCopy, deleteError: action.error };
          }

          return resourceRequest;
        }),
      };
    default:
      return state;
  }
}
