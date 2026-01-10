import mongoose from 'mongoose';
import Sale from './server/models/Sale.js';
import Branch from './server/models/Branch.js';
import Product from './server/models/Product.js';
import User from './server/models/User.js';

async function createDemo() {
  try {
    await mongoose.connect('mongodb://localhost:27017/kumar-paints-erp');
    const branches = await Branch.find();
    const products = await Product.find();
    const user = await User.findOne();

    console.log(`Found ${branches.length} branches, ${products.length} products, user: ${user ? user.email : 'none'}`);

    if (branches.length && products.length && user) {
      for (let i = 0; i < 5; i++) {
        const sale = await Sale.create({
          invoiceNumber: `DEMO-${i+1}`,
          date: new Date(),
          customerName: `Demo Customer ${i+1}`,
          customerGST: `22AAAAA0000A${i+1}`,
          items: [{
            product: products[0]._id,
            quantity: 2,
            rate: products[0].sellingPrice,
            gstRate: products[0].gstRate,
            gstAmount: (products[0].sellingPrice * 2 * products[0].gstRate) / 100,
            total: products[0].sellingPrice * 2 * (1 + products[0].gstRate / 100)
          }],
          subtotal: products[0].sellingPrice * 2,
          gstTotal: (products[0].sellingPrice * 2 * products[0].gstRate) / 100,
          grandTotal: products[0].sellingPrice * 2 * (1 + products[0].gstRate / 100),
          branch: branches[0]._id,
          createdBy: user._id
        });
        console.log(`Created sale ${sale.invoiceNumber}`);
      }
    }
    mongoose.connection.close();
  } catch (e) {
    console.error(e);
    mongoose.connection.close();
  }
}

createDemo();
