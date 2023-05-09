export const validateAnimalInput=({name, type, examination, years})=>{
    if(name!=='' && type!=='' && examination!=='' && years!==null ){
        return true
    }
    else{
        return false
    }
}






