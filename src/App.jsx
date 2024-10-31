import { AiFillPlusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import "./App.css";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { db } from "./config/config";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import ContactsCard from "./components/Card";
import AddAndUpdateContacts from "./components/AddAndUpdateContacts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoContact from "./components/NoContact";
import { IoPersonAddOutline } from "react-icons/io5";
function App() {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const doOpen = () => {
    setOpen(true);
  };
  const doClose = () => {
    setOpen(false);
  };
  const searchContact = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filterdContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filterdContacts);
      return filterdContacts;
    });
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <NavBar></NavBar>
        <div className="flex gap-2 ">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white"></FiSearch>
            <input
              placeholder=" Search contacts here..."
              onChange={searchContact}
              type="text"
              className="h-10 flex-grow rounded-md border border-white
      bg-transparent pl-9 text-white 
      "
            ></input>
            <IoPersonAddOutline
              className="cursor-pointer text-3xl  ml-3 text-white"
              onClick={doOpen}
            >
              {" "}
            </IoPersonAddOutline>
          </div>
        </div>
        <div>
          {contacts.length === 0 ? (
            <NoContact></NoContact>
          ) : (
            contacts.map((contact) => (
              <ContactsCard key={contact.id} contact={contact}></ContactsCard>
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContacts
        isOpen={isOpen}
        doClose={doClose}
      ></AddAndUpdateContacts>
      <ToastContainer
        position="bottom-center"
        type="success"
        autoClose={3000}
      ></ToastContainer>
    </>
  );
}

export default App;
