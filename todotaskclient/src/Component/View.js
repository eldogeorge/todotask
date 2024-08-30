import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Add.css'
import { Link, useParams } from 'react-router-dom';
import { getSingleTask } from '../Service/allAPI';
import BASE_URL from '../Service/Base_url';

function View() {
  // GSES6
  const params = useParams().id
  // const {id}=useParams()
  // console.log(params);
  // GSES8
  const [singleTask,setsingleTask]=useState({})

  // GSES9
  const SingleTasksDetail=async()=>{
    // const reponse=await getSingleEmployees(params)
    // console.log(reponse.data); OR
    const {data}=await getSingleTask(params)
    setsingleTask(data)
  }
  // GSES11
  console.log(singleTask);
  // GSES7
  useEffect(()=>{
    // GSES10
    SingleTasksDetail()
  },[])
 return (
    <Container>

      <Row>
        <Col>
          {
          singleTask?
          <Card className='container' style={{ backgroundColor: '#6E6E6E', fontWeight: 'bold', width: '40%' }} id='box1'>
          {/* <Image variant="top" src={`${BASE_URL}/uploads/${singleEmployee.profile}`} roundedCircle style={{ width: '50%', borderRadius: '100%', marginLeft: '25%' }} className='text-center p-3' /> */}
          <Card.Body>
            <Card.Title><h1 className='text-center' style={{ fontWeight: 'bolder', color: '#BCFD4C' }}>{singleTask.ttask}</h1></Card.Title>
            <Card.Text>
               <p className='text-center' style={{ fontWeight: 'bolder', color: '#BCFD4C' }}>{singleTask.dtask}</p>
            </Card.Text>
          </Card.Body>
          {/* <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body> */}
        </Card>:
        <p>Task Not Found </p>
          }
     
          <div className='text-center mt-3'>
           <Link to={'/'}>
              <Button variant="" style={{ backgroundColor: '#BAFF39' }} className='ms-3 w-25' id="button-addon2">
              <span className='fs-4'>Back</span><i class="fa-solid fa-house fa-bounce ms-3"></i>
              </Button>
           </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default View