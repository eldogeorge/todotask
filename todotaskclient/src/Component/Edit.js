import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './Add.css'
import { Link, useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { editTask, getSingleTask } from '../Service/allAPI';

// ATS2
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import BASE_URL from '../Service/Base_url';
import { editContext } from '../taskContext/ContextShare';

function Edit() {

  //EUES4 Copy edit from add.js

  // EEAS4 access from context share.js
  const { editData, setEditData } = useContext(editContext)

  //HEIS1 create state to hold existing image
  const [existingImg, setExistingImg] = useState("")
  // EUES6 access params
  const params = useParams().id
  // const {id}=useParams()
  console.log(params);

  // EUES7 api call & save
  const getTaskData = async () => {
    let { data } = await getSingleTask(params)
    setUserData(data)
    // setImage(data.profile)
    // HEIS2 
    setExistingImg(data.profile)



  }

  // HEIS3
  console.log(existingImg);

  // EUES5 new useEffect
  useEffect(() => {
    // EUES8 then goto HTML line 195
    getTaskData()
  }, [])

  // CS6 to get context then goto home.js 
  // const { registerData, setRegisterData } = useContext(registerContext)

  //ACS4 state to store preview image as URL
  const [preview, setPreview] = useState("")

  // ACS1 state to hold image data
  const [Image, setImage] = useState("")

  // ATS5 create navigate
  const navigate = useNavigate()

  // ATES2 state to hold error reponse
  // const [errorMsg, setErrorMsg] = useState("")


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
    setUserData({ ...userData, [name]: value })
  }
  // ACS12
  console.log(userData);

  //ACS3 create a funcation to store image
  // const setProfile = (e) => {
  //   // console.log(e.target.files[0]);
  //   setImage(e.target.files[0]);
  // }



  // ACS5 to acess when it open
  // useEffect(() => {
  //   if (Image) {

  //     // HEIS4 if user input new image is seleted then reset the existing image
  //     setExistingImg("")

  //     setPreview(URL.createObjectURL(Image))//file to URL
  //   }
  // }, [Image])

  // console.log(preview);
  //  ACS20
  // 20.1 create a funcation for submit button we need header & body
  const handleEdit = async (e) => {
    e.preventDefault()

    //20.2 header - contentType:multipart/formData
    const headerConfig = {
      "Content-Type": "multipart/form-data"
    }
    //20.3 body form data
    const data = new FormData()

    //20.4 Access datas from userData using destrut
    const { ttask, dtask, status } = userData

    // ATS4 line no. 120
    if (ttask == "") {
      toast.error('Task Title Required')
    }
    else if (dtask == "") {
      toast.error('Task Description Required')
    }
    else if (status == "") {
      toast.error('Task status Required')
    }
    else {
      // 20.5 add datas in formdata using methods
      // SD2
      // data.append('user_profile', Image||existingImg)
      // Image ? data.append('user_profile', Image) : data.append('user_profile', existingImg)
      data.append('ttask', ttask)
      data.append('dtask', dtask)
      data.append('status', status)

      // SD3 then goto all api.js
      console.log(data);

      // 20.6 api call        SD5
      const response = await editTask(params, headerConfig, data)
      console.log(response);
      if (response.status == 204) {

        // CS7 update context
        // setRegisterData(response.data)  // data means newEmployees objects in server

        // EEAS5 
        setEditData(response)

        // console.log(response.data);
        // alert("Employee Updated")

        //   // ATS7 line no 127
        //   setUserData({
        //     ...userData,
        //     fname: "",
        //     lname: "",
        //     email: "",
        //     mobile: "",
        //     gender: "",
        //     status: "",
        //     location: ""
        //   })

        //   setImage("")

        // ATS6 red
        navigate("/")

      }
      else {
        alert("Task Update failed")
        // console.log(response.response.data);
        // ATES3
        // setErrorMsg(response.response.data)
      }
    }

  }
  return (

    <div >
      <Container>
        <h1 className='text-center text-light'><strong>Edit <span style={{ color: '#BAFF39' }}>Employee Details</span></strong></h1>
        <div className='mt-5 m-5 p-5' id='box1' style={{ fontWeight: 'bold' }}>
        <Row>
            <div>
              {/* ACS6 to access the image */}
              {/* <img src={preview ? preview : "https://i.postimg.cc/Mp4NRLKm/profile.jpg"} alt="" style={{ width: '25%', marginLeft: '40%' }} /> */}
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
                  <option value={'active'}>To-Do-Task</option>
                  <option value={'inactive'}>Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className='text-center'>
            {/* <Link to={'/view/1'}> */}
            {/*ACS19  */}
            <Button variant="" onClick={handleEdit} style={{ backgroundColor: '#BAFF39' }} className='ms-3 w-25' id="button-addon2">
              <i class="fa-regular fa-address-card fa-bounce me-3"></i><span className='fs-4'>Save</span>
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

export default Edit


{/* <div className='text-center'>
<Link to={'/view/1'}>
  <Button variant="" style={{ backgroundColor: '#BAFF39' }} className='ms-3 w-25' id="button-addon2">
    <i class="fa-regular fa-floppy-disk fa-bounce me-3"></i><span className='fs-4'>Save</span>
  </Button>
</Link>
</div> */}