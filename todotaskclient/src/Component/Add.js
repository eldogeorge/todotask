import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './Add.css';
// import { Link } from 'react-router-dom';
import { registerAPI } from '../Service/allAPI';

// ATS2
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import { registerContext } from '../taskContext/ContextShare';

function Add() {

  // to get context
  const { registerData, setRegisterData } = useContext(registerContext)

  // state to hold error response
  const [errorMsg, setErrorMsg] = useState("")



  // state to hold all other input datas enter by user
  const [userData, setUserData] = useState({
    ttask: "",
    dtask: "",
    statu: ""
  })

  // create an object for usenavigate 
  const navigate = useNavigate()

  // function to update userData 
  const userDetails = (e) => {
    // let value=e.target.value
    // let name=e.target.name 
    let { value, name } = e.target

    setUserData({ ...userData, [name]: value })

  }

  console.log(userData);

  // create a function for submit button
  const handleSubmit = async (e) => {
    e.preventDefault()

    // header  - contentType:multipart/formData
    const headerConfig = {
      // "Content-Type": "multipart/form-data"
    }

    // body form data
    const data = new FormData()

    // access datas from userData
    const { ttask, dtask, statu } = userData

    if (ttask == "") {
      toast.error('Title Task required')
    }
    else if (dtask == "") {
      toast.error('Task Description required')

    }
    else if (statu == "") {
      toast.error('Task Status required')

    }

    else {
      const requestData = {
        ttask,
        dtask,
        statu
      };

      try {
        const response = await registerAPI({
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: requestData
        });

        if (response.status === 205) {
          // setRegisterData(response.data);
          // setRegisterData(response.data)
          console.log(userData);
          // setRegisterData(JSON.parse(response.config.data))
          setRegisterData(userData)


          setUserData({
            ttask: "",
            dtask: "",
            statu: ""
          });

          navigate("/");
        } else {
          setErrorMsg(response.response.data);
        }
      } catch (error) {
        console.error("Error submitting form: ", error);
      }
    }
  }


  return (
    // <div>

    //   {
    //     errorMsg ? <div class="alert alert-danger  w-50 container" role="alert"
    //       onClose={() => setErrorMsg("")} >
    //       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    //       {errorMsg}
    //     </div> : ""
    //   }


    //   <h3 style={{ color: '#2d0d80' }} className='text-center mt-3'>Create New Task</h3>

    //   <form id='d' class='container  p-5 w-75 mt-2'>

    //     <div className="row">
    //       <div className="col-6">
    //         <label for="exampleInputFname" class="form-label mt-3">Title Task</label>
    //         <input onChange={userDetails} name='ttask' required type="text" class="form-control" id="exampleInputtitletask" />
    //         <label for="exampleInputEmail" class="form-label mt-3">Description</label>
    //         <input onChange={userDetails} name='dtask' required type="text" class="form-control" id="exampleInputdesctask" />
    //       </div>
    //       <div className="col-6">
    //         {/* dropdown */}
    //         <label for="exampleI" class="form-label mt-4">Task Status</label>

    //         <select onChange={userDetails} name='statu' class="dropdown w-100 form-control" id="s1" >
    //           <option class="dropdown-item disabled" aria-disabled="true" value="">Select ...</option>

    //           <option class="dropdown-item" value={'todotask'}>To Do Task</option>
    //           <option class="dropdown-item" value={'completed'}>Completed</option>
    //         </select>   <br />
    //       </div>
    //     </div>
    //     <div className='text-center mt-5'>
    //       <button onClick={handleSubmit} style={{ backgroundColor: '#2d0d80', color: 'white' }}
    //         type="submit" class="btn btn-primary w-50">Submit</button>

    //     </div>
    //   </form>

    //   <ToastContainer position="top-center" theme="light" />
    // </div>

    <div >
      {/* ATES1 */}
      {
        //ATES4  
        errorMsg ? <Alert variant="dark" dismissible onClose={() => setErrorMsg("")}>
          <Button onClose={() => setErrorMsg("")}>Show Alert</Button>;
          {errorMsg}
        </Alert> : ""
      }
      <Container>
        <h1 className='text-center text-light'><strong>Add <span style={{ color: '#BAFF39' }}>Task Details</span></strong></h1>
        <div className='mt-5 m-5 p-5' id='box1' style={{ fontWeight: 'bold' }}>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} className='p-5'>
              {/* ACS8 to call funcation*/}
              <FloatingLabel onChange={userDetails} required
                controlId="floatingInput"
                label="Title Task"
                className="mb-5 fa w-100"
              >
                {/* ACS10 */}
                <Form.Control name="ttask" type="text" placeholder="What's the task title?" />
              </FloatingLabel>
              <FloatingLabel onChange={userDetails} required
                controlId="floatingInput"
                label="Description"
                className="mb-5 fa w-100"
              >
                {/* ACS10 */}
                <Form.Control name="dtask" type="text" placeholder="What's the task description?" />
              </FloatingLabel>
            </Col>
            
            <Col xs={12} sm={12} md={6} lg={6} xl={6} className='p-5'>
              <Form.Group required as={Col} controlId="formGridState" className='mb-5 fa w-100'>
                <Form.Label>Select Task Status</Form.Label>
                {/*ACS16 */}
                <Form.Select onChange={userDetails} name="statu" defaultValue="Choose...">
                  <option>Select...</option>
                  {/*ACS17  */}
                  <option value={'todotask'}>To Do Task</option>
                  <option value={'completed'}>Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className='text-center'>
            {/* <Link to={'/view/1'}> */}
            {/*ACS19  */}
            <Button variant="" onClick={handleSubmit} style={{ backgroundColor: '#BAFF39' }} className='ms-3 w-25' id="button-addon2">
              <i class="fa-regular fa-address-card fa-bounce me-3"></i><span className='fs-4'>Add</span>
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </Container>

      {/* ATS3 */}
      <ToastContainer position="top-center" theme="dark" autoClose={8000} />
    </div>

  )
}

export default Add                               