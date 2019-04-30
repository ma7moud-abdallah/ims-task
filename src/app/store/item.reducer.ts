
import { ActionTypes } from './item.actions';

export const initialState = [
    { name: 'Item A', value: 1, Qty: 3 },
    { name: 'Item B', value: 3, Qty: 5 },
    { name: 'Item C', value: 4, Qty: 3 },
    { name: 'Item A', value: 2, Qty: 2 },
    { name: 'Item D', value: 1, Qty: 3 }
]

export function itemReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.Add:
            addItem(state, action.body)
            return state
        case ActionTypes.Remove:
            Remove(state, action.body)
            return state
        default:
            return state;
    }

}

const addItem = (arr, obj) => {
    let index = arr.findIndex(item => ((item.value == obj.value) && (item.name == obj.name)))
    if (index > -1) return arr[index].Qty += obj.Qty
    return arr.push(obj)
}

const Remove = (arr, obj) => {
    let qty = obj.Qty
    if (!obj.value) {
        while (qty > 0) {
            let index = arr.findIndex(item => item.name == obj.name)
            if (index == -1) return
            let tempQty = arr[index].Qty
            let isEnd = updateItems(index, qty, arr)
            qty -= tempQty
            if (!isEnd) qty = 0
        }
    }
    let index = arr.findIndex(item => ((item.value == obj.value) && (item.name == obj.name)))
    updateItems(index, qty, arr)
}

const updateItems = (index, qty, arr) => {
    if (index > -1) {
        if (qty >= arr[index].Qty) return arr.splice(index, 1)
        return arr[index].Qty -= qty

    } else { return false }
} 