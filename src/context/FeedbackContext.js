
import {v4 as uuidv4} from 'uuid'
import { createContext, useState } from 'react'

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState([
        {
            id:1,
            text:'This Feedback comment is 1',
            rating: 10
        },
        {
            id:2,
            text:'This Feedback comment is 2',
            rating: 5
        },
        {
            id:3,
            text:'This Feedback comment is 3',
            rating: 7
        }
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    // add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        
        setFeedback([newFeedback, ...feedback]);
    }

    //delete Feedback
    const deleteFeedback = (id) => {
        if(window.confirm("Are you sure you want to delete?")) {
            setFeedback(feedback.filter((item) => item.id !== id ));
            
        }
    }

    // update Feedback Item
    const updateFeedback = (id, updItem) => {
         console.log(id, updItem);
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
    } 



    // set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback: feedback,
        feedbackEdit: feedbackEdit,
        deleteFeedback: deleteFeedback,
        addFeedback: addFeedback,
        editFeedback: editFeedback,
        updateFeedback: updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;