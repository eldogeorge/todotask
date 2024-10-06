import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './Add.css';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// here TableT means: tableTask, ttask means: titleTask,dtask means:descriptionTask, statu:taskStatus
function TableT({ tasksToDisplay, removerTak }) {
  // State to manage task status (Complete or To Do)
  const [taskStatus, setTaskStatus] = useState(
    tasksToDisplay.reduce((acc, task) => {
      acc[task._id] = task.statu === "completed";
      console.log(task.statu);

      return acc;
    }, {})
  );

  // Toggle task status between 'Complete' and 'To Do'
  const handleStatusChange = (taskId) => {
    setTaskStatus(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} sm={6} md={12} lg={6} xl={12} className=''>
            <h1 className='text-center text-light'>
              <strong>
                List of <span style={{ color: '#BAFF39' }}>Tasks</span>
              </strong>
            </h1>
            <div id='box1' className='w-75' style={{ marginLeft: '12%' }}>
              <table className="table table-hover fs-5 mt-5">
                <thead className='table-dark'>
                  <tr>
                    <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">No.</th>
                    <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Title Task</th>
                    <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Task Description</th>
                    <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Status</th>
                    <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksToDisplay.length > 0 ? tasksToDisplay.slice().reverse().map((i, index) => (
                    <tr className="table-Default" key={i._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{i.ttask}</td>
                      <td>{i.dtask}</td>
                      <td>
                        {/* Checkbox to toggle status */}
                        <div className='form-check'>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id={`/tasks/updateTask/${i._id}`}
                            checked={taskStatus[i._id]}
                            onChange={() => handleStatusChange(i._id)}
                          />
                          <label htmlFor={`/tasks/updateTask/${i._id}`} style={{ marginLeft: '10px' }} for="flexCheckChecked">
                            {taskStatus[i._id] ? "completed" : "todotask"}
                          </label>
                        </div>
                      </td>
                      <td>
                        <Dropdown as={ButtonGroup}>
                          <Button variant=""><i className="fa-solid fa-ellipsis-vertical fa-beat"></i></Button>

                          <Dropdown.Toggle split variant="" id="dropdown-split-basic" />

                          <Dropdown.Menu style={{ borderColor: 'black' }}>
                            <Dropdown.Item>
                              <Link to={`/view/${i._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <i className="fa-regular fa-eye fa-beat-fade me-3"></i>View
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link to={`/edit/${i._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <i className="fa-solid fa-scissors fa-shake me-3"></i>Edit
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => removerTak(i._id)}>
                              <i className="fa-solid fa-trash-can fa-bounce me-3"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  )) : <p>No Tasks are Present</p>}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TableT;
