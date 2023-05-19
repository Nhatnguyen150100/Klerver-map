import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

const MapStore = lazy(() => import('./pages/map/MapStore.jsx'))

function App() {
  return (
    <Suspense fallback={
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        <span className='loader'></span>
      </div>
    }>
      <Routes>
        <Route path='/' element={<MapStore />} />
      </Routes>
    </Suspense>
  )
}

export default App
