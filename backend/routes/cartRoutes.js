const express = require("express") 
const Cart= require("../models/Cart")
const {protect} = require("../middleware/authMiddleware")
const router=express.Router() 
router.post("/add",protect,async (req,res)=>{
    try{
        const {productId}=req.body
        let cart=await Cart.findOne({userId:req.user.id})
        console.log(cart)
        if(!cart){
            cart=await Cart.create({
                userId:req.user.id,
                item:[{productId,quantity:1}]
            })
            console.log("if block",cart)
        }else{
            console.log("from else",cart)
            const itemIndex=cart.item.findIndex(item=>item.productId.toString()==productId)
            console.log("itemIndex",itemIndex)
            if(itemIndex>-1){
                cart.item[itemIndex].quantity+=1
            }
            else{
                cart.item.push({productId,quantity:1})
                console.log("old existing cart different",cart)

            }
            
        }
        await cart.save()
        return res.status(201).json({message:"Added to cart"}) 
    }
    catch(err){
        return res.status(500).json({message:`error from cart ${err}`})
    }
})

router.get("/",protect,async(req,res)=>{
    try{
        const cart=await Cart.findOne({userId:req.user.id}).populate("item.productId")
        console.log(cart)
        return res.status(200).json(cart)
    }
    catch(err){
        return res.status(500).json({message:`error from cart get route ${err}`})
    }
})
// Backend Cart Controller Example

// Update cart item quantity
router.put('/cart/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id; // Get from auth middleware
    
    const updatedCart = await Cart.findOneAndUpdate(
      { userId, "item._id": itemId },
      { $set: { "item.$.quantity": quantity } },
      { new: true }
    );
    
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Remove item from cart
router.delete('/cart/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;
    
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { item: { _id: itemId } } },
      { new: true }
    );
    
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})// Backend Cart Controller Example

// Update cart item quantity
router.put('/cart/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id; // Get from auth middleware
    
    const updatedCart = await Cart.findOneAndUpdate(
      { userId, "item._id": itemId },
      { $set: { "item.$.quantity": quantity } },
      { new: true }
    );
    
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Remove item from cart
router.delete('/cart/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;
    
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { item: { _id: itemId } } },
      { new: true }
    );
    
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
module.exports=router