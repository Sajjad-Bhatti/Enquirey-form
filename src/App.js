import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Col, Container, Form, Row, Table, Toast } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  let [formData, setFormData] = useState(
    {
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: '',
    }

  )


  let [userData, setUserData] = useState([])

  let getValue = (event) => {
    let oldData = { ...formData }
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);

  }



  let handleSubmit = (event) => {
    let currentUserData = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage,
    }

    if (formData.index !== '') {
      let updatedData = [...userData];
      updatedData[formData.index] = currentUserData;
      setUserData(updatedData);
    } else {
      let oldformdata = [...userData, currentUserData];
      setUserData(oldformdata);
    }

    let checkFilter = userData.filter((v) => v.uemail == formData.uemail || v.uphone == formData.uphone)

    if (checkFilter.length == 1) {

      toast.error("Email or phone Exist!");

    }

    else {


      let olduserData = [...userData, currentUserData]
      console.log("olduserData")
      setUserData(olduserData)
      setFormData(
        {
          uname: '',
          uemail: '',
          uphone: '',
          umessage: '',
          index: '',
        }
      )
    }

    event.preventDefault();

  }


  let deleteRow = (indexNumber) => {
    let deleteData = userData.filter((v, i) => i != indexNumber)
    setUserData(deleteData);
    toast.info("Data deleted!")

  }

  let editRow = (indexNumber) => {
    let editData = userData[indexNumber];
  

    setFormData({
      uname: editData.uname,
      uemail: editData.uemail,
      uphone: editData.uphone,
      umessage: editData.umessage,
      index: indexNumber
       
    });
   
      
  }
  




  return (
    <Container fluid>
      <ToastContainer position="top-left" />
      <Container>
        <Row>
          <Col className='text-center py-5'>
            <h1>Enquire Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            {userData.length}
            <form onSubmit={handleSubmit}>
              <div className='pb-3'>
                <label className='form-lable'>UserName</label>
                <input type='text' className='form-control' name='uname'
                  value={formData.uname} onChange={getValue} />
              </div>

              <div className='pb-3'>
                <label className='form-lable'>Email</label>
                <input type='email' className='form-control' name='uemail'
                  value={formData.uemail} onChange={getValue} />
              </div>

              <div className='pb-3'>
                <label className='form-lable'>Phone</label>
                <input type='text' className='form-control' name='uphone'
                  value={formData.uphone} onChange={getValue} />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Message</label>
                <textarea className='form-control' id="" name="umessage" rows='3'
                  value={formData.umessage} onChange={getValue} />

              </div>

              <button className='btn btn-primary'>
                {formData.index !== "" ? 'Update' : 'Save'}
              </button>
            </form>
          </Col>
          <Col lg={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>userName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ?


                  userData.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{obj.uname}</td>
                        <td>{obj.uemail}</td>
                        <td>{obj.uphone}</td>
                        <td>{obj.umessage}</td>
                        <td>
                          <button onClick={() => deleteRow(i)}>Delete</button>
                          <button onClick={() => editRow(i)}>Edit</button>
                        </td>
                      </tr>
                    )
                  })


                  :
                  <tr>
                    <td colSpan={6}>no data found!</td>
                  </tr>

                }


              </tbody>
            </Table>
          </Col>

        </Row>
      </Container>

    </Container >
  );
}

export default App;
