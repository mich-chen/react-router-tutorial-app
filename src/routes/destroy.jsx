import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

// destroy action defined
// prevent default form behavior, emulates client side routing
// <Form action="destroy" /> matches route for "contacts/:contactId/destroy"
export async function action({ params }) {
  // to test the errorElement <DestroyError /> is rendered in index.jsx
  // throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}

export function DestroyError() {
  return (
    <div>Oops! There was an error trying to delete! Try Again.</div>
  )
}
