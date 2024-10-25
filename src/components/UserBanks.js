import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Make sure to import useParams

export default function UserBanks() {
    const { id } = useParams(); // Get user ID from URL parameters
    const [banks, setBanks] = useState([]); // State to store bank data

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${id}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch banks');
                }
                const data = await response.json();
                console.log(data);
                setBanks(data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching banks:", error);
            }
        };

        fetchBanks();
    }, [id]); // Dependency on 'id' to refetch when it changes

    const BankElements = banks.map((bank) => {
        return (
            <div className="bank" key={bank._id}>
                <p><strong>Name:</strong> {bank.holder}</p>
                <p><strong>Bank:</strong> {bank.bank}</p>
                <p><strong>Account No:</strong> {bank.accountno}</p>
                <p><strong>Branch Name:</strong> {bank.branch}</p>
                <p><strong>IFSC:</strong> {bank.ifsc}</p>
            </div>
        );
    });

    return (
        <div className="user-banks-container">
            {BankElements.length > 0 ? BankElements : <p>No Banks found.</p>}
        </div>
    );
}
