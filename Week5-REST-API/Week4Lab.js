// Supporting CRUD functions for the Week 5 REST API lab.
// Uses the employee fields name, age, gender and salary from the lab manual.

function createCrudFunctions(mongoose) {
  const personSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, required: true, trim: true },
    salary: { type: Number, required: true, min: 0 }
  }, { timestamps: true });

  const Person = mongoose.models.Person || mongoose.model('Person', personSchema);

  return {
    insertOne: (name, age, gender, salary) =>
      Person.create({ name, age: Number(age), gender, salary: Number(salary) }),

    insertMany: (people) => Person.insertMany(people),

    findAll: () => Person.find().lean(),

    findFemalesOver30: () =>
      Person.find({ gender: /^female$/i, age: { $gte: 30 } }).lean(),

    countDocuments: () => Person.countDocuments(),

    updateManyPersons: (filter, update) => {
      // Only update fields supplied by the client; never allow updates to MongoDB operators.
      const safeUpdate = update.$set ? update.$set : update;
      return Person.updateMany(filter, { $set: safeUpdate });
    },

    deleteManyPersons: (filter) => Person.deleteMany(filter)
  };
}

module.exports = { createCrudFunctions };
