import * as type from '../constants/ActionTypes'

const initialState = {
  isAuthenticated: false,
  authToken: '',
  email: '',
  emails: [],
  permissions:{},
  salesProfile: {},
  settings: {},
  specialGroups:{},
  tenantId: '',
  userId: '',
  profile: {}
};

//REDUCER
export default function authReducer(state=initialState, action){

  switch(action.type) {

    case type.IS_AUTHENTICATED: {

      return {
        ...state,
        isAuthenticated: true,
        email: action.data.data.email,
        emails: action.data.data.emails,
        permissions: action.data.data.permissions,
        salesProfile: action.data.data.salesProfile,
        settings: action.data.data.settings,
        specialGroups: action.data.data.specialGroups,
        tenantId: action.data.data.tenantId,
        userId: action.data.data.userId,
        profile: action.data.data.profile,
        authToken: action.data.data.authToken
      }
    }

    case type.IS_LOGGED_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        email: '',
        emails: '',
        permissions: '',
        salesProfile: '',
        settings: '',
        specialGroups: '',
        tenantId: '',
        userId: '',
        profile: '',
        authToken: ''
      }
    }

    default: return state
  }
}