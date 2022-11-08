import logo from './logo.svg';
import './App.css';
import {beolvas,szures,megjelenit,eltuntet} from './productSlice';
import productSlice from './productSlice';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {useState} from 'react'

function DetailBox(){
  const dispatch=useDispatch()
  const detail=useSelector(state=>state.product)
  return(<div onClick={function(){dispatch(eltuntet())}} style={{position:"fixed",left:"0px",top:"0px",backgroundColor:"rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%",visibility:detail.show}}>
    <div style={{width:"30%",backgroundColor:"white",padding:"15px",borderRadius:"15px"}} onClick={function(e){e.stopPropagation()}}>
      <b>{detail.kivalasztott.title}</b>
      <p>{detail.kivalasztott.description}</p>
      <img src={detail.kivalasztott==""?"":detail.kivalasztott.images[1]} style={{maxWidth:"100%"}}/>
    </div>
  </div>)
}

function Kategoria(){
  const detail=useSelector(state=>state.product)
  const dispatch=useDispatch()

  const arr=[]

  return<div style={{marginLeft:"20px"}}>
    {detail.status=="loading"?"betoltes":detail.value.map(function(element){
      if(arr.indexOf(element.category)==-1)
        arr.push(element.category)
      
    })}
    {
      arr.map(function(elem){
        return <button onClick={function(){
          dispatch(szures(elem))
        }}>{elem}</button>
      })
    }
  </div>
}
function Termekek(){
  const detail=useSelector(state=>state.product)
  const dispatch=useDispatch()

  return(detail.szurt.length>0?<div style={detail.szurt[0].category=="smartphones"||detail.szurt[0].category=="laptops"?{display:'flex',flexWrap:'wrap',justifyContent:'space-between',width:'90%', marginLeft: 'auto',marginRight:'auto', border:'2px solid black'}:{display:'flex',flexWrap:'wrap',flexDirection:'column',justifyContent:'space-between',width:'30%', marginLeft: 'auto',marginRight:'auto', border:'2px solid black'}}>
        {
          detail.szurt.map(function(element){
            return <div style={{flexBasis:'30%',marginBottom: "20px",border:'1px solid black',textAlign:'center'}}>
              <img src={element.images[0]} style={{height: "200px",maxWidth:"100%"}}/>
              <h2 style={{width:'100%',textAlign:'left'}}>
                {element.title+"   $"+element.price}
              </h2>
              <button style={{background:"blue",margin:"20px",padding:"10px",fontSize: "20px",border:"none", borderRadius:"5px",color:"white"}} onClick={()=>{dispatch(megjelenit(element))}}>Részletek</button>
            </div>
          })
        }
      </div>:"")
}

function App() {
  const detail=useSelector(state=>state.product)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(beolvas())
  },[])

  return (
    <>
        {detail.status=="loading"?"betoltes":<>
        
          <Kategoria></Kategoria>
          <Termekek></Termekek>
          <DetailBox></DetailBox>
        </>}
      
    </>
  );
}

export default App;
