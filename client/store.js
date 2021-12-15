import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

//ACTION TYPES
const FETCH_PETS_FROM_SERVER = "FETCH_PETS_FROM_SERVER";
const SELECT_PET = "SELECT_PET";
const CLEAR_SELECTED_PET = "CLEAR_SELECTED_PET";

//ACTION CREATORS
const fetchedPets = (pets) => ({
  type: FETCH_PETS_FROM_SERVER,
  pets,
});

export const selectPet = (pet) => ({
  type: SELECT_PET,
  pet,
});

export const clearSelectedPet = () => ({
  type: CLEAR_SELECTED_PET,
});

//THUNK ACTION CREATORS
export const fetchPets = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/pets");
    dispatch(fetchedPets(data));
  };
};

export const deletePet = (pet) => {
  return async (dispatch) => {
    await axios.delete(`/api/pets/${pet.id}`);
    dispatch(fetchPets());
  };
};

//INITIAL STATE
const initialState = {
  pets: [],
  selectedPet: {},
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PETS_FROM_SERVER:
      return { ...state, pets: action.pets };
    case SELECT_PET:
      return { ...state, selectedPet: action.pet };
    case CLEAR_SELECTED_PET:
      return { ...state, selectedPet: {} };
    default:
      return state;
  }
};

//STORE
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(loggerMiddleware, thunk))
);

export default store;
