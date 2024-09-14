// import React from 'react'
// // import Image from 'react-bootstrap/Image';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Button from 'react-bootstrap/Button';
// import './Add.css';
// import { Link } from 'react-router-dom';
// import { Col, Container, Row } from 'react-bootstrap';
// // GES10 to access vairable destructre   RES7 then goto down 71
// function TableT({ tasksToDisplay, removerTak }) {
//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col xs={12} sm={6} md={12} lg={6} xl={12} className=''>
//             <h1 className='text-center text-light'><strong>List of <span style={{ color: '#BAFF39' }}>Tasks</span></strong></h1>
//             <div id='box1' className=' w-75' style={{marginLeft:'12%'}}>
//               <table class="table table-hover fs-5 mt-5" >
//                 <thead className='table-dark'>
//                   <tr>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">No.</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Title Task</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Task Description</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Status</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* GES11.1 */}
//                   {           /* GES11.2 */
//                     tasksToDisplay.length > 0 ? tasksToDisplay.map((i, index) => (

//                       <tr class="table-Default">
//                         {/* GES11.3 */}
//                         <th scope="row">{index + 1} </th>
//                         <td>{i.ttask}</td>
//                         <td>{i.dtask}</td>
//                         <td>
//                           <div style={{ backgroundColor: '#BAFF39', color: 'black', fontWeight: 'bold', borderEndEndRadius: '10px' }} className='text-center p-2 w-75'>
//                             {i.statu} 
//                             {/* <i class="fa-solid fa-angle-down fa-bounce ms-2"></i> */}
//                           </div>
//                         </td>
//                         <td>
//                           <Dropdown as={ButtonGroup}>
//                             <Button variant=""><i class="fa-solid fa-ellipsis-vertical fa-beat"></i></Button>

//                             <Dropdown.Toggle split variant="" id="dropdown-split-basic" />

//                             <Dropdown.Menu style={{ borderColor: 'black' }}>

//                               {/* View */}
//                               <Dropdown.Item>
//                                 {/* GSES1 */}
//                                 <Link to={`/view/${i._id}`} style={{ textDecoration: 'none',color: 'black'  }}>
//                                   <i class="fa-regular fa-eye fa-beat-fade me-3"></i>View
//                                 </Link>
//                               </Dropdown.Item>

//                               {/* View */}
//                               <Dropdown.Item>
//                                 <Link to={`/edit/${i._id}`} style={{ textDecoration: 'none',color: 'black' }}>
//                                   <i class="fa-solid fa-scissors fa-shake me-3"></i>Edit
//                                 </Link>
//                               </Dropdown.Item>
//                                                     {/* RES8 then goto contextShare.js*/}
//                               <Dropdown.Item onClick={()=>removerTak(i._id)}><i class="fa-solid fa-trash-can fa-bounce me-3"></i>Delete</Dropdown.Item>
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         </td>

//                       </tr>
//                     )) : <p>NO Tasks are Present</p>
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default TableT


// import React, { useState } from 'react';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Button from 'react-bootstrap/Button';
// import './Add.css';
// import { Link } from 'react-router-dom';
// import { Col, Container, Row } from 'react-bootstrap';

// function TableT({ tasksToDisplay, removerTak }) {
//   // State to manage task status (Complete or To Do)
//   const [taskStatus, setTaskStatus] = useState(
//     tasksToDisplay.reduce((acc, task) => {
//       acc[task._id] = task.statu === task.statu;
//       console.log(task.statu);

//       return acc;
//     }, {})
//   );

//   // Toggle task status between 'Complete' and 'To Do'
//   const handleStatusChange = (taskId) => {
//     setTaskStatus(prevState => ({
//       ...prevState,
//       [taskId]: !prevState[taskId],
//     }));
//   };

//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col xs={12} sm={6} md={12} lg={6} xl={12} className=''>
//             <h1 className='text-center text-light'>
//               <strong>
//                 List of <span style={{ color: '#BAFF39' }}>Tasks</span>
//               </strong>
//             </h1>
//             <div id='box1' className='w-75' style={{ marginLeft: '12%' }}>
//               <table className="table table-hover fs-5 mt-5">
//                 <thead className='table-dark'>
//                   <tr>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">No.</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Title Task</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Task Description</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Status</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tasksToDisplay.length > 0 ? tasksToDisplay.map((i, index) => (
//                     <tr className="table-Default" key={i._id}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{i.ttask}</td>
//                       <td>{i.dtask}</td>
//                       <td>
//                         {/* Checkbox to toggle status */}
//                         <div className='status-checkbox'>
//                           <input
//                             type="checkbox"
//                             id={`/tasks/updateTask/${i._id}`}
//                             checked={taskStatus[i._id]}
//                             onChange={() => handleStatusChange(i._id)}
//                           />
//                           <label htmlFor={`/tasks/updateTask/${i._id}`} style={{ marginLeft: '10px' }}>
//                             {taskStatus[i._id] ? i.statu:i.statu}
//                           </label>
//                         </div>
//                       </td>
//                       <td>
//                         <Dropdown as={ButtonGroup}>
//                           <Button variant=""><i className="fa-solid fa-ellipsis-vertical fa-beat"></i></Button>

//                           <Dropdown.Toggle split variant="" id="dropdown-split-basic" />

