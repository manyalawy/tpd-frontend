import { ADD_SNACKBAR } from "../_constants";

const initialState = {
  snackbars: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SNACKBAR:
      return {
        ...state,
        snackbars: [action.snackbar, ...state.snackbars],
      };
    default:
      return state;
  }
}
