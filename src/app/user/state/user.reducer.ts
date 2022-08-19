import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AppFeatures } from "../../state/app.state";
import { User } from "../user";

import * as UserActions from "../state/user.actions"

export type UserState = {
    maskUser: boolean
    currentUser: User | null
}

const initialState: UserState = {
    maskUser: false,
    currentUser: null
}

const getUserSate = createFeatureSelector<UserState>(AppFeatures.user)

export const getMaskUser = createSelector(
    getUserSate,
    state => state.maskUser
)

export const getCurrentUser= createSelector(
    getUserSate,
    state => state.currentUser
)

export const userReducer = createReducer(
    initialState,
    on(UserActions.toggleMaskUsername,
        state => ({
            ...state,
            maskUser: !state.maskUser
        }))
)