//                           <Dropdown.Menu style={{ borderColor: 'black' }}>
//                             <Dropdown.Item>
//                               <Link to={`/view/${i._id}`} style={{ textDecoration: 'none', color: 'black' }}>
//                                 <i className="fa-regular fa-eye fa-beat-fade me-3"></i>View
//                               </Link>
//                             </Dropdown.Item>
//                             <Dropdown.Item>
//                               <Link to={`/edit/${i._id}`} style={{ textDecoration: 'none', color: 'black' }}>
//                                 <i className="fa-solid fa-scissors fa-shake me-3"></i>Edit
//                               </Link>
//                             </Dropdown.Item>
//                             <Dropdown.Item onClick={() => removerTak(i._id)}>
//                               <i className="fa-solid fa-trash-can fa-bounce me-3"></i>Delete
//                             </Dropdown.Item>
//                           </Dropdown.Menu>
//                         </Dropdown>
//                       </td>
//                     </tr>
//                   )) : <p>No Tasks are Present</p>}
//                 </tbody>
//               </table>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default TableT;

// import React, { useState } from 'react';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Button from 'react-bootstrap/Button';
// import './Add.css';
// import { Link } from 'react-router-dom';
// import { Col, Container, Row } from 'react-bootstrap';

// function TableT({ tasksToDisplay, removerTak }) {
//   // State to manage task status (To Do or Complete)
//   const [taskStatus, setTaskStatus] = useState(
//     tasksToDisplay.reduce((acc, task) => {
//       acc[task._id] = task.statu === 'completed' ? 'completed' : 'todotask';
//       return acc;
//     }, {})
//   );

//   // Toggle task status between 'Complete' and 'To Do'
//   const handleStatusChange = (taskId, event) => {
//     setTaskStatus(prevState => ({
//       ...prevState,
//       [taskId]: event.target.value,
//     }));
//   };

//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col xs={12} sm={6} md={12} lg={6} xl={12} className=''>
//             <h1 className='text-center text-light'>
//               <strong>
//                 List of <span style={{ color: '#BAFF39' }}>Tasks</span>
//               </strong>
//             </h1>
//             <div id='box1' className='w-75' style={{ marginLeft: '12%' }}>
//               <table className="table table-hover fs-5 mt-5">
//                 <thead className='table-dark'>
//                   <tr>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">No.</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Title Task</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Task Description</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Status</th>
//                     <th style={{ backgroundColor: '#BAFF39', color: 'black' }} scope="col">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tasksToDisplay.length > 0 ? tasksToDisplay.map((i, index) => (
//                     <tr className="table-Default" key={i._id}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{i.ttask}</td>
//                       <td>{i.dtask}</td>
//                       {/* <td>
//                         Dropdown to select status 
//                         <select
//                           value={taskStatus[i._id]}
//                           onChange={(event) => handleStatusChange(i._id, event)}
//                           className='form-select w-75'
//                           style={{ backgroundColor: '#BAFF39', color: 'black', fontWeight: 'bold', borderRadius: '5px' }}
//                         >
//                           <option value={"todotask"}>To Do</option>
//                           <option value={"completed"}>Complete</option>
//                         </select>
//                       </td>*/}
//                       <td> 
//                         <Dropdown as={ButtonGroup}>
//                           <Button variant=""><i className="fa-solid fa-ellipsis-vertical fa-beat"></i></Button>

//                           <Dropdown.Toggle split variant="" id="dropdown-split-basic" />

//                           <Dropdown.Menu style={{ borderColor: 'black' }}>
//                             <Dropdown.Item>
//                               <Link to={`/view/${i._id}`} style={{ textDecoration: 'none', color: 'black' }}>
//                                 <i className="fa-regular fa-eye fa-beat-fade me-3"></i>View
//                               </Link>
//                             </Dropdown.Item>
//                             <Dropdown.Item>
//                               <Link to={`/edit/${i._id}`} style={{ textDecoration: 'none', color: 'black' }}>
//                                 <i className="fa-solid fa-scissors fa-shake me-3"></i>Edit
//                               </Link>
//                             </Dropdown.Item>
//                             <Dropdown.Item onClick={() => removerTak(i._id)}>
//                               <i className="fa-solid fa-trash-can fa-bounce me-3"></i>Delete
//                             </Dropdown.Item>
//                           </Dropdown.Menu>
//                         </Dropdown>
//                       </td>
//                     </tr>
//                   )) : <p>No Tasks are Present</p>}
//                 </tbody>
//               </table>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default TableT;

import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './Add.css';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

function TableT({ tasksToDisplay, removerTak }) {
  // State to manage task status (To Do or Complete)
  const [taskStatus, setTaskStatus] = useState(
    tasksToDisplay.reduce((acc, task) => {
      acc[task._id] = task.statu === 'completed' ? 'completed' : 'todotask';
      return acc;
    }, {})
  );

  // Handle checkbox changes, only one checkbox should be selected at a time
  const handleStatusChange = (taskId, statu) => {
    setTaskStatus(prevState => ({
      ...prevState,
      [taskId]: statu, // Set the selected status (To Do or Complete)
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
                  {tasksToDisplay.length > 0 ? tasksToDisplay.map((i, index) => (
                    <tr className="table-Default" key={i._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{i.ttask}</td>
                      <td>{i.dtask}</td>
                      <td>
                        <div className="status-checkboxes">
                          <div class="input-group">
                            <input
                              type="radio"
                              id={`/tasks/updateTask/${i._id}`}
                              checked={taskStatus[i._id] === 'todotask'}
                              onChange={() => handleStatusChange(i._id, 'todotask')}
                            />
                            <label htmlFor={`/tasks/updateTask/${i._id}`} style={{ marginLeft: '10px' }}>To Do Task</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id={`/tasks/updateTask/${i._id}`}
                              checked={taskStatus[i._id] === 'completed'}
                              onChange={() => handleStatusChange(i._id, 'completed')}
                            />
                            <label htmlFor={`/tasks/updateTask/${i._id}`} style={{ marginLeft: '10px' }}>Completed</label>
                          </div>
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
