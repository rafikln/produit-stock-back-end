import mongoose from "mongoose";

const produitShema= new mongoose.Schema(
    {
        nom :
        {
            type : 'String',
            unique : true,
        },
        description  :
        {
        type :'String',
        },
        quantite :
        {
            type : Number 
        },
        prix :
        {
            type : Number 
        }

    }
)
produitShema.methods.toJSON = function(){

    const produit=this.toObject();
    delete produit.__v;
    produit.id=produit._id;
    delete produit._id;
    return produit;
}
export default mongoose.model("Product",produitShema)