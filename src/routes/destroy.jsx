import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

// destroy action defined
// prevent default form behavior, emulates client side routing
// <Form action="destroy" /> matches route for "contacts/:contactId/destroy"
export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
