import Product from '../models/product.model';


export const getAllProduct = async () => {

    const data = await Product.find();
    return data;

}

export const getById = async (id) => {
    const data = await Product.findById({ _id: id });
    if (data != null) {
        return data;
    } else {
        throw new Error('Id is Not Correct or Note not exist')
    }
}


export const addProduct = async (body) => {
    const data = await Product.create(body);
    return data;
}

