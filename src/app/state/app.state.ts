import { UserState } from "../user/state/user.reducer";

export type State = {
    user: UserState
}


export enum AppFeatures {
    products = 'products',
    user = 'user'
}
