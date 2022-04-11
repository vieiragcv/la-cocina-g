const router = require('express').Router();

const { User } = require('../../models');

/*---------------------------------------------------------------
-                         GET ALL USERS PROFILES
---------------------------------------------------------------*/

router.get('/', async (req, res) => {
  try {
      const userdata = await User.findAll();
      res.status(200).json(userdata);
  } catch (err) {
      res.status(500).json(err);
  }
});

/*---------------------------------------------------------------
-                       GET 1 USER PROFILE
---------------------------------------------------------------*/

router.get('/:id', (req, res) => {
    User.findOne({
      where:{
        id: req.params.id
      },
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});
      
/*---------------------------------------------------------------
-                      UDPATE USER PROFILE
---------------------------------------------------------------*/

router.put("/:id", (req, res) => {
  User.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      user_name: req.body.user_name,
      secret_key: req.body.secret_key,
    },
    {
    where: {
      id: req.params.id
    }
   })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});  

/*---------------------------------------------------------------
-                       DELETE 1 USER PROFILE
---------------------------------------------------------------*/

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})

/*---------------------------------------------------------------
-                      CREATE USER PROFILE
---------------------------------------------------------------*/

router.post('/', async (req, res) => {

  try{
    const newUser = await User.create({
      
      user_name: req.body.user_name,
      email: req.body.email,
      secret_key: req.body.secret_key
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

/*---------------------------------------------------------------
-                      USER LOGIN
---------------------------------------------------------------*/

router.post('/login', async (req, res) => {

  try{
    const newLogin = await User.findOne({
      where: {
        email: req.body.email
      },
      
    });
    const validPassword = await newLogin.checkPassword(req.body.secret_key);
    req.session.save(() => {
      
      req.session.loggedIn = true;
      req.session.user_id = newLogin.id;
      res.status(200).json(newLogin);
      
    });
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

/*---------------------------------------------------------------
-                      USER LOGOUT
---------------------------------------------------------------*/

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

module.exports = router;