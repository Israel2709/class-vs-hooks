import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Form, FormGroup, Label, Input, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

function MainPage() {
    const [totalPosts, setTotalPosts] = useState(0)
    const [posts, setPosts] = useState({})
    const [post, setPost] = useState({
        title:"Mi primer post",
        author:"Raziel Iqui Balam",
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore impedit, quo corporis voluptate cupiditate dignissimos!",
        img:"https://picsum.photos/id/37/300"
    })

    const getPosts = () => {
        fetch("https://class-vs-hooks.firebaseio.com/posts/.json").then(response => {
            response.json().then(json => {
                setPosts(json)
                setTotalPosts(Object.keys(json).length)
            })
        })
    }

    const handleChange = ( event ) => {
        let property = event.target.name
        let value = event.target.value
        setPost( { ...post, [property]:value})
    }

    const handleSubmit = () => {
        fetch("https://class-vs-hooks.firebaseio.com/posts/.json", {
            method: "POST",
            body: JSON.stringify(post)
        }).then(response => {
            getPosts()
        })
    }

    useEffect(() => { 
        getPosts()
    },[totalPosts])

    let { title, author, img, content } = post

    return (
        <Container fluid>
            <Row>
                <Col md="4">
                    <Form className="p-3 bg-dark text-white my-3">
                        <FormGroup>
                            <Label for="title">Título</Label>
                            <Input type="text" name="title" value={ title } id="title" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="author">Autor</Label>
                            <Input type="text" name="author" value={ author } id="author" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="img">Imagen (URL) </Label>
                            <Input type="text" name="img" value={ img } id="img" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Contenido</Label>
                            <Input type="textarea" name="text" value={ content }id="content" onChange={handleChange} />
                        </FormGroup>
                        <Button type="button" color="primary" className="ml-auto d-block" onClick={handleSubmit}>Crear post</Button>
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

export default MainPage