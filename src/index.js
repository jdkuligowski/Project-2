import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap styles
import './styles/main.scss' // Custom styles
import App from './App'

createRoot(document.getElementById('root')).render(<App />)
