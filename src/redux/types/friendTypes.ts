// src/redux/types/friendTypes.ts
export interface Friend {
  id: string;
  name: string;
}

export interface FriendState {
  friends: Friend[];
}

export enum FriendActionTypes {
  ADD_FRIEND = "ADD_FRIEND",
  REMOVE_FRIEND = "REMOVE_FRIEND",
}

interface AddFriendAction {
  type: typeof FriendActionTypes.ADD_FRIEND;
  payload: Friend;
}

interface RemoveFriendAction {
  type: typeof FriendActionTypes.REMOVE_FRIEND;
  payload: string; // Friend ID
}

export type FriendAction = AddFriendAction | RemoveFriendAction;
