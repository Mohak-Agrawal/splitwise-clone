// src/redux/reducers/friendReducer.ts
import {
  FriendActionTypes,
  FriendState,
  FriendAction,
} from "../types/friendTypes";

const initialState: FriendState = {
  friends: [],
};

const friendReducer = (
  state = initialState,
  action: FriendAction
): FriendState => {
  switch (action.type) {
    case FriendActionTypes.ADD_FRIEND:
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
    case FriendActionTypes.REMOVE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter((friend) => friend.id !== action.payload),
      };
    default:
      return state;
  }
};

export default friendReducer;
