
import { ActionTypes } from './item.actions';

export const initialState = [
    { name: 'A', value: 1, Qty: 3 },
    { name: 'B', value: 3, Qty: 5 },
    { name: 'C', value: 4, Qty: 3 },
    { name: 'A', value: 2, Qty: 2 },
    { name: 'D', value: 1, Qty: 3 }
]

export function itemReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case ActionTypes.Add:
            newState = addItem(state, action.body)
            return newState
        case ActionTypes.Remove:
            newState = Remove(state, action.body)
            return newState
        default:
            return state;
    }

}

const addItem = (arr, obj) => {
    try {
        const newArr = [...arr]
        let index = newArr.findIndex(item => ((item.value == obj.value) && (item.name == obj.name)))
        if (index > -1) {
            newArr[index].Qty += obj.Qty
            return newArr
        }
        newArr.push(obj)
        return newArr
    } catch (err) {
        console.log(err)
    }

}

const Remove = (arr, obj) => {
    try {
        let qty = obj.Qty
        if (qty <= 0) return
        const newArr = [...arr]
        if (!obj.value) {
            for (let item = 0; item < newArr.length; item++) {
                if (newArr[item].name == obj.name) {
                    if (newArr[item].Qty >= qty) {
                        newArr[item].Qty -= qty
                        if (newArr[item].Qty == 0) newArr.splice(item, 1)
                        break;
                    }
                    qty -= newArr[item].Qty
                    newArr.splice(item, 1)
                }
            }
            return newArr
        }
        let index = newArr.findIndex(item => ((item.value == obj.value) && (item.name == obj.name)))
        updateItems(index, qty, newArr)
        return newArr
    } catch (err) {
        console.log(err)
    }


}

const updateItems = (index, qty, arr) => {
    try {
        if (index > -1) {
            if (qty >= arr[index].Qty) return arr.splice(index, 1)
            return arr[index].Qty -= qty

        } else { return false }
    } catch (err) {
        console.log(err)
    }

} 