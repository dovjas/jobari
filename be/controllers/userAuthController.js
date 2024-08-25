
//Create a new user
exports.createUser = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const userRecord = await admin.auth().createUser({
          email,
          password,
        });
        res.status(201).json(userRecord);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};