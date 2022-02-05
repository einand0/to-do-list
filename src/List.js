import React from 'react';

function DoneImg(props){

    if(props.done){
        return (<img alt="done" src="./assets/done.png" id="done"></img>)
    } else{
        return (<img alt="undone" src='./assets/undone.png' id="undone"></img>)
    }
}

function List(props){

      return(
        <ul>
                {props.items.map(item => 
                    <div className="card">
                    <li className ={item.done ? "done" : ""} key={item.id}>{item.text}
                    <div>
                    <button onClick={() => {props.onDone(item)}}><DoneImg done={item.done}></DoneImg> </button>
                    <button onClick ={()=> {props.onItemDeleted(item)}}><img src='./assets/lixo.png' id="icon-lixeira" alt="lixeira-icon"></img></button>
                    </div>
                    </li>
                    </div>)}
            </ul>
    )
}

export default List;