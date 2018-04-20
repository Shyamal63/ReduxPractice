import { Action } from 'redux';
import { Friend_List } from './model';

const INITIAL_STATE: Friend_List = {
  friends: null,
  loading: false,
  error: null,
};

type Payload=any;
type Error=any;

export interface ActionWithPayload<T,E> extends Action {
  payload?: T;
  error?:E;
} 

export function friendReducer(state: Friend_List = INITIAL_STATE, action: ActionWithPayload<Payload,Error>): Friend_List {
  console.log("Heelo");
  switch (action.type) {
    case "LOAD_FRIENDS":
      return {
        ...state,
        friends: {},
        loading: true,
        error: null,
      };
    case "LOAD_COMPLETE":
      return {
        ...state,
        friends: action.payload,
        loading: false,
        error: null,
      };
    case "LOAD_FAILED":
      return {
        ...state,
        friends:{},
        loading: false,
        error: action.error
      };
  }

  return state;
}
