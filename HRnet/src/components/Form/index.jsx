import { useForm } from 'react-hook-form'
import { departmentOptionsData } from './departmentOptionsData'
import { statesOptionsData } from './statesOptionsData'
import { DevTool } from '@hookform/devtools'
import './form.css'

const Form = () => {
  const { register, control, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    console.log('submitted', data)
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" {...register('first-name')} />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" {...register('last-name')} />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input id="date-of-birth" type="text" {...register('date-of-birth')} />

        <label htmlFor="start-date">Start Date</label>
        <input id="start-date" type="text" {...register('start-date')} />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" {...register('street')} />

          <label htmlFor="city">City</label>
          <input id="city" type="text" {...register('city')} />

          <label htmlFor="state">State</label>
          <select id="state"
          {...register('state', { required: 'Ce champ est requis.' })}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Choisissez une option
          </option>
          {statesOptionsData.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" {...register('zip-code')} />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select id='department'
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
      <DevTool control={control} />
    </>
  )
}

export default Form
