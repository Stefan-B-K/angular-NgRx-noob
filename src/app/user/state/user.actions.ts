import { createAction, props } from "@ngrx/store";
import { User } from "../user";

export const toggleMaskUsername = createAction('[User] Toggle Mask Username')

export const setCurrentUser = createAction(
    '[User] Set Current User',
    props<{ user: User}>
)
