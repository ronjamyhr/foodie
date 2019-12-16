import React, { useState } from 'react'
import './home.scss'
import GoogleMap from './GoogleMap/GoogleMap'
import Modal from 'react-responsive-modal'
import Filter from './Filter/Filter'

const Home = () => {
  const [modalIsOpen, setOpen] = useState<boolean>(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <div className="home-container">
      <div className="filter-wrapper">
        <button className="button" onClick={() => openModal()}>
          öppna
        </button>
      </div>
      <Modal open={modalIsOpen} onClose={() => closeModal()} center>
        <Filter />
      </Modal>
      <GoogleMap />
    </div>
  )
}

export default Home
