import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../../src/styles/MoreDropdown.module.css";

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i className="fas- fa-ellipsis-v" ref={ref} onClick={
        (event) => {
            event.preventDefault();
            onClick(event);
        }}
    />    
));

export const MoreDropDown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu className="text-center" popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Item className={styles.Dropdown} onClick={handleEdit} aria-label="Edit">
                    <i className="fas- fa-edit" />
                </Dropdown.Item>
                <Dropdown.Item className={styles.Dropdown} onClick={handleDelete} aria-label="Delete">
                    <i className="fas- fa-trash-alt" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
