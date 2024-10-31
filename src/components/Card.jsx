import { HiOutlineUserCircle } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/config";
import AddAndUpdateContacts from "./AddAndUpdateContacts";
import { useState } from "react";
import { toast } from "react-toastify";
function ContactsCard({ contact }) {
  const [isOpen, setOpen] = useState(false);
  const doOpen = () => {
    setOpen(true);
  };
  const doClose = () => {
    setOpen(false);
  };
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex  bg-yellow-200 p-2  items-center justify-between rounded-lg mt-4 mytext">
        <div className="flex gap-3  items-center   ">
          <HiOutlineUserCircle className="text-4xl myclass" />
          <div className="">
            <h2 className="font-bold text-1xl">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <MdEdit
            onClick={doOpen}
            className="text-3xl  text-black cursor-pointer"
          ></MdEdit>
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-3xl text-purple-500 cursor-pointer"
          ></IoMdTrash>
        </div>
      </div>
      <AddAndUpdateContacts
        isupdate={true}
        contact={contact}
        isOpen={isOpen}
        doClose={doClose}
        id={contact.id}
      ></AddAndUpdateContacts>
    </>
  );
}
export default ContactsCard;
