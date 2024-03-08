import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div>
      <p>Ouuups! page non trouvée!</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default ErrorPage
