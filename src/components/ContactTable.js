import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap'

const ContactTableHeader = () => {
    return (
        <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
            <th></th>
        </tr>
    );
}

const ContactTableRow = ({ contact, toggleEdit }) => {
    return (
        <tr>
            <td>{contact.contactId}</td>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.company}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            <td><Button onClick={toggleEdit} value={contact.contactId}>Edit</Button></td>
            <td><Button>Delete</Button></td>
        </tr>
    );
}


class ContactTable extends Component {

    static defaultProps = {
        contacts: [
            {
                "contactId": 1,
                "firstName": "Still Fake",
                "lastName": "Contact",
                "company": "Unknown Inc.",
                "phone": "000-0000",
                "email": "stillfake@unknown.io"
            },
            {
                "contactId": 2,
                "firstName": "So Mysterious",
                "lastName": "Contact",
                "company": "Unknown Inc.",
                "phone": "000-0000",
                "email": "somysterious@unknown.io"
            }
        ]
    }

    render() {
        // Here is a debug method to monitor incoming contact data
        console.log("Rendering Contact Table:")
        console.log(this.props.contacts)
        return (
            <Table striped bordered responsive>
                <thead>
                    <ContactTableHeader/>
                </thead>
                <tbody>
                {this.props.contacts.map((contact, i) => {
                    return <ContactTableRow contact={contact} key={i} toggleEdit={this.props.handleEdit}/>
                })}
                </tbody>
            </Table>
        )
    }
}
export default ContactTable