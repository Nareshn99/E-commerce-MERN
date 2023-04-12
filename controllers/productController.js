import productModel from "../models/productModel.js";
import slugify from 'slugify'
import fs from 'fs'
import uploadFile from '../utils/aws.js'


export const createProduct = async function (req, res) {
    try {
        const { name, description, price, category, quantity, shipping } =req.body;
    //   const { photo } = req.files;
        //validation for emptyBody
        switch (true) {
            case !name:
                return res.status(400).send({ status: false, message: "Product Name Is Required" })
            case !description:
                return res.status(400).send({ status: false, message: "Product Description Is Required" })
            case !price:
                return res.status(400).send({ status: false, message: "Product Price Is Required" })
            case !quantity:
                return res.status(400).send({ status: false, message: "Product quantity Is Required" })
            case !category:
                return res.status(400).send({ status: false, message: "Product category Is Required" })
                }

        let photo = req.files;
        if (photo && photo.length > 0) {          
            const url = await uploadFile(photo[0]);
            req.body.photo = url
        } else {
            return res.status(400).send({ status: false, message: "ProductImage Is Mandatory" });
        }

        const product = await productModel.create({ ...req.body, slug: slugify(name) })
        return res.status(201).send({ status: true, message: "Product Created Successfully", data:product });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


export const getAllProduct = async (req, res) => {
    try {

        let result = await productModel.find({}).select({photo:0}).populate("category").limit(12).sort({createdAt:-1});
        if (!result) {
            return res.status(404).send({ status: false, message: "Products Not Found" });
        }
        return res.status(200).send({ status: true, message: "Success", data: result });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};





export const getSingleProduct = async (req, res) => {
    try {

        let result = await productModel.findOne({ slug:req.params.slug }).select({photo:0}).populate("category").limit(12).sort({createdAt:-1});
        if (!result) {
            return res.status(404).send({ status: false, message: "Product Not Found" });
        }
        return res.status(200).send({ status: true, message: "Success", data: result });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

export const getProductPhoto = async (req, res) => {
    try {

        let result = await productModel.findById(req.params.pid ).select({photo:1})
        if (!result) {
            return res.status(404).send({ status: false, message: "Product Not Found" });
        }
        return res.status(200).send({ status: true, message: "Success", data: result });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

export const updateProduct = async function (req, res) {
    try {
        const { name, description, price, category, quantity, shipping } =req.body;
    
        switch (true) {
            case !name:
                return res.status(400).send({ status: false, message: "Product Name Is Required" })
            case !description:
                return res.status(400).send({ status: false, message: "Product Description Is Required" })
            case !price:
                return res.status(400).send({ status: false, message: "Product Price Is Required" })
            case !quantity:
                return res.status(400).send({ status: false, message: "Product quantity Is Required" })
            case !category:
                return res.status(400).send({ status: false, message: "Product category Is Required" })
                }

        let photo = req.files;
        if (photo && photo.length > 0) {          
            const url = await uploadFile(photo[0]);
            req.body.photo = url
        } else {
            return res.status(400).send({ status: false, message: "ProductImage Is Mandatory" });
        }

        const product = await productModel.findByIdAndUpdate(req.params.id,{ ...req.body, slug: slugify(name) },{new:true})
        return res.status(200).send({ status: true, message: "Product Update Successfully", data:product });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}





export const deleteProduct = async (req, res) => {
    try {
        let productId = req.params.pid;
        await productModel.findOneAndDelete(productId);
        return res.status(200).send({ status: true, message: "The product is deleted successfully"});

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

// const getProduct = async (req, res) => {
//     try {
//         let { size, name, priceGreaterThan, priceLessThan, priceSort } = req.query;
//         let filterQueryData = { isDeleted: false }
        
        
//         // all type of price filter
//         if (priceGreaterThan && priceLessThan) {
           
//                 return res.status(400).send({ status: false, message: 'please provide priceGreaterThan && priceLessThan as number' });
        
//             filterQueryData['price'] = { $gt: priceGreaterThan, $lt: priceLessThan };
//         } else if (priceGreaterThan) {
//             if (!isValidPrice(priceGreaterThan)) {
//                 return res.status(400).send({ status: false, message: 'please provide priceGreaterThan as number' });
//             }
//             filterQueryData['price'] = { $gt: priceGreaterThan };
//         } else if (priceLessThan) {
//             if (!isValidPrice(priceLessThan)) {
//                 return res.status(400).send({ status: false, message: 'please provide priceLessThan as number' });
//             }
//             filterQueryData['price'] = { $lt: priceLessThan };
//         }
//         //ascending descending filtter
//         if (priceSort) {

//             if (priceSort == 1) {
//                 const finalData = await productModel.find(filterQueryData).sort({ price: 1 })
//                 if (finalData.length == 0) return res.status(404).send({ status: false, message: 'no product found' });
//                 return res.status(200).send({ status: true, message: 'Success', data: finalData });

//             } else if (priceSort == -1) {
//                 const finalData = await productModel.find(filterQueryData).sort({ price: -1 })
//                 if (finalData.length == 0) return res.status(404).send({ status: false, message: 'no product found' });
//                 return res.status(200).send({ status: true, message: 'Success', data: finalData });
//             }

//         }
//         const finalData = await productModel.find(filterQueryData)
//         if (finalData.length == 0) return res.status(404).send({ status: false, message: 'no product found' });
//         return res.status(200).send({ status: true, message: 'Success', data: finalData });
//     } catch (error) {
//         res.status(500).send({ status: false, error: error.message })
//     }
// }




// const updateProduct = async function (req, res) {
//     try {

//         let productId = req.params.productId
//         if (!isValidObjectId(productId)) {
//             return res.status(400).send({ status: false, message: "Invalid ProductId" });
//         }

//         let { title, description, price, currencyId, currencyFormat, style, isFreeShipping, availableSizes, productImage, installments, isDeleted } = req.body;

//         //validation for emptyBody
//         if (!isValidBody(req.body)) {
//             return res.status(400).send({ status: false, message: "Please Enter Some Input" });
//         };
//         if (title) {
//             if (!isEmpty(title)) {
//                 return res.status(400).send({ status: false, message: "Title is String only" })
//             }
//             let uniqueTitle = await productModel.findOne({ title })
//             if (uniqueTitle) {
//                 return res.status(409).send({ status: false, message: "Given title is already taken" })
//             }
//         }

//         if (description) {
//             if (!isEmpty(description)) {
//                 return res.status(400).send({ status: false, message: "description is String only" })
//             };
//         }
//         if (price) {

//             if (!isValidPrice(price)) {
//                 return res.status(400).send({ status: false, message: "Price must be in decimal Number" })
//             };
//         }
//         //validation for currencyId and currencyFormat
//         if (currencyId) {
//             if (currencyId !== "INR") {
//                 return res.status(400).send({ status: false, message: "CurrencyId is always INR/String only" })
//             };
//         }
//         if (currencyFormat) {
//             if (currencyFormat !== "₹") {
//                 return res.status(400).send({ status: false, message: "currencyFormat is always INR/String only" })
//             };
//         }
//         if (isFreeShipping) {
//             if (isFreeShipping != "true" && isFreeShipping != "false") {
//                 return res.status(400).send({ status: false, message: "isFreeShipping Boolean only" })
//             };
//         }
//         if (availableSizes) {
//             let size = availableSizes.toUpperCase().split(",").map((item) => item.trim()) //creating an array
//             req.body.availableSizes = size;
//             for (let i = 0; i < size.length; i++) {
//                 if (!isValidSize(size[i])) {
//                     return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" })
//                 }
//             }
//         }
//         if (currencyId) {
//             if (currencyId != "INR") {
//                 return res.status(400).send({ status: false, message: "CurrencyId should only be INR " })
//             }
//         }
//         if (currencyFormat) {
//             if (currencyFormat != "₹") {
//                 return res.status(400).send({ status: false, message: "currencyFormat should only be ₹" })
//             }
//         }
//         if (isFreeShipping) {
//             if (!(isFreeShipping == "true" || isFreeShipping == "false")) {
//                 return res.status(400).send({ status: false, message: " isFreeShipping only be true or false" })
//             }
//         }
//         if (style) {
//             if (!isEmpty(style)) {
//                 return res.status(400).send({ status: false, message: "style String only" })
//             };
//         }
//         if (installments) {
//             if (!isValidPrice(installments)) {
//                 return res.status(400).send({ status: false, message: "please enter installments in decimal Number" })
//             }
//         }

//         let file = req.files;
//         if (file && file.length > 0) {
//             let url = await aws.uploadFile(file[0]);
//             req.body.productImage = url
//         }

//         if (isDeleted) {
//             if (typeof isDeleted !== "boolean" || isDeleted == true) {
//                 return res.status(400).send({ status: false, message: "isDeleted Boolean only/you cant delete when product is not created" })
//             };
//         }

//         let updatedProduct = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, { $set: req.body }, { new: true })
//         if (!updatedProduct) {
//             return res.status(400).send({ status: false, message: "products not found" })
//         }

//         return res.status(200).send({ status: true, message: "updated", data: updatedProduct })

//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message })
//     }
// }




// module.exports = { createProduct, getProduct, getProductById, updateProduct, deleteProduct }
