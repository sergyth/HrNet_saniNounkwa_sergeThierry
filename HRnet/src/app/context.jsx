/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee])
  }
  const value = {
    employees,
    addEmployee,
  }
  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  )
}
