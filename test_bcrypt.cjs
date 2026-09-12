const bcrypt = require('bcryptjs');
try {
    bcrypt.compareSync("password", "invalid_hash");
} catch(e) {
    console.log("Error:", e.message);
}
