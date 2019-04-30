import { itemReducer } from './item.reducer'
describe('Item Reducer function', () => {
    let state
    beforeEach(() => {
        state = [
            { name: 'Item A', value: 1, Qty: 3 },
            { name: 'Item B', value: 3, Qty: 5 },
            { name: 'Item C', value: 4, Qty: 3 },
            { name: 'Item A', value: 2, Qty: 2 },
            { name: 'Item D', value: 1, Qty: 3 }
        ]
    })
    describe('add and return item implementation', () => {
        it('should return add new item to the state if there is no item with the same name and value in it', () => {
            let actionType = 'Add Item'
            let newItem = { name: 'Item F', value: 1, Qty: 3 }
            let result = itemReducer(state, { type: actionType, body: newItem })
            expect(result.length).toBe(6)
        })
        it('should update  item quantity  if there is  item with the same name and value in the state', () => {
            let actionType = 'Add Item'
            let newItem = { name: 'Item D', value: 1, Qty: 3 }
            itemReducer(state, { type: actionType, body: newItem })
            let index = state.findIndex(item => (item.name == newItem.name) && (item.value == newItem.value))
            let result = state[index].Qty
            expect(result).toBe(6)
        })

    })

    describe('buy item implementation', () => {
        let actionType = 'Buy Item'
        it('should remove item from the state if there is n item with the same name and value in it and given the same quantity', () => {
            let newItem = { name: 'Item D', value: 1, Qty: 3 }
            itemReducer(state, { type: actionType, body: newItem })
            let index = state.findIndex(item => (item.name == newItem.name) && (item.value == newItem.value))
            expect(index).toBe(-1)
        })
        it('should reduce item quantity if there is n item with the same name and value in it and given the same quantity', () => {

            let newItem = { name: 'Item D', value: 1, Qty: 2 }
            itemReducer(state, { type: actionType, body: newItem })
            let index = state.findIndex(item => (item.name == newItem.name) && (item.value == newItem.value))
            let result = state[index].Qty
            expect(index).not.toBe(-1)
            expect(result).toBe(1)
        })
        it('should remove items or reduce thier quantity based on fifo implementation', () => {

            let newItem = { name: 'Item A', value: '', Qty: 4 }
            let result = itemReducer(state, { type: actionType, body: newItem })
            let items = result.filter(item => (item.name == newItem.name))
            expect(items.length).toBe(1)
            expect(items[0].Qty).toBe(1)
        })

    })
})