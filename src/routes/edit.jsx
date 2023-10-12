import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateContact } from "../contacts";

// action is to Update, submitting this form calls UPDATE and From will post action and data auto sync
// lesson on javascript FormData() object for reqeusts
// -- React Router prevents this form data body to be sent to server and instead goes to this action function
// -- each form field has a field called "name" which is accessbile with `formData.get(name)`
//      firstname = formData.get("first"); etc
// -- here we are using Object.fromEntries(formData) to collect all {fieldName: value}
export async function action({ request, params }) {
  const formData = await request.formData(); // Map() object
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`); // returning "response" that tells the app to change location 
}

export default function EditContact() {
  // loader is contactLoader from routes/contact.jsx, passed here from index.jsx
  // but usually have their own - better practice 
  // this jsut shows it is possible to reuse loaders
  const { contact } = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}