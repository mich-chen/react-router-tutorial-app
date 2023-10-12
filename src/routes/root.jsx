import { 
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

// use a loader function and hook it up in the Root route for loading data from APIs
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

// use action function for sending requests to client side routes
// POST for client side indicating some data change, by convention, React Router uses this as a hint to auto revalidate data on the page after action() finishes.
// triggers useLoaderData() hook to update and UI stays in sync with data automatically!
export async function action() {
  const contact = await createContact();
  // redirect creating new contact to the edit form
  return redirect(`/contacts/${contact.id}/edit`);
}

// <Outlet /> lets root route WHERE we want to render its children routes
// <Link /> lets clint side routing to update url without request docs from server
export default function Root() {
  // useLoaderData will auto update when there is change in data (change in state of data) to auto sync data
  const { contacts } = useLoaderData(); // hook the loader data

  // useNavigation to add global pending UI
  // returns current navigation state one of "idle" || "submitting" || "loading"
  // React Router behavior will re-load data for changing routes no matter if been there before (therefore not caching behavior)
  // it does avoid calling loaders for unchanging routes during navigation
  const navigation = useNavigation();


  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink 
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => 
                      isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : ""
                    }
                    >
                    {contact.first || contact.last ? (
                      <>{contact.first} {contact.last}</>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>*</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}
