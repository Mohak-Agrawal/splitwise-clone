export interface Friend {
  id: string;
  name: string;
}

export interface FriendState {
  friends: Friend[];
}

export enum FriendActionTypes {
  FETCH_FRIENDS_REQUEST = "FETCH_FRIENDS_REQUEST",
  FETCH_FRIENDS_SUCCESS = "FETCH_FRIENDS_SUCCESS",
  FETCH_FRIENDS_FAILURE = "FETCH_FRIENDS_FAILURE",
  ADD_FRIEND_REQUEST = "ADD_FRIEND_REQUEST",
  ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS",
  ADD_FRIEND_FAILURE = "ADD_FRIEND_FAILURE",
  REMOVE_FRIEND_REQUEST = "REMOVE_FRIEND_REQUEST",
  REMOVE_FRIEND_SUCCESS = "REMOVE_FRIEND_SUCCESS",
  REMOVE_FRIEND_FAILURE = "REMOVE_FRIEND_FAILURE",
}

interface FetchFriendsRequestAction {
  type: FriendActionTypes.FETCH_FRIENDS_REQUEST;
}

interface FetchFriendsSuccessAction {
  type: FriendActionTypes.FETCH_FRIENDS_SUCCESS;
  payload: Friend[];
}

interface FetchFriendsFailureAction {
  type: FriendActionTypes.FETCH_FRIENDS_FAILURE;
  error: string;
}

interface AddFriendRequestAction {
  type: FriendActionTypes.ADD_FRIEND_REQUEST;
}

interface AddFriendSuccessAction {
  type: FriendActionTypes.ADD_FRIEND_SUCCESS;
  payload: Friend;
}

interface AddFriendFailureAction {
  type: FriendActionTypes.ADD_FRIEND_FAILURE;
  error: string;
}

interface RemoveFriendRequestAction {
  type: FriendActionTypes.REMOVE_FRIEND_REQUEST;
}

interface RemoveFriendSuccessAction {
  type: FriendActionTypes.REMOVE_FRIEND_SUCCESS;
  payload: string; // ID of the friend to remove
}

interface RemoveFriendFailureAction {
  type: FriendActionTypes.REMOVE_FRIEND_FAILURE;
  error: string;
}

export type FriendAction =
  | FetchFriendsRequestAction
  | FetchFriendsSuccessAction
  | FetchFriendsFailureAction
  | AddFriendRequestAction
  | AddFriendSuccessAction
  | AddFriendFailureAction
  | RemoveFriendRequestAction
  | RemoveFriendSuccessAction
  | RemoveFriendFailureAction;
