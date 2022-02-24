const response = require('../helpers/response');
const upload = require('../helpers/upload').single('image');

exports.updateUser = (req, res)=>{
  upload(req, res, async(err)=>{
    if(err){
      return response(res, err.message, null, 400);
    }
    let {id} = req.params;
    if(!id){
      id = req.user.id;
    }
    const dataName = ['name', 'username', 'email', 'password', 'role', 'phone_number', 'gender', 'birthdate', 'address'];
    const data = {};
    dataName.forEach(x=>{
      if(req.body[x]){
        data[x] = req.body[x];
      }
    });
    if(req.file){
      data.image = `${req.file.destination}${req.file.filename}`;
    }
    console.log(data);
  });
};