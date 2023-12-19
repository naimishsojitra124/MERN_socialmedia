import { EditData } from "../actions/authAction";
import { PROFILE_TYPES } from "../actions/profileAction";

const initialState = {
  loading: false,
  users: [],
  result: 0,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        result: action.payload.result,
      };
    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };
    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };
    default:
      return state;
  }
};

export default profileReducer;
