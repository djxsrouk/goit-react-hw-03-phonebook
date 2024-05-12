import React, { Component } from 'react';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

class ContactList extends Component{

render(){
    const {contacts, onDeleteContacts} = this.props;
    return (
        <div className={styles.contactSection}>
        <h3 className={styles.contactList}>Contact List:</h3>
        <ul className={styles.contactItem}>
          {contacts.map(contact => (
            <li key={contact.id} className={styles.contactNr}>
              {`${contact.name}: ${contact.number}`}
              <div className={styles.deleteButonsSection}>
              <button className={styles.deleteButons} onClick={() => { onDeleteContacts(contact.id)}}>Delete</button>
              </div>
              
            </li>
          ))}
        </ul>
      </div>
    )
};
}
ContactList.propTypes = {
  contacts : PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
  })
  ).isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
}
export default ContactList;