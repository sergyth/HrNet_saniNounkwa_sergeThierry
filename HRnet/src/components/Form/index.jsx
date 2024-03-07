import { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { departmentOptionsData } from './departmentOptionsData'
import { statesOptionsData } from './statesOptionsData'
import DatePicker from 'react-datepicker'
import { EmployeeContext } from '../../app/context'
import { Modal } from 'sergyth-modal'
import { DevTool } from '@hookform/devtools'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import './form.css'

const Form = () => {
  const { register, control, handleSubmit, reset } = useForm()
  const { addEmployee } = useContext(EmployeeContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const onSubmit = (data) => {
    console.log(data)
    const formattedData = {
      ...data,
      dateOfBirth: format(data.dateOfBirth, 'yyyy-MM-dd'),
      startDate: format(data.startDate, 'yyyy-MM-dd'),
    }

    addEmployee(formattedData)
    openModal()
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="create-employee">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          {...register('firstName', { required: 'Ce champ est requis.' })}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          {...register('lastName', { required: 'Ce champ est requis.' })}
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              placeholderText="Sélectionnez une date"
              onChange={(date) => field.onChange(date)}
              onBlur={() => {
                field.onBlur()
              }}
              selected={field.value}
            />
          )}
        />

        <label htmlFor="startDate">Start Date</label>
        <Controller
          name="startDate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              placeholderText="Sélectionnez une date"
              onChange={(date) => field.onChange(date)}
              onBlur={() => {
                field.onBlur()
              }}
              selected={field.value}
            />
          )}
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            {...register('street', { required: 'Ce champ est requis.' })}
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            {...register('city', { required: 'Ce champ est requis.' })}
          />

          <label htmlFor="state">State</label>
          <select
            id="state"
            {...register('state', { required: 'Ce champ est requis.' })}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Choisissez une option
            </option>
            {statesOptionsData.map((option) => (
              <option key={option.name} value={option.abbreviation}>
                {option.name}
              </option>
            ))}
          </select>
          <label htmlFor="zipCode">Zip Code</label>
          <input id="zipCode" type="number" {...register('zipCode')} />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          id="department"
          {...register('department', { required: 'Ce champ est requis.' })}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Choisissez une option
          </option>
          {departmentOptionsData.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" className="submit">
          Save
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>employee created</p>
      </Modal>
      <DevTool control={control} />
    </>
  )
}

export default Form
