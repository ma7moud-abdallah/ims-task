import { Action } from '@ngrx/store';

export enum ActionTypes {
    Add = 'Add Item',
    Remove = 'Buy Item',
}

export interface Item {
    name: string,
    value: number,
    Qty: number

}
