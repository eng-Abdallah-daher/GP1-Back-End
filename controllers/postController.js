const Post = require('../models/postModel');

const PostController = {
    create: async (req, res) => {
        try {
            const postData = req.body;
            const result = await Post.create(postData);
            res.status(201).json({ message: 'Post created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const posts = await Post.getAll();
            res.status(200).json({ message: 'Posts retrieved successfully', data: posts });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving posts', error });
        }
    },
    getById: async (req, res) => {
        try {
            const postId = req.params.id;
            const post = await Post.getById(postId);
            if (post) {
                res.status(200).json({ message: 'Post retrieved successfully', data: post });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving post', error });
        }
    },
    update: async (req, res) => {
        try {
            const postId = req.params.id;
            const postData = req.body;
            const result = await Post.update(postId, postData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Post updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating post', error });
        }
    },
    delete: async (req, res) => {
        try {
            const postId = req.params.id;
            const result = await Post.delete(postId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Post deleted successfully' });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting post', error });
        }
    },
    addLike: async (req, res) => {
        try {
            const postId = req.params.id;
            const userId = req.body.userId; 
            const result = await Post.addLike(postId, userId);
            res.status(200).json({ message: 'Like added successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error adding like', error });
        }
    },
    addComment: async (req, res) => {
        try {
            const postId = req.params.id;
            const commentData = req.body; 
            const result = await Post.addComment(postId, commentData);
            res.status(200).json({ message: 'Comment added successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error adding comment', error });
        }
    },
     removelike: async (req, res) => {
        try {
           const id = req.params.id;
           const userId = req.params.id2;
            
           
 
            const result = await Post.removeLike(id, userId);
            res.status(200).json({ message: 'like removed successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error adding like', error });
        }
    },  addReply: async (req, res) => {
        try {
            const postId = req.params.postId;
            const commentId = req.params.commentId;
            const replyData = req.body;
            const result = await Post.addReply(postId, commentId, replyData);

            res.status(200).json({ message: 'Reply added successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error adding reply', error });
        }
    },
     removeComment: async (req, res) => {
    try {
      const postId = req.params.id; 
      const commentId = parseInt(req.params.commentId); 
      const result = await Post.removeComment(postId, commentId);

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json({ message: 'Comment removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error removing comment', error: error.message });
    }
  },
    updateComment: async (req, res) => {
    try {
      const postId = req.params.postId;
      const commentId = parseInt(req.params.commentId);
      const newText = req.body.text;

      if (!newText) {
        return res.status(400).json({ message: 'New text is required' });
      }

      const result = await Post.updateComment(postId, commentId, newText);

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json({ message: 'Comment updated successfully', data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
  },
  updateReply: async(req, res)=> {
  try {
    const { postId, commentId, replyId } = req.params;
    const { newText } = req.body;
    const result = await Post.editReply(postId, commentId, replyId, newText);
    
    res.status(200).json({ message: 'Reply updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reply', error });
  }
}

};

module.exports = PostController;
