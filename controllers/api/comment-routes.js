const router = require('express').Router();
const { Comment } = require('../../models');

/*---------------------------------------------------------------
-                     GET ALL RECIPES for specific user
---------------------------------------------------------------*/

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

/*---------------------------------------------------------------
-                         CREATE COMMENT
---------------------------------------------------------------*/

router.post('/', async (req, res) => {
    try {
        const createdComment = await Comment.create({
            user_id: req.session.user_id,
            recipe_id: req.body.recipe_id,
            comment_text: req.body.comment_text
        });
        res.status(200).json(createdComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

/*---------------------------------------------------------------
-                         DELETE COMMENT
---------------------------------------------------------------*/

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(400).json({ message: 'There is not a comment with that id.'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }

});

/*---------------------------------------------------------------
-                         EDIT COMMENT
---------------------------------------------------------------*/

router.patch('/recipe/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update({
          comment: req.body.comment  
        });
        Comment.save();
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(400).json(err);
    }
});
 
module.exports = router;

