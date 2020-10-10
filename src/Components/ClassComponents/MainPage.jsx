import React, { Component } from 'react'

import { Container, Row, Col, Form, FormGroup, Label, Input, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:{},
            title:"Mi primer post",
            author:"Raziel Iqui Balam",
            img:"https://picsum.photos/id/237/300",
            content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore impedit, quo corporis voluptate cupiditate dignissimos!"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        fetch("https://class-vs-hooks.firebaseio.com/.json").then( response => {
            response.json().then( json => {
                this.setState( { posts : json })
            })
        })
    }

    handleChange( event ){
        let property = event.target.name
        let value = event.target.value
        this.setState( { [property] : value } )
    }

    render() {
        let { title, content, img, author } = this.state
        return (
            <Container fluid>
                <Row>
                    <Col md="4">
                        <Form className="p-3 bg-dark text-white mt-3">
                            <FormGroup>
                                <Label for="title">Título</Label>
                                <Input type="text" name="title" id="title" value={title} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="author">Autor</Label>
                                <Input type="text" name="author" id="author" value={author} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="img">Imagen (URL) </Label>
                                <Input type="text" name="img" id="img" value={img} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Contenido</Label>
                                <Input type="textarea" name="text" id="content" value={content} onChange={this.handleChange}/>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md="8">
                        <Card>
                            <Row>
                                <Col xs="3">
                                    <CardImg top src="https://picsum.photos/id/237/300" alt="Card image cap" className="full-size-pic"/>
                                </Col>
                                <Col xs="9">
                                    <CardBody>
                                        <CardTitle>Card Title</CardTitle>
                                        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                        <CardText>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </CardText>
                                    </CardBody>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MainPage