import React from 'react';
import { Card , Row, Col } from 'react-bootstrap';
import "./IncomeExpense.css";

const IncomeExpense = (props) => {
    let incomeAmount = 0;
    let expenseAmount = 0;

    if (props.items.length > 0) {
        props.items.map((transaction) => {
           if ( transaction.type_of === 'income') {
               incomeAmount += Number(transaction.amount);
           } else {
               expenseAmount += Number(transaction.amount);
           }
           return(incomeAmount,expenseAmount);
        })
    }

    return(
        <Row>
            <Col md={4}>
                <Card bg='primary' text='white' className='mb-2'>
                <Card.Header>Income</Card.Header>
                <Card.Body>
                    <Card.Text>
                        $ {incomeAmount.toFixed(2)}
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col> 
            <Col md={4}>
                <Card bg='secondary' text='white' className='mb-2'>
                <Card.Header>Expense</Card.Header>
                <Card.Body>
                    <Card.Text>
                        $ {expenseAmount.toFixed(2)}
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col> 
            <Col md={4}>
                <Card bg='danger' text='white' className='mb-2'>
                <Card.Header>Balance</Card.Header>
                <Card.Body>
                    <Card.Text>
                        $ {(incomeAmount-expenseAmount).toFixed(2)}
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col> 
        </Row>
    )
}

export default IncomeExpense;