import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import SpinnerC from './SpinnerC';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import { getAllTasks, toremoveTask } from '../Service/allAPI';
import TableT from './TableT';
import { deleteContext, editContext, registerContext } from '../taskContext/ContextShare';
// here Home means: homeTask, ttask means: titleTask,dtask means:descriptionTask, statu:taskStatus
function Home() {
  // useState
  const [search, setSearch] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [showSpain, setSpain] = useState(false);
  const [filterTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  // usecontext
  const { editData, setEditData } = useContext(editContext);
  const { registerData, setRegisterData } = useContext(registerContext);
  const { deleteData, setdeleteData } = useContext(deleteContext);
 
  // to search
  const getTasks = async () => {
    // api call from getAllTask
    const response = await getAllTasks(search);
    setAllTasks(response.data);
  };

  // to delete id params
  const deleteTask = async (id) => {

    const { data } = await toremoveTask(id);
    setdeleteData(data);
    getTasks();
  };


  // Filter tasks based on status
  const filterTasksByStatus = () => {
    if (filterStatus === 'all') {
      setFilteredTasks(allTasks);
    } 
    else {
      const filtered = allTasks.filter(task => task.statu === filterStatus);
      setFilteredTasks(filtered);
      console.log(allTasks);
    }
  };

  // Trigger toast notifications for edit, delete, and add actions
  useEffect(() => {
    if (editData) {
      toast.info(`${editData.ttask} Edited Successfully`, { autoClose: 3000 });
      const timer = setTimeout(() => {
        setEditData(null); // Reset editData after showing the alert
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [editData, setEditData]);

  useEffect(() => {
    if (deleteData) {
      toast.error(`${deleteData.ttask} Deleted Successfully`, { autoClose: 3000 });
      const timer = setTimeout(() => {
        setdeleteData(null); // Reset deleteData after showing the alert
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [deleteData, setdeleteData]);

  useEffect(() => {
    if (registerData) {
      toast.success(`${registerData.ttask} Added Successfully`, { autoClose: 3000 });
      const timer = setTimeout(() => {
        setRegisterData(null); // Reset registerData after showing the alert
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [registerData, setRegisterData]);

  useEffect(() => {
    // api component
    getTasks();
    setTimeout(() => {
      setSpain(true);
    }, 2000);
  }, [search]);

  useEffect(() => {
    filterTasksByStatus(); // Re-apply filter whenever tasks or status changes
  }, [allTasks, filterStatus]);
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />

      <Container>
        <Row>
          {/* Search input */}
          <Col xs={12} sm={6} md={4} lg={3} xl={6} className="mt-5">
            <FloatingLabel
              onChange={(e) => setSearch(e.target.value)}
              controlId="floatingInput"
              label="Search Task Title Here"
              className="mb-4 d-inline-flex"
              style={{ width: '55%' }}
            >
              <Form.Control type="type" placeholder="Task Title" />
            </FloatingLabel>
            <Button
              variant=""
              style={{ backgroundColor: '#BAFF39' }}
              className="ms-3 w-25"
              id="button-addon2 btn"
              onClick={getTasks}
            >
              <i className="fa-solid fa-magnifying-glass fa-fade me-3"></i>
              <span className="fs-4">Search</span>
            </Button>
          </Col>

          {/* Add task button */}
          <Col xs={12} sm={6} md={4} lg={3} xl={6} className="mt-5" style={{ textAlign: 'end' }}>
            <Link to={'/add'}>
              <Button variant="" style={{ backgroundColor: '#BAFF39' }} id="button-addon2">
                <i className="fa-solid fa-user-plus fa-shake"></i> Add
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Filter buttons */}
        <Row className="my-3">
          <Col xs={12}>
            <Button
              variant={filterStatus === 'all' ? 'primary' : 'outline-primary'}
              onClick={() => setFilterStatus('all')}
              className="me-2"
            >
              All Tasks
            </Button>
            <Button
              variant={filterStatus === 'todotask' ? 'primary' : 'outline-primary'}
              onClick={() => setFilterStatus('todotask')}
              className="me-2"
            >
              Todo Tasks
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'primary' : 'outline-primary'}
              onClick={() => setFilterStatus('completed')}
            >
              Completed Tasks
            </Button>
          </Col>
        </Row>
        {/* Task list or spinner */}
        {showSpain ? (
          <TableT tasksToDisplay={filterTasks} removerTak={deleteTask} />
          // <TableT tasksToDisplay={allTasks} removerTak={deleteTask} />
        ) : (
          <SpinnerC />
        )}
      </Container>
    </div>
  );
}

export default Home;
