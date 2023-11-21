import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/MoreDropdown.module.css";


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
