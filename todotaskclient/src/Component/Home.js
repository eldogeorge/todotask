import React, { useContext, useEffect, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import SpinnerC from './SpinnerC';
import './Add.css'
import { ToastContainer, toast } from 'react-toastify';
import { getAllTasks, toremoveTask } from '../Service/allAPI';
import TableT from './TableT';
import { deleteContext, editContext, registerContext } from '../taskContext/ContextShare';
function Home() {

  // SSDS1 state to store search data then goto line 80
  const [search, setSearch] = useState("")
  // GES 5 create state to store all employees usestate []bcz res will be array of object
  const [allTasks, setAllTasks] = useState([])


  // EEAS4 access from context share.js
  const { editData, setEditData } = useContext(editContext)

  // CS8 to get context & import registerContext also
  const { registerData, setRegisterData } = useContext(registerContext)

  // REAS4 to access context
  const { deleteData, setdeleteData } = useContext(deleteContext)

  // loadingStep2
  // state to handle the spain 
  const [showSpain, setSpain] = useState(false)

  // timeout 
  const [showAlertAdd, setShowAlertAdd] = useState(true);
  const [showAlertEdit, setShowAlertEdit] = useState(true);
  const [showAlertDelete, setShowAlertDelete] = useState(true);


  // useEffect(() => {
  //   if (editData) {
  //     setShowAlertEdit(true);  // Show alert when editData is available
  //     const timer = setTimeout(() => {
  //       setShowAlertEdit(false)
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [editData]);

  // useEffect(() => {
  //   if (deleteData) {
  //     setShowAlertDelete(true);  // Show alert when deleteData is available
  //     const timer = setTimeout(() => {
  //       setShowAlertDelete(false)
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [deleteData]);

  // useEffect(() => {
  //   if (registerData) {
  //     setShowAlertAdd(true);  // Show alert when registerData is available
  //     const timer = setTimeout(() =>{ 
  //       setShowAlertAdd(false)
  //     }, 3000);
  //     return () => clearTimeout(timer);// Cleanup the timer on component unmount
  //   }
  // }, [registerData]);
  // Effect for handling alert timeouts
  useEffect(() => {
    let timer;

    if (editData) {
      timer = setTimeout(() => setShowAlertEdit(false), 2000); // Edit alert timeout
    }
    if (deleteData) {
      timer = setTimeout(() => setShowAlertDelete(false), 2000); // Delete alert timeout
    }
    if (registerData) {
      timer = setTimeout(() => setShowAlertAdd(false), 2000); // Add alert timeout
    }

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [editData, deleteData, registerData]);

  // GES6.1 create funcation to api call to get all employees
  const getTasks = async () => {
    // SSDS4 then goto allapi.js
    const response = await getAllTasks(search)
    // GES6.2 goto useEffect to access at loading time
    // console.log(response.data);
    setAllTasks(response.data)
  }
  // GES8 
  console.log(allTasks);


  // console.log(data);

  // SSDS3 then goto line 33
  console.log(search);

  //RES5 funcation to delete task then goto down
  const deleteTask = async (id) => {
    const { data } = await toremoveTask(id)
    // REAS5 then goto line 68
    setdeleteData(data)
    // refresh the table content
    getTasks()
  }


  // loadingStep1
  useEffect(() => {
    // GES7 call the funcation
    getTasks()
    // loadingStep3
    setTimeout(() => {
      setSpain(true)
    }, 2000);
    // SSDS7 then goto server part file logic.js
  }, [search])

  // useEffect(() => {
  //   if (deleteData) {
  //     setShowAlertDelete(true);  // Show alert when deleteData is available
  //     const timer = setTimeout(() => {
  //       setShowAlertDelete(false)
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [deleteData]);
  // loadingStep4
  // console.log(showSpain);
  return (
    <div >
      {/* CS9 then goto index.js */}
      {
        registerData && showAlertAdd && (<Alert variant="success" dismissible className='w-25 container'>
          {registerData.ttask} Added Successfully....
        </Alert> || []
        )
      }

      {/* REAS6 over*/}
      {
        editData && showAlertEdit && (<Alert variant="info" dismissible className='w-25 container'>
          {editData.ttask} Edit Successfully....
        </Alert> || []
        )
      }
      {/* REAS6 over*/}
      {
        deleteData && showAlertDelete && (<Alert variant="danger" dismissible className='w-25 container'>
          {deleteData.ttask} Delete Successfully....
        </Alert> || []
        )
      }
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3} xl={6} className='mt-5'>
            <FloatingLabel
              // SSDS2  then goto line 42
              onChange={e => setSearch(e.target.value)}
              controlId="floatingInput"
              label="Search Task Title Here"
              className="mb-4  d-inline-flex" style={{ width: '55%' }}
            >
              <Form.Control type="type" placeholder="Task Title" />

            </FloatingLabel>
            <Button variant="" style={{ backgroundColor: '#BAFF39' }} className='ms-3 w-25 ' id="button-addon2 btn">
              <i class="fa-solid fa-magnifying-glass fa-fade me-3"></i><span className='fs-4'>Search</span>
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={6} className='mt-5' style={{ textAlign: 'end' }} >
            <Link to={'/add'}>
              <Button variant="" style={{ backgroundColor: '#BAFF39' }} id="button-addon2">
                <i class="fa-solid fa-user-plus fa-shake"></i> Add
              </Button>
            </Link>
          </Col>
        </Row>
        {/* loadingStep5 true:false*/}
        {
          // GES9 then goto tableE.js  RES6 then goto tableE.js
          showSpain ? <TableT tasksToDisplay={allTasks} removerTak={deleteTask}>  </TableT> : <SpinnerC></SpinnerC>

        }
      </Container>
    </div>
  )
}

export default Home