import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewArtist, resetArtistObj } from '../../features/artistsSlice'
import { addArtistToUser } from '../../features/sessionSlice'

function AddArtist() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialObj = {
    name: '',
    description: '',
    image: '',
    
  }
  const [formData, setFormData] = useState(initialObj)
  const artists = useSelector(state => state.artists.entities)
  const obj = useSelector(state => state.artists.artistObj)
  
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addNewArtist(formData))
  }
    
  useEffect(() => {
    if (obj) {
      dispatch(addArtistToUser(obj))
      const artistId = artists.map(artist => artist.id).length
      navigate(`/artworks/add/${artistId}`)
      dispatch(resetArtistObj())
      setFormData(initialObj)
    }
  },[obj])

  return (
    <div>
      <h1>Add a new artist</h1>
      <Form onSubmit={handleSubmit} >
        <Form.Group>
          <Form.Label>Artist's name</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Please add an artist's name..."
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Artist's description/summary</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Please add a short bio or summary..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image of the artist</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Please add an image address..."
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
        </Form.Group>
        <Button onClick={handleSubmit} >Add artist</Button>
      </Form>
    </div>
  )
}

export default AddArtist