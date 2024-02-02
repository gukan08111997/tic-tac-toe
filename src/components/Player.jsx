import {useState} from "react";

export default function Player({name,symbol,isActive,onNameChange}){
  const [playerName,setPlayerName] = useState(name);
    const [isEditing,setIsEditing] = useState(false);
    function handleClick(){
      // setIsEditing(isEditing?false:true);
      // setIsEditing(!isEditing);
      setIsEditing(isEditing => !isEditing); //guaranttee the latest state
    }
    function handleChange(event){
setPlayerName(event.target.value);
if(isEditing){onNameChange(symbol,playerName);}

    }
    return(<>
    <li className={isActive?"active":null}>
        
            <span className="player">
            {isEditing?<input type="text" value={playerName} onChange={handleChange}/>:<span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span></span>
            <button onClick={handleClick}>{isEditing?"Save":"Edit"}</button>
          </li>
    </>)
}