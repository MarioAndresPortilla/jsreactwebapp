import React, { useRef, useEffect} from 'react';
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import {useContactsCrud} from "../context/ContactsCrudContext";


const ContactList = (props) => {
        const {contacts, retrieveContacts} = useContactsCrud();
        const inputEl = useRef("");


    useEffect(() => {

    },[]);

    const renderContactList = contacts.map((contact) => {
        return (
            <ContactCard
                contact={contact}
                key={contact.id}
            />
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }


    return (
        <div class="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>

            </h2>
            <div className="ui celled list">{renderContactList}</div>
        </div>
    );
};

export default ContactList;