import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import createRequest from '../../request';

const TransactionForm = (props) => {
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState(new Date().toISOString().split('T')[0]);
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredType, setEnteredType] = useState('expense');
    const [enteredCategory, setEnteredCategory] = useState('');
    const [url, setUrl] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [formIsValid, setFormISValid] = useState(true);

    useEffect(() => {
        const fetchCategories = () => {
            createRequest('/categories.json', 'GET')
            .then((data) => {
                setCategoryList(data);
            })
        }
        fetchCategories();
    }, []);

    const uploadImage = (event) => {
        setFormISValid(false);
        const image = event.target.files[0];
        const data = new FormData();
        data.append('file', image)
        data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_IDENTIFIER)
        fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_IDENTIFIER}/image/upload`, {
            method: 'post',
            body: data
        }).then(resp =>
            resp.json()
        ).then(data => {
            setUrl(data.url);
            setFormISValid(true);
            if (data.url) {
                setFormISValid(true);
            }
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const transactionData = {
            type_of: enteredType,
            amount: enteredAmount,
            title: enteredTitle,
            description: enteredDescription,
            receipt: url,
            date: enteredDate,
            category_id: Number(enteredCategory),
        };
        props.onSaveTransactionData(transactionData);
        setEnteredDescription('');
        setEnteredAmount('');
        setEnteredDate('');
        setFormISValid(false);
    }

    const filteredCategoryList = enteredType === "expense" ?
        categoryList.slice(0, categoryList.length - 3) : categoryList.slice(-3);

    return (
        <form onSubmit={submitHandler}>
            <Row className="align-items-center" style={{ "marginLeft": "30px", "marginRight": "30px" }}>
                <Col sm={4} className="my-1">
                    <label>Income/Expense</label>
                    <Form.Select value={enteredType}
                        onChange={(e) => setEnteredType(e.target.value)} required>
                        <option value="">Select Type</option>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className="align-items-center" style={{ "marginLeft": "30px", "marginRight": "30px" }}>
                <Col sm={3} className="my-1">
                    <label>Date</label>
                    <Form.Control type="date" value={enteredDate} required
                        onChange={(e) => setEnteredDate(e.target.value)} />
                </Col>
    
            
                <Col sm={3} className="my-1">
                    <label>Category</label>
                    <Form.Select value={enteredCategory} required
                        onChange={(e) => setEnteredCategory(e.target.value)}>
                        {filteredCategoryList.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.icon} {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>

                <Col sm={3} className="my-1">
                    <label>Title</label>
                    <Form.Control type="Title" value={enteredTitle} required maxLength={20}
                        onChange={(e) => setEnteredTitle(e.target.value)} />
                </Col>

                <Col sm={2} className="my-1">
                    <label>Amount</label>
                    <Form.Control type="number" value={enteredAmount} required min="0.01" step="0.01"
                        onChange={(e) => setEnteredAmount(e.target.value)} placeholder="$" />
                </Col>
            </Row>
            <Row className="align-items-center"
                style={{ "marginBottom": "20px", 'marginLeft': "30px", "marginRight": "30px" }} >
                <Col sm={4} className="my-1">
                    <label>Description</label>
                    <Form.Control type="text" value={enteredDescription}
                        onChange={(e) => setEnteredDescription(e.target.value)} />
                </Col>
                <Col sm={4} className="my-1">
                    <label>Upload</label>
                    <Form.Control type="file" onChange={uploadImage} />
                </Col>

                {formIsValid &&
                    <Col sm={2} className='ml-auto form-btn btn-group ml-auto mt-4'
                        style={{ "display": "inline-flex", "marginLeft": "10px" }}>
                        <Button style={{ "marginRight": "15px" }} type="submit">Add</Button>
                        <Button type="button" onClick={props.onCancel}>Cancel</Button>
                    </Col>
                }
                {!formIsValid &&
                    <Col sm={2} className='ml-auto form-btn btn-group ml-auto mt-4'>
                        <Button type="submit" disabled>Uploading..</Button>
                        <Button style={{ "marginLeft": "2vw" }} type="button"
                            onClick={props.onCancel}>Cancel</Button>
                    </Col>
                }
            </Row>
        </form>
    );
};

export default TransactionForm;