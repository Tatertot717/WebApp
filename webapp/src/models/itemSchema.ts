import mongoose, {Schema, Document, Model} from "mongoose";

interface IItem extends Document {
    owner: number;
    title: string;
    description?: string;
    url?: string;
}

const intemSchema = new Schema<IItem>({
    owner: {
        type: Number,
    },
    title: {
    	type: String,
	required: true,
    },
    description: {
    	type: String,
    },
    url: {
    	type: String,
	required: false,
    },
})