import React, {useState, useEffect} from 'react';
import NewTransaction from './NewTransaction';
import Transactions from './Transactions';
import createRequest from '../../request';
import TransactionChartYear from './TransactionChartYear';
import { motion } from 'framer-motion';

const TransactionsDisplay = () => {
    const [transactions, setTransactions] = useState([]);
    const [categoryList, setCategoryList] = useState([]); 

    useEffect(() => {
        const fetchTransactions = () => { 
            createRequest('/transactions.json', 'GET')
            .then((data)=> {
                setTransactions(data);       
            })
        }   
        fetchTransactions();
    }, []);

    useEffect(()=>{
        const fetchCategories = () => { 
            createRequest('/categories.json', 'GET')
            .then((data)=> {
                setCategoryList(data);       
            })
        }
        fetchCategories();
    }, []);  

    const addTransactionHandler = (transaction) => {
        setTransactions((prevTransactions) => {
          return [transaction, ...prevTransactions];
        });
    };
   
    const updateTransactionHandler =(transactionData)=>{
        setTransactions((prevTransactions) => {         
            const updatedTransaction = prevTransactions.filter(
                function(transaction) {
                    return transaction.id !== transactionData.id
                });
        return [transactionData, ...updatedTransaction]; 
        })
    }

    const deleteTransactionHandler = (deletedId) => {
        setTransactions((prevTransactions) => {
            const deleteTransaction = prevTransactions.filter(function (transaction) {
                return transaction.id !== deletedId
            });
            return deleteTransaction
        });
    };

    const sortedTransactions = transactions.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });

    if(transactions.length >0){   
        return(
            <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
            delay: .3,
            x: { type: "spring", stiffness: 100 },
            default: { duration: .4 },
            }}
            exit={{opacity: 0}}
    >
                <TransactionChartYear items={transactions}/>
                <NewTransaction onAddTransaction={addTransactionHandler}/>
                {!(transactions === []) &&
                <div>
                    <Transactions
                        items={sortedTransactions}
                        onDeleteTransaction={deleteTransactionHandler}
                        onUpdateTransaction={updateTransactionHandler}
                        categories={categoryList}
                    />
                </div>
                }
            </motion.div>
        )
    } else {
        return <NewTransaction onAddTransaction={addTransactionHandler}/>
    };
}

export default TransactionsDisplay;