import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import ContactForm from './ContactForm'


class ContactModal extends Component {
    render() {
        let {contactData, contactErrors, handleSubmit, handleChange, show, handleClose} = this.props
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title># {contactData.contactId}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='contactFirstName'>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='First Name' 
                                name='firstName'
                                value={contactData.firstName}
                                onChange={handleChange}
                                isInvalid={!!contactErrors.firstName}/>
                                <Form.Control.Feedback type="invalid">
                                  {contactErrors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId='contactLastName'>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='Last Name' 
                                name='lastName'
                                value={contactData.lastName}
                                onChange={handleChange}
                                isInvalid={!!contactErrors.lastName}/>
                                <Form.Control.Feedback type="invalid">
                                  {contactErrors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId='contactCompany'>
                                <Form.Label>Company:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='Company' 
                                name='company'
                                value={contactData.company}
                                onChange={handleChange}
                                isInvalid={!!contactErrors.company}/>
                                <Form.Control.Feedback type="invalid">
                                  {contactErrors.company}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId='contactPhone'>
                                <Form.Label>Phone Number:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='Phone Number' 
                                name='phone'
                                value={contactData.phone}
                                onChange={handleChange}
                                pattern="[0-9]{3}-[0-9]{4}"
                                isInvalid={!!contactErrors.phone}/>
                                <Form.Control.Feedback type="invalid">
                                  {contactErrors.phone}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Format: 123-4567
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId='contactEmail'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='Email' 
                                name='email'
                                value={contactData.email}
                                onChange={handleChange}
                                isInvalid={!!contactErrors.email}/>
                                <Form.Control.Feedback type="invalid">
                                  {contactErrors.email}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Example Format: ada@lovelace.com
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                        <Button variant='primary' onClick={handleSubmit} value={contactData.contactId}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        )
    }
}
export default ContactModal