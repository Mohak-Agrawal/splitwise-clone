import { Dispatch } from "redux";
import { FriendActionTypes, Friend } from "../types/friendTypes"; // Ensure Friend and FriendActionTypes are imported

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export const fetchFriends = () => async (dispatch: Dispatch) => {
  try {
    const friendsData = localStorage.getItem("friends");
    if (!friendsData) {
      throw new Error("No friends data found in local storage");
    }
    const friends = JSON.parse(friendsData) as Friend[];
    dispatch({
      type: FriendActionTypes.FETCH_FRIENDS_SUCCESS,
      payload: friends,
    });
  } catch (error) {
    dispatch({
      type: FriendActionTypes.FETCH_FRIENDS_FAILURE,
      // error: error.message,
    });
  }
};

export const addFriend = (name: string) => async (dispatch: Dispatch) => {
  try {
    const friend: Friend = { id: generateId(), name };

    const friendsData = localStorage.getItem("friends");
    let friends: Friend[] = [];
    if (friendsData) {
      friends = JSON.parse(friendsData) as Friend[];
    }
    friends.push(friend);
    localStorage.setItem("friends", JSON.stringify(friends));

    dispatch({ type: FriendActionTypes.ADD_FRIEND_REQUEST, payload: friend });
  } catch (error) {
    dispatch({
      type: FriendActionTypes.ADD_FRIEND_FAILURE,
      // error: error?.message,
    });
  }
};
