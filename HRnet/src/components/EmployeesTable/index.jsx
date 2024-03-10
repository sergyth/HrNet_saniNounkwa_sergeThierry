import { useMemo, useState, useContext } from 'react'
import { EmployeeContext } from '../../app/context'
import './employeesTable.css'
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

const EmployeesTable = () => {
  const { employees } = useContext(EmployeeContext)
  const [filterInput, setFilterInput] = useState('')
  const data = useMemo(() => employees, [employees])
  const columns = useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    prepareRow,
    state: { pageIndex, pageSize },
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined
    setGlobalFilter(value)
    setFilterInput(value)
  }

  // Calcul pour l'affichage du nombre d'entrées
  const firstRowNumber = pageIndex * pageSize + 1
  const lastRowNumber = firstRowNumber + page.length - 1
  const totalRows = preGlobalFilteredRows.length

  return (
    <>
      <div className="header">
        <div className="pageSize">
          <label htmlFor="pageSize">Show</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span className="tail">Entries</span>
        </div>
        <div className="search">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder="Search..."
          />
        </div>
      </div>
      <table {...getTableProps()} className="table">
        <thead className="thead">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="tr"
              key="header"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="th"
                  key={column.id}
                >
                  {column.render('Header')}
                  <span className="sortIcon">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faSortDown} />
                      ) : (
                        <FontAwesomeIcon icon={faSortUp} />
                      )
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faSortUp}
                          style={{ visibility: 'hidden' }}
                        />
                        <FontAwesomeIcon icon={faSortDown} />
                      </>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="tbody">
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className="tr" key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="td"
                    key={cell.column.id}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Showing {firstRowNumber} to {lastRowNumber} of {totalRows} entries
        </span>
        <div className="pageIndexBox">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <div className="pageIndex">{pageIndex + 1}</div>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default EmployeesTable
