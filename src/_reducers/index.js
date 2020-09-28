import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { resourceRequests } from "./resource-requests.reducer";
import { releaseRequests } from "./release-requests.reducer";
import snackbarReducer from "./snackbar.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  resourceRequests,
  releaseRequests,
  snackbarReducer,
});

export default rootReducer;
