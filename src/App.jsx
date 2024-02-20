import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';


const stored_id = JSON.parse(localStorage.getItem('selected place')) || [];
const sorted_places = stored_id.map(function (id) {
  return AVAILABLE_PLACES.find(function (place) {
    return place.id === id;
  })
})

function App() {
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(sorted_places);
  const [avaliable_place, set_avaliable_place] = useState([]);
  const [isopen, setisopen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const sorted_places = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      set_avaliable_place(sorted_places);
    })
  }, [])

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setisopen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setisopen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    const stored_place = JSON.parse(localStorage.getItem('selected place')) || [];
    if (stored_place.indexOf(id) == -1) {
      localStorage.setItem('selected place', JSON.stringify([id, ...stored_place]));
    }
  }
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setisopen(false);
    const stored_place = JSON.parse(localStorage.getItem('selected place')) || [];
    localStorage.setItem('selected place', JSON.stringify(stored_place.filter((id) => id != selectedPlace.current)));
  }, [])


  return (
    <>
      <Modal open={isopen}>
        {
          isopen && <DeleteConfirmation
            onCancel={handleStopRemovePlace}
            onConfirm={handleRemovePlace}
          />
        }
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={avaliable_place}
          fallbackText="sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
