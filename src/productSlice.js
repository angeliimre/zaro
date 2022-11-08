import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const productSlice=createSlice({
    name:"product",
    initialState:{
        kivalasztott: "",
        value:[],
        status: "loading",
        szurt:[],
        show:"hidden"
    },
    extraReducers:make=>make.addCase(beolvas.pending,function(state){
        state.status="loading"
    }).addCase(beolvas.fulfilled,(state,action)=>{
        state.status="ok";
        state.value=action.payload.products
    }),
    reducers:{
        szures:(state,action)=>{
            state.szurt=[]
            state.value.forEach(function(item){
                if(item.category==action.payload){
                    state.szurt.push(item)
                    state.szurt=[...state.szurt]
                }
            })
        },
        megjelenit:(state,action)=>{
            state.show="visible";
            state.kivalasztott=action.payload
        },
        eltuntet:(state)=>{
            state.show="hidden"
        }
    }
})

const beolvas=createAsyncThunk("products/get",async()=>{
    const f=await fetch("https://kepzes.appworld.hu/api/products.php")
    return f.json()
})

export default productSlice.reducer
export {beolvas}
export const {szures,megjelenit,eltuntet}=productSlice.actions