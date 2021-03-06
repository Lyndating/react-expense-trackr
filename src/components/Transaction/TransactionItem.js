import React, {useState} from 'react';
import Card from '../Card'
import './TransactionItem.css';
import {Button} from 'react-bootstrap';
import TransactionDate from './TransactionDate';
import TransactionEdit from './TransactionEdit';

const TransactionItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
    
  const showTransactionEdit = () => {
      setIsEditing(true);
  }

  const stopEditingHandler = () => {
    setIsEditing(false);
  }

  const updateHandler = (transactionData) => {
    setIsEditing(false);
    let token = localStorage.getItem('token');
    const id = props.id
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_PATH}/transactions/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"transaction": transactionData}),
    })
    .then((resp) => resp.json())
    .then((parsedData) => props.onUpdateTransaction(parsedData))   
  }

  const transactionData = {
    type_of: props.type,
    amount: props.amount, 
    title: props.title,
    description: props.description,  
    receipt: props.receipt, 
    date: props.date,
    category_id: Number(props.category_id),
    id: props.id
  }

  const handleDelele = (event) => {
    event.preventDefault();
    let token = localStorage.getItem('token')
    const id = props.id
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_PATH}/transactions/${id}`, {
        method: 'DELETE',
        headers: {  
          'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
      if (response.status === 204) {
        props.onDeleteTransaction(props.id)
      }
    })
  }

  const receiptOpenHandler = () => {
    setShowReceipt(true);
  }

  const receiptCloseHandler = () => {
    setShowReceipt(false);
  }

  const receiptCssClasses = ["receipt",
    showReceipt ? "receiptOpen" : "receiptClosed"
  ]

  let cssStyleClassName ="";
  if (props.type === "expense") {
    cssStyleClassName = "transaction-item expense";
  } else {
    cssStyleClassName ="transaction-item";
  }

  const truncate = (text) => {
    if (text.length > 18) {
      return text + '...'}
    else {
      return text;
    }
  }

  return (
    <li>
      {!isEditing && 
        <Card className={cssStyleClassName}>
          <TransactionDate date={props.date} />
          
          <div className='transaction-item__description'>
            <h3>{props.type.toUpperCase()}</h3>
            <h5>{truncate(String(props.title))}
                {props.receipt &&
                <img className="receipt-icon"
                  src='https://e7.pngegg.com/pngimages/271/291/png-clipart-document-icon-invoice-computer-icons-electronic-billing-receipt-invoices-drawing-miscellaneous-angle-thumbnail.png'
                  onClick={receiptOpenHandler}
                />}
            </h5>
          </div>

          <div >
            <img className={receiptCssClasses.join(' ')}
              src={props.receipt} alt="receipt"
              onClick={receiptCloseHandler}
            />
          </div>
          
          <div className='transaction-item__price'>
            ${parseFloat(props.amount).toFixed(2)}
          </div>

          <div className='transaction-item_btn  ml-auto'>
            <Button className='btn btn-info mr-2 ml-auto'
              onClick={showTransactionEdit}>Edit</Button>
            <Button className='btn btn-danger ml-auto'
              onClick={handleDelele}>Delete</Button>
          </div>
        </Card>
      }
      {isEditing &&
        <Card className='transaction-item'>
          <TransactionEdit
            onCancel={stopEditingHandler}
            onUpateTransactionData={updateHandler}
            items={transactionData}
            categories={props.categories}
          />
        </Card>
      } 
    </li>
  );
};

export default TransactionItem;