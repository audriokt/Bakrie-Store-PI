import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

export const useEmployee = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error("useEmployee must be used within an EmployeeProvider");
    }
    return context;
}