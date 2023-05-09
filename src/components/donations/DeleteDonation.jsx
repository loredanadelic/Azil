const DeleteDonation=({handleClick, setDeleting, id})=>{
 return <>
 <p>Jeste li sigurni da želite izbrisati</p>
 <button onClick={(e)=>handleClick(e, id, "delete")}>Da</button>
 <button onClick={()=>setDeleting(false)}>Ne</button>
</>
}

export default DeleteDonation