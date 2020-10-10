import React, { Component } from 'react'

import { Container, Row, Col, Form, FormGroup, Label, Input, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: {},
            title: "Mi primer post",
            author: "Raziel Iqui Balam",
            img: "https://picsum.photos/id/237/300",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore impedit, quo corporis voluptate cupiditate dignissimos!"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getPosts = () => {
        fetch("https://class-vs-hooks.firebaseio.com/posts/.json").then(response => {
            response.json().then(json => {
                this.setState({ posts: json })
            })
        })
    }

    componentDidMount() {
        this.getPosts()
    }

    handleChange(event) {
        let property = event.target.name
        let value = event.target.value
        this.setState({ [property]: value })
    }

    handleSubmit() {
        let { title, author, content, img } = this.state
        let postObject = { title, author, content, img }
        fetch("https://class-vs-hooks.firebaseio.com/posts/.json", {
            method: "POST",
            body: JSON.stringify(postObject)
        }).then(response => {
            console.log(response)
            this.getPosts()
        })
    }

    render() {
        let { title, content, img, author, posts } = this.state
        return (
            <Container fluid>
                <Row>
                    <Col md="4">
                        <Form className="p-3 bg-dark text-white my-3">
                            <FormGroup>
                                <Label for="title">Título</Label>
                                <Input type="text" name="title" id="title" value={title} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="author">Autor</Label>
                                <Input type="text" name="author" id="author" value={author} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="img">Imagen (URL) </Label>
                                <Input type="text" name="img" id="img" value={img} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Contenido</Label>
                                <Input type="textarea" name="text" id="content" value={content} onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="button" color="primary" className="ml-auto d-block" onClick={this.handleSubmit}>Crear post</Button>
                        </Form>
                    </Col>
                    <Col md="8">
                        {
                            Object.keys(posts).map(post => {
                                let { title, author, content, img } = posts[post]
                                return (
                                    <Card className="mb-3">
                                        <Row>
                                            <Col xs="3">
                                                <CardImg top src={img} alt="Card image cap" className="full-size-pic" />
                                            </Col>
                                            <Col xs="9">
                                                <CardBody >
                                                    <CardTitle>{title}</CardTitle>
                                                    <CardText>{content}</CardText>
                                                    <CardText>
                                                        <small className="text-muted">{author}</small>
                                                    </CardText>
                                                </CardBody>
                                            </Col>
                                        </Row>
                                    </Card>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MainPage