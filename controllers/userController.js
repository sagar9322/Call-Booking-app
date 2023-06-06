const userDetail = require('../model/details');

exports.addUserDetails = (req, res, next)=>{
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const date = req.body.date;
  const time = req.body.time;
  userDetail.create({
    name: name,
    email: email,
    phone: phone,
    date: date,
    time: time
  })
  .then(result => {
    // console.log(result);
    console.log('Created Product');
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  });
}

exports.getUserDetails = (req, res, next)=> {
  userDetail.findAll()
  .then(products => {
    res.setHeader('Content-Type', 'text/html');
    res.send(JSON.stringify(products)); 
  })
  .catch(err => {
    console.log(err);
  });
}

exports.deleteUserDetail = (req, res, next) => {
  const prodId = req.params.productId;
  userDetail.findAll({where: {id: prodId}})
    .then(user => {
      return user[0].destroy();
    })
    .then(result => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
  
}

