/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem('employees')
    return storedEmployees ? JSON.parse(storedEmployees) : []
  })
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees))
  }, [employees])

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
