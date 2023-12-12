import { createRoot } from 'react-dom/client'
import App from './App'

const domNode: any = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App />)
