import mongoose from 'mongoose';
import Unit from './server/models/Unit.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedUnits() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kumar-paints-erp');
    console.log('Connected to MongoDB');

    // Check existing units
    const existingUnits = await Unit.find({});
    console.log('Existing units:', existingUnits.length);

    // Define standard units
    const standardUnits = [
      { name: 'Litre', abbreviation: 'L', isActive: true },
      { name: 'Kilogram', abbreviation: 'kg', isActive: true },
      { name: 'Gallon', abbreviation: 'gal', isActive: true },
      { name: 'Piece', abbreviation: 'pcs', isActive: true },
      { name: 'Meter', abbreviation: 'm', isActive: true }
    ];

    // Create units if they don't exist
    for (const unitData of standardUnits) {
      const existing = await Unit.findOne({ name: unitData.name });
      if (!existing) {
        await Unit.create(unitData);
        console.log(`Created unit: ${unitData.name}`);
      } else {
        // Ensure it's active
        if (!existing.isActive) {
          existing.isActive = true;
          await existing.save();
          console.log(`Activated unit: ${unitData.name}`);
        }
      }
    }

    // Get all active units
    const activeUnits = await Unit.find({ isActive: true });
    console.log('Active units after seeding:', activeUnits.length);
    activeUnits.forEach(unit => {
      console.log(`- ${unit.name} (${unit.abbreviation})`);
    });

    await mongoose.disconnect();
    console.log('Done');
  } catch (error) {
    console.error('Error:', error);
  }
}

seedUnits();
