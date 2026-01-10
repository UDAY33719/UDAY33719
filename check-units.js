import mongoose from 'mongoose';
import Unit from './server/models/Unit.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkUnits() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kumar-paints-erp');
    console.log('Connected to MongoDB');

    const allUnits = await Unit.find({});
    console.log('All units in database:', allUnits.length);
    allUnits.forEach(unit => {
      console.log(`- ${unit.name} (${unit.abbreviation}) - Active: ${unit.isActive}`);
    });

    const activeUnits = await Unit.find({ isActive: true });
    console.log('\nActive units:', activeUnits.length);
    activeUnits.forEach(unit => {
      console.log(`- ${unit.name} (${unit.abbreviation})`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUnits();
