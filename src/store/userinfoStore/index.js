import {createSlice} from '@reduxjs/toolkit';
 
const counterSlice = createSlice({
  name: 'useUserStore',
  initialState:{
    userInfo:1
  },
  reducers: {
    incremented(state,{value}){
        state.userInfo = value;
    },
    increment(state,val) {
      state.value++
    },
    decrement(state,val) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})
 
export const { increment, decrement, incrementByAmount,incremented } = counterSlice.actions
console.log(counterSlice.actions,'counterSlice.actions');

export default counterSlice.reducer;