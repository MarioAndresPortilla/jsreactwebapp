import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import api from "../api/contacts";
import AddContact from './AddContact';
import ContactList from './ContactList';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import {ContactsCrudContextProvider} from "../context/ContactsCrudContext";

function App() {
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);




    const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`)
        const { id, name, email } = response.data;
        setContacts(
            contacts.map((contact) => {
            return contact.id === id ? { ...response.data } : contact
            })
        );
    };




    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newContactList = contacts.filter((contact) => {
                return Object.values(contact)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            setSearchResults(newContactList);
        }   else {
            setSearchResults(contacts);
        }
    };


    
    useEffect(() => {
        //if (contacts.length>0){
        //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));

    }, [contacts]);

  return (
      <div className="ui container" >
        <Router>
          <Header />
            <ContactsCrudContextProvider>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={<ContactList />}
                />

                <Route
                    path="/add"
                    element={<AddContact />}
                />

                <Route
                    path="/edit"
                    element={<EditContact />}
                />


                <Route path="/contact/:id"
                       element={<ContactDetail />} />
            </Routes>
            </ContactsCrudContextProvider>
        </Router>
      </div>
  );
}

export default App;
