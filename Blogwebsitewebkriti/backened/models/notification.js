// Notification Schema
// user: The user who receives the notification.
// message: The content of the notification.
// isRead: A flag to indicate whether the notification has been read by the user.
// createdAt: The timestamp of when the notification was created.
// type: The type of notification (optional but useful for categorizing notifications, e.g., "like", "comment", "follow").
// link: A URL or reference to the item related to the notification (optional but useful for directing users to the relevant content).

const mongoose = require('mongoose');
 

const notificationschema =  new mongoose.Schema({
     
            user:{
                   type:mongoose.Schema.Types.ObjectId,
                   ref:"User"
            },
            message:{
                          type:String,
                          required:true
            },
            isread: { 
                type: Boolean, 
                default: false 
            },
            createdAt: { 
                type: Date, 
                
            },
            type: { 
                type: String 
            },
            link: { 
                type: String   // kis post  ke liye notification bhejni hai
            }
});

const  Notification  = mongoose.model('Notification', notificationschema);
module.exports = Notification;