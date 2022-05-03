import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import AddContact from './AddContact';
import ContactList from './ContactList';
import { v4 as uuid } from 'uuid';
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";


function App() {
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState([]);

    const addContactHandler = (contact) => {
        console.log(contact);
        setContacts([...contacts, {id: uuid(), ...contact}]);
    };

    const removeContactHandler = (id) => {
        const newContactList = contacts.filter((contact) => {
            return contact.id !== id;
        });

        setContacts(newContactList);
    };

    useEffect(() => {
        const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (retriveContacts) setContacts(retriveContacts);
    },[]);
    
    useEffect(() => {
        if (contacts.length>0){
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
        }
    }, [contacts]);

  return (
      <div className="ui container" >

        <Router>
          <Header />
            <Routes>
                <Route
                    path="/"

                    element={
                        <ContactList
                            contacts={contacts}
                            getContactId={removeContactHandler}
                        />
                        }
                    />
                <Route
                    path="/add"
                    element={
                    <AddContact
                        addContactHandler={addContactHandler}
                    />
                    }
            />
            </Routes>

          {/*<AddContact addContactHandler={addContactHandler} />*/}
          {/*<ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
        </Router>
      </div>
  );
}

export default App;
