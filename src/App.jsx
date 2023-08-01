import { useState } from "react";
import "./App.css";

function App() {
    
    const array = []
    const [add,setAdd] = useState(array)
    const [txt,setTxt] = useState('')
    const [editTxt,setEditTxt] = useState('')
    const [editId,setEditId] = useState(0)

    return (
        <div className="global">
            <div className="todo">
                <input value={txt} type="text" className="inp" onKeyDown={(e)=>{
                    if(e.key == 'Enter'){
                        if(txt.trim()){
                            setAdd([...add,{id:Math.random(),text:txt,cheked:false}])
                            setTxt('')
                        }
                    }
                }} onChange={(e)=>{
                    setTxt(e.target.value)
                   
                }} />
                <button className="bth" onClick={()=>{
                    if(txt.trim()){
                        setAdd([...add,{id:Math.random(),text:txt,cheked:false}])
                        setTxt('')
                    }
                }}>Add</button>
            </div>
            <div>
                {
                    add.map((obj)=>{
                        return(      
                            <div className="line" key={obj.id}>
                                {
                                    obj.id === editId ? (<div style={{display:'flex',justifyContent: 'space-between',width:'400px'}}>
                                    <input id={obj.id} value={editTxt} onChange={(e)=>{
                                        setEditTxt(e.target.value)
                                    }} type="text" onKeyDown={(e)=>{
                                        if (e.key == 'Enter') {
                                            setEditId(0)
                                            setAdd([...add.map(val =>{
                                                if(val.id == obj.id){
                                                    return {
                                                        ...val, text:editTxt
                                                    }
                                                }else{
                                                    setEditId(0)
                                                    return {
                                                        ...val
                                                    }
                                                }
                                            })])
                                        }
                                    }} />
                                    <h5 onClick={()=>{
                                         setAdd([...add.map(val =>{
                                            if(val.id === obj.id){
                                                return {
                                                    ...val, text:editTxt
                                                    
                                                }
                                            }else{
                                                return {
                                                    ...val
                                                }
                                            }
                                        })])
                                        setEditId(0)
                                    }}>Save</h5>
                                </div>) : (<div style={{display:'flex',justifyContent:'space-between',gap:'50px'}}> <h3 style={{textDecoration: obj.cheked ? 'line-through' : 'none',width:'300px', overflow:'auto'}} onClick={()=>{
                                        setAdd(add.map((val)=>{
                                            if(val.id == obj.id){
                                                return{
                                                    ...val,
                                                    cheked: !val.cheked
                                                }
                                            }else{
                                                return{
                                                    ...val
                                                }
                                            }
                                        }))
                                    }}>{obj.text}</h3>
                                    <h5 onClick={()=>{
                                        setEditId(obj.id)
                                        setEditTxt(obj.text)
                                    }}>EDIT</h5>
    
                                        </div>)
                                }
                                <h3 onClick={()=>{
                                    if(!obj.cheked){
                                        setAdd([...add.filter(val=>{
                                            return obj.id !==val.id
                                        })])
                                    }     
                                }} className="delete">X</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default App;



