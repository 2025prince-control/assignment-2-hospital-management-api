import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [hospitals, setHospitals] = useState([]);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [totalBeds, setTotalBeds] = useState('');
  const [availableBeds, setAvailableBeds] = useState('');

 
  const [editingId, setEditingId] = useState(null);


 

  const getHospitals = async () => {
    try {
      const response = await fetch(
        'http://localhost:4000/hospitals'
      );

      const data = await response.json();

      setHospitals(data);

    } catch (error) {
      console.log('Error fetching hospitals:', error);
    }
  };


  
  useEffect(() => {
    getHospitals();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const url = editingId
        ? `http://localhost:4000/hospitals/${editingId}`
        : 'http://localhost:4000/hospitals';


      const method = editingId ? 'PUT' : 'POST';


      const response = await fetch(url, {
        method: method,

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name,
          city,
          totalBeds,
          availableBeds
        })
      });


      const data = await response.json();


      if (response.ok) {

        console.log(data);

       
        setName('');
        setCity('');
        setTotalBeds('');
        setAvailableBeds('');

       
        setEditingId(null);

       
        getHospitals();

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log('Error:', error);
    }
  };




  const handleEdit = (hospital) => {

   
    setName(hospital.name);
    setCity(hospital.city);
    setTotalBeds(hospital.totalBeds);
    setAvailableBeds(hospital.availableBeds);

   
    setEditingId(hospital._id);
  };




  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this hospital?'
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:4000/hospitals/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json();


      if (response.ok) {

        console.log(data);

       
        getHospitals();

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log('Error deleting hospital:', error);
    }
  };




  const handleCancelEdit = () => {

    setName('');
    setCity('');
    setTotalBeds('');
    setAvailableBeds('');

    setEditingId(null);
  };


  return (
    <div className="app">

    

      <div className="header">
        <h1>🏥 Hospital Management System</h1>
        <p>Manage hospitals easily</p>
      </div>


      <div className="container">



        <div className="form-section">

          <h2>
            {editingId ? 'Update Hospital' : 'Add Hospital'}
          </h2>


          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Hospital Name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />


            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) =>
                setCity(event.target.value)
              }
              required
            />


            <input
              type="number"
              placeholder="Total Beds"
              value={totalBeds}
              onChange={(event) =>
                setTotalBeds(event.target.value)
              }
              required
            />


            <input
              type="number"
              placeholder="Available Beds"
              value={availableBeds}
              onChange={(event) =>
                setAvailableBeds(event.target.value)
              }
              required
            />


            <button type="submit">

              {editingId
                ? 'Update Hospital'
                : 'Add Hospital'}

            </button>


            {editingId && (

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>

            )}

          </form>

        </div>


        <div className="hospital-section">

          <h2>Hospitals</h2>


          {hospitals.length === 0 ? (

            <p>No hospitals found</p>

          ) : (

            hospitals.map((hospital) => (

              <div
                className="hospital-card"
                key={hospital._id}
              >

                <h3>
                  {hospital.name}
                </h3>


                <p>
                  City: {hospital.city}
                </p>


                <p>
                  Total Beds: {hospital.totalBeds}
                </p>


                <p>
                  Available Beds: {hospital.availableBeds}
                </p>


            

                <div className="button-group">

                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEdit(hospital)
                    }
                  >
                    Edit
                  </button>


                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(hospital._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default App;