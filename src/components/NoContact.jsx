import { LuContact } from "react-icons/lu";

const NoContact=()=>{
  return  <div className=" flex mt-10 gap-4">
    
    <LuContact className=" text-4xl  text-blue-600"></LuContact>
    <h3 className=" text-white text-2xl">Contact not found</h3>
  </div>
}
export default NoContact;