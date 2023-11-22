import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";


const Moreoption = React.forwardRef(({ onClick }, ref) => (
    <i className="fas fa-ellipsis-v" ref={ref} onClick={
        (e) => {
            e.preventDefault();
            onClick(e);
        }}
    />    
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={Moreoption} />
            <Dropdown.Menu className="text-center" popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Item className={styles.DropdownItem} onClick={handleEdit} aria-label="Edit">
                    <i class="fas fa-edit"></i>
                </Dropdown.Item>
                <Dropdown.Item className={styles.Dropdown} onClick={handleDelete} aria-label="Delete">
                    <i className="fas fa-trash-alt" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};


export const EditProfileDropdown = ({ id }) => {
    const history = useHistory();
    return (
        <Dropdown className={`ml-auto- px-3 ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={Moreoption} />
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit`)}  aria-label="edit-profile">
                    <i className="fas fa-edit" /> Edit Profile 
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit.username`)} aria-label="edit-username">
                    <i className="fas fa-id-card" /> Change Username 
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit/password`)} aria-label="change-password" >
                    <i className="fas fa-key" /> Change Password 
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

