const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://leonardoghibaudolg_db_user:kcW0XUGJJV7QsgHq@piccolescelte.wfy9fpq.mongodb.net/?appName=PiccoleScelte');

const PatientSchema = new mongoose.Schema({}, { strict: false });
const Patient = mongoose.model('Patient', PatientSchema);

(async () => {
  const patients = await Patient.find({});
  patients.forEach(p => {
    console.log(p.id, p.unlockedScenarios?.length, "scenarios");
    if (p.unlockedScenarios?.includes('scen-family-siblings-1')) {
      console.log("  -> Has chapter 29 unlocked!");
    }
  });
  process.exit(0);
})();
