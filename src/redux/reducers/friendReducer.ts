import {
  FriendAction,
  FriendActionTypes,
  FriendState,
} from "../types/friendTypes";

const initialState: FriendState = {
  friends: [],
};

const friendReducer = (
  state = initialState,
  action: FriendAction
): FriendState => {
  switch (action.type) {
    case FriendActionTypes.FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.payload, // Ensure action.payload exists
      };
    case FriendActionTypes.ADD_FRIEND_SUCCESS:
      return {
        ...state,
        friends: [...state.friends, action.payload], // Ensure action.payload exists
      };
    case FriendActionTypes.REMOVE_FRIEND_SUCCESS:
      return {
        ...state,
        friends: state.friends.filter((friend) => friend.id !== action.payload), // Ensure action.payload exists
      };
    default:
      return state;
  }
};

export default friendReducer;
