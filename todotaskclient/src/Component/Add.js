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

  // CS6 to get context then goto home.js 
  const {registerData,setRegisterData}=useContext(registerContext)



  // ATS5 create navigate
  const navigate = useNavigate()

  // ATES2 state to hold error reponse
  const [errorMsg, setErrorMsg] = useState("")


  // ACS7 state to hold all other input datas enter by user
  const [userData, setUserData] = useState({
    ttask: "",
    dtask: "",
    status: ""
  })

  // ACS9 funcation to updata userData
  const userDetails = (e) => {
    // ACS11
    // console.log(e.target.value);
    // let value=e.target.value
    // let name=e.target.name
    // after destrut
    let { value, name } = e.target
    // sepated operation
    setUserData({...userData, [name]: value })
  }
  // ACS12
  console.log(userData);

  //  ACS20
  // 20.1 create a funcation for submit button we need header & body
  const handleSubmit = async (e) => {
    e.preventDefault()

    //20.2 header - contentType:multipart/formData
    const headerConfig = {
      "Content-Type": "multipart/form-data"
    }
    //20.3 body form data
    const data = new FormData()

    //20.4 Access datas from userData using destrut
    const { ttask, dtask, status} = userData

    // ATS4 line no. 120
    if (ttask == "") {
      toast.error('Task Title Required')
    }
    else if (dtask == "") {
      toast.error('Task Description Required')
    }
    else if (status == "") {
      toast.error('Task Status Required')
    }
    else {
      // 20.5 add datas in formdata using methods
      data.append('ttask', ttask)
      data.append('dtask', dtask)
      data.append('status', status)


      //20.6 api call
      const response = await registerAPI(headerConfig, data)
      console.log(response);
      if (response.status == 200) {

        // CS7 update context
        setRegisterData(response.data)  // data means newEmployees objects in server

        // alert("Task Added")
        // ATS7 line no 127
        setUserData({
          ttask: "",
          dtask: "",
          status: ""
        })

        // setImage("")

        // ATS6 red
        navigate("/")



      }
      else {
        // alert("Task Already ")
        // console.log(response.response.data);
        // ATES3
        setErrorMsg(response.response.data)
      }
    }

  }
  return (
    <div >
      {/* ATES1 */}
      {
       //ATES4  
      errorMsg ? <Alert variant="dark" dismissible onClose={() => setErrorMsg("")}>
        {/* <Button onClose={() => setErrorMsg("")}>Show Alert</Button>; */}
        {errorMsg}
      </Alert> : ""
      }
      <Container>
        <h1 className='text-center text-light'><strong> New Task To-Do <span style={{ color: '#BAFF39' }}>Task Details</span></strong></h1>
        <div className='mt-5 m-5 p-5' id='box1' style={{ fontWeight: 'bold' }}>
          <Row>
            <div>
            </div>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} className='p-5'>
              {/* ACS8 to call funcation*/}
              {/* Title */}
              <FloatingLabel onChange={userDetails} required
                controlId="floatingInput"
                label="Task Title"
                className="mb-5 fa w-100"
              >
                {/* ACS10 */}
                <Form.Control name="ttask" type="text" placeholder="What's the task title?" />
              </FloatingLabel>

              {/* description */}
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
                <Form.Select onChange={userDetails} name="status" defaultValue="Choose...">
                  <option>Select...</option>
                  {/*ACS17  */}
                  <option value={'todotask'}>To-Do-Task</option>
                  <option value={'completed '}>Completed</option>
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
      <ToastContainer position="top-center" theme="dark" />
    </div>
  )
}

export default Add