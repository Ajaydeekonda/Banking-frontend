import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]); // Initialize state to hold users

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data); // Set the fetched users in state
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers(); // Call the fetch function
    }, []); // Empty dependency array to run only once when the component mounts

    const handleUserClick = (id) => {
        navigate(`/admin/users/${id}`); // Navigate to the user detail page
    };

    const userElements = users.map(user => {
        return (
            <div key={user.id} className="user" onClick={() => handleUserClick(user._id)}>
                {user.username}
            </div>
        );
    });

    return (
        <div className="user-details-container">
            {userElements.length > 0 ? userElements : <p>No users found.</p>}
        </div>
    );
}
