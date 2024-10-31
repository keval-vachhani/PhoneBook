import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Model from "./Model";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { db } from "../config/config";
import { toast } from "react-toastify";
import * as yup from "yup";
const AddAndUpdateContacts = ({ isOpen, doClose, isupdate, contact, id }) => {
  const validation = yup.object().shape({
    name: yup.string().required("*name is required"),
    email: yup.string().email("*invalid email").required("*email is required"),
  });
  const AddContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      doClose();
      toast.success("Contact Added successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      doClose();
      toast.success("Contact Updated successfully");
    } catch (error) {}
  };

  return (
    <div>
      <Model isOpen={isOpen} doClose={doClose}>
        <Formik
          validationSchema={validation}
          initialValues={
            isupdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(value) =>
            isupdate ? UpdateContact(value, id) : AddContact(value)
          }
        >
          <Form className=" flex flex-col gap-4 ">
            <div className="flex flex-col  gap-2">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-10"></Field>
              <div className=" text-xs text-red-500">
                <ErrorMessage name="name"></ErrorMessage>
              </div>
            </div>
            <div className="flex flex-col  gap-2">
              <label htmlFor="email">email</label>
              <Field name="email" className="border h-10"></Field>
              <div className=" text-xs text-red-500">
                <ErrorMessage name="email"></ErrorMessage>
              </div>
            </div>

            <button
              type="submit"
              className="h-10 px-3 py-1.5 border-current bg-yellow-400  self-end "
            >
              {isupdate ? "UPDATE " : "ADD "}CONTACT
            </button>
          </Form>
        </Formik>
      </Model>
    </div>
  );
};
export default AddAndUpdateContacts;
