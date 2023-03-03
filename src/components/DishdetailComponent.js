import React,{ useState }  from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle,ListGroup,
    Breadcrumb,BreadcrumbItem,Button ,Modal, ModalHeader, ModalBody,Label, Col,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';

const required=(val)=>val && val.length;
const maxLength=(len)=>(val)=>!(val)||(val.length<=len);
const minLength=(len)=>(val)=>!(val)||(val.length>=len);

    function RenderDish({dish}) {
        if(dish!=null){
            return(
                <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                </Card>
            );
        }else{
            return(
                <div></div>
            );
        }
    }  

    function RenderComments({comments}){
        if(comments!=null){
                return(
                    <div>    
                        <h4>Comments</h4>              
                        <ListGroup key={comments.id}>
                            {comments.map(comments => (
                                <div>
                                    <p>{comments.comment}</p>
                                     <p>--{comments.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comments.date)))}</p>                                  
                                </div>
                            ))}  
                                
                        </ListGroup>
                    </div>
                );
        }else{
            return(
                <div></div>
            );    
        }  
    }  
    

    const DishDetail=(props)=>{
        const [isCommentModalOpen, setModal] = useState(false);
        const toggleCommentModal = () => setModal(!isCommentModalOpen);
        const commentSubmit=(values)=>{
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
        }
      return(
        <div className="container">
             <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
            <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                        <Button outline className="mr-auto" onClick={toggleCommentModal} >
                                <span className="fa fa-pencil"></span> Submit Comment
                        </Button>
                    </div>                   
            </div>
            <div>
                <Modal isOpen={isCommentModalOpen} toggle={toggleCommentModal} >
                    <ModalHeader toggle={toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>commentSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                       className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>   
                                    </Control.select>
                                </Col>  
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="yourname">Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                       className="form-control" 
                                       validators={{
                                        required,minLength:minLength(3),maxLength:maxLength(15)
                                    }}/>
                                     <Errors
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                required:'Required',
                                                minLength:'Must be geater than 2 characters',
                                                maxLength:'Must be 15 characters or less'
                                            }}
                                        />
                                </Col>  
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                          rows="6"
                                       className="form-control" />
                                </Col>  
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>    
                </Modal>
            </div>
        </div>  
          
      );
    }

export default DishDetail;