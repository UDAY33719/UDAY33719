import mongoose from 'mongoose';
import Unit from './server/models/Unit.js';
import dotenv from 'dotenv';

dotenv.config();

async function addUnits() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kumar-paints-erp');
    console.log('Connected to MongoDB');

    // Define units to add
    const unitsToAdd = [
      { name: 'Litre', abbreviation: 'L', isActive: true },
      { name: 'Kilogram', abbreviation: 'kg', isActive: true },
      { name: 'Gallon', abbreviation: 'gal', isActive: true },
      { name: 'Piece', abbreviation: 'pcs', isActive: true },
      { name: 'Meter', abbreviation: 'm', isActive: true }
    ];

    for (const unitData of unitsToAdd) {
      // Check if unit already exists
      const existing = await Unit.findOne({ name: unitData.name });
      if (!existing) {
        await Unit.create(unitData);
        console.log(`✅ Created unit: ${unitData.name}`);
      } else {
        console.log(`⚠️  Unit already exists: ${unitData.name}`);
        // Ensure it's active
        if (!existing.isActive) {
          existing.isActive = true;
          await existing.save();
          console.log(`✅ Activated unit: ${unitData.name}`);
        }
      }
    }

    // List all active units
    const allActiveUnits = await Unit.find({ isActive: true });
    console.log('\n📋 All active units:');
    allActiveUnits.forEach(unit => {
      console.log(`  - ${unit.name} (${unit.abbreviation}) - ID: ${unit._id}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Done');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

addUnits();
