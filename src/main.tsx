import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

document.title = "Weather Dashboard";
ReactDOM.createRoot(
  document.getElementById('root')!
).render(<App />)