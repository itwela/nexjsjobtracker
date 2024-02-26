import mongoose, { Schema } from "mongoose";

// export interface ITopic {
//     Job_Title: String, 
//     Company: String, 
//     Date_Applied: String, 
//     Status: String, 
//     Link: String, 
//     Referral: String, 
//     Referral_Name: String, 
//     Referral_Contact: String,
//     Resume_Used: String,
//     Response_Date: String,
//     Keywords: String,
//     Introduction?: String,
// }

// export interface ITopicDocument extends ITopic, Document {
//     createdAt: Date;
//     updatedAt: Date;
// }

const topicSchema = new Schema(
    {
        Job_Title: String, 
        Company: String, 
        Date_Applied: String, 
        Status: String, 
        Link: String, 
        Referral: String, 
        Referral_Name: String, 
        Referral_Contact: String,
        Resume_Used: String,
        Response_Date: String,
        Keywords: String,
        Introduction: String,
    }, {
        timestamps: true,
    }
);

const Topic = mongoose.models?.Topic || mongoose.model('Topic', topicSchema);

export default Topic;