const bcrypt = require('bcryptjs');
async function test() {
    try {
        await bcrypt.compare("password", "just_a_normal_string_not_a_hash");
    } catch(e) {
        console.log("Error name:", e.name);
        console.log("Error msg:", e.message);
    }
}
test();
