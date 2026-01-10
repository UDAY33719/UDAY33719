import mongoose from './server/models/Sale.js';
import dotenv from 'dotenv';
import Sale from './server/models/Sale.js';
import Stock from './server/models/Stock.js';
import JournalEntry from './server/models/JournalEntry.js';
import Ledger from './server/models/Ledger.js';
import Branch from './server/models/Branch.js';
import Product from './server/models/Product.js';
import User from './server/models/User.js';
import { config } from './server/config/env.js';

// Load environment variables
dotenv.config();

const generateDemoSales = async () => {
  try {
    console.log('Starting demo sales data generation...');

    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB Connected');

    // Get existing data
    const branches = await Branch.find();
    const products = await Product.find();
    const user = await User.findOne({ email: 'admin@kumar.com' });

    if (!branches.length || !products.length || !user) {
      console.error('Required data not found. Run seed.js first.');
      return;
    }

    const mainBranch = branches.find(b => b.name === 'Main Branch');
    const godownBranch = branches.find(b => b.name === 'Godown');

    if (!mainBranch || !godownBranch) {
      console.error('Required branches not found');
      return;
    }

    // Clear existing demo sales (keep any real sales)
    await Sale.deleteMany({ invoiceNumber: { $regex: '^DEMO-' } });
    console.log('Cleared existing demo sales');

    // Generate 30 days of sales data
    const salesData = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    for (let i = 0; i < 30; i++) {
      const saleDate = new Date(startDate);
      saleDate.setDate(startDate.getDate() + i);

      // Randomly choose branch (60% Main Branch, 40% Godown)
      const branch = Math.random() < 0.6 ? mainBranch : godownBranch;

      // Random number of items (1-3)
      const numItems = Math.floor(Math.random() * 3) + 1;
      const selectedProducts = [];

      // Select random products
      for (let j = 0; j < numItems; j++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        if (!selectedProducts.find(p => p._id.equals(randomProduct._id))) {
          selectedProducts.push(randomProduct);
        }
      }

      // Generate sale items
      const items = [];
      let subtotal = 0;
      let gstTotal = 0;

      for (const product of selectedProducts) {
        // Random quantity (1-10)
        const quantity = Math.floor(Math.random() * 10) + 1;
        const rate = product.sellingPrice;
        const gstRate = product.gstRate;

        const gstAmount = (rate * quantity * gstRate) / 100;
        const total = (rate * quantity) + gstAmount;

        items.push({
          product: product._id,
          quantity,
          rate,
          gstRate,
          gstAmount,
          total
        });

        subtotal += rate * quantity;
        gstTotal += gstAmount;
      }

      const grandTotal = subtotal + gstTotal;

      // Create sale data
      const saleData = {
        invoiceNumber: `DEMO-${String(i + 1).padStart(3, '0')}`,
        date: saleDate,
        customerName: `Demo Customer ${i + 1}`,
        customerGST: `22AAAAA0000A${String(i + 1).padStart(3, '0')}`,
        items,
        subtotal,
        gstTotal,
        grandTotal,
        branch: branch._id,
        createdBy: user._id
      };

      salesData.push(saleData);
    }

    // Insert sales and update related data
    for (const saleData of salesData) {
      // Create sale
      const sale = await Sale.create(saleData);

      // Update stock
      for (const item of saleData.items) {
        await Stock.findOneAndUpdate(
          { product: item.product, branch: saleData.branch },
          {
            $inc: { quantity: -item.quantity },
            $set: { lastUpdated: new Date() }
          },
          { new: true }
        );
      }

      // Create journal entries
      const cashLedger = await Ledger.findOne({ name: 'Cash', branch: saleData.branch });
      const salesLedger = await Ledger.findOne({ name: 'Sales', branch: saleData.branch });
      const gstOutputLedger = await Ledger.findOne({ name: 'GST Output', branch: saleData.branch });

      if (cashLedger && salesLedger) {
        // Journal entry for sales revenue
        await JournalEntry.create({
          voucherNumber: `JV-${saleData.invoiceNumber}`,
          date: saleData.date,
          debitLedger: cashLedger._id,
          creditLedger: salesLedger._id,
          amount: saleData.subtotal,
          narration: `Sale invoice ${saleData.invoiceNumber} - Sales revenue`,
          branch: saleData.branch,
          createdBy: saleData.createdBy
        });

        // Update ledger balances
        await Ledger.findByIdAndUpdate(
          cashLedger._id,
          { $inc: { balance: saleData.grandTotal } }
        );

        await Ledger.findByIdAndUpdate(
          salesLedger._id,
          { $inc: { balance: saleData.subtotal } }
        );

        // GST entry
        if (saleData.gstTotal > 0 && gstOutputLedger) {
          await JournalEntry.create({
            voucherNumber: `JV-${saleData.invoiceNumber}-GST`,
            date: saleData.date,
            debitLedger: cashLedger._id,
            creditLedger: gstOutputLedger._id,
            amount: saleData.gstTotal,
            narration: `Sale invoice ${saleData.invoiceNumber} - GST output`,
            branch: saleData.branch,
            createdBy: saleData.createdBy
          });

          await Ledger.findByIdAndUpdate(
            gstOutputLedger._id,
            { $inc: { balance: saleData.gstTotal } }
          );
        }
      }
    }

    console.log(`✅ Generated ${salesData.length} demo sales for the past 30 days`);

    // Verify stock levels are reasonable
    const stockSummary = await Stock.find().populate('product', 'name').populate('branch', 'name');
    console.log('Current stock levels:');
    stockSummary.forEach(stock => {
      console.log(`  ${stock.product.name} (${stock.branch.name}): ${stock.quantity} units`);
    });

    // Verify ledger balances
    const ledgers = await Ledger.find().populate('branch', 'name');
    console.log('Current ledger balances:');
    ledgers.forEach(ledger => {
      console.log(`  ${ledger.name} (${ledger.branch?.name}): ₹${ledger.balance}`);
    });

  } catch (error) {
    console.error('Demo sales generation error:', error);
  } finally {
    mongoose.connection.close();
  }
};

generateDemoSales();
