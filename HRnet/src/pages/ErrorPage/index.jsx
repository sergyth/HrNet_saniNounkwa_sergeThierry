import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div>
      <p>Ouuup! page non trouvée!</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default ErrorPage
