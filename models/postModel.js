const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Post = {
    create: async (postData) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.insertOne(postData);
            return result;
        } catch (err) {
            console.error("Error creating post:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            return await postsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all posts:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            return await postsCollection.findOne({id: Number(id) });
        } catch (err) {
            console.error("Error retrieving post by ID:", err);
        }
    },
    update: async (id, postData) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                {id: Number(id) },
                { $set: postData }
            );
            return result;
        } catch (err) {
            console.error("Error updating post:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.deleteOne({ id: Number(id)});
            return result;
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    },
addLike: async (id, userId) => {
    try {
        const db = client.db("gp1");
        const postsCollection = db.collection('Post');
        const result = await postsCollection.updateOne(
            { id: Number(id) },
            {
                $addToSet: { likes: userId }, 
                $inc: { likeCount: 1 }     
            }
        );
        return result;
    } catch (err) {
        console.error("Error adding like:", err);
    }
},

    addComment: async (id, commentData) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                { id: Number(id) },
                { $push: { comments: commentData },
            $inc: { commentCount: 1 } }
            );
            return result;
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    },
   
    updateComment: async (postId, commentId, updatedCommentData) => {
        try {
            
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                { id: Number(postId), "comments.commentid": commentId },
                { $set: { "comments.$.text": updatedCommentData } }
            );
            return result;
        } catch (err) {
            console.error("Error updating comment:", err);
        }
    },    addReply: async (postId, commentId, replyData) => {
        try {
            const db = client.db("gp1"); 
            const postsCollection = db.collection('Post');
           
            const result = await postsCollection.updateOne(
                { id: Number(postId), 'comments.commentid': Number(commentId) }, 
                { $push: { 'comments.$.replies': replyData },
            $inc: { commentCount: 1 } } 
            );
            
            return result;
        } catch (err) {
            console.error("Error adding reply:", err);
            throw err;
        }
    },
 removeLike: async (id, userId) => {
    try {
      
        const db = client.db("gp1");
        const postsCollection = db.collection('Post');
        const result = await postsCollection.updateOne(
            { id: Number(id) },
            {
                $pull: { likes: Number(userId )}, 
                $inc: { likeCount: -1 }  
            }
        );

        return result;
    } catch (err) {
        console.error("Error removing like:", err);
    }
}, removeComment: async (id, commentId) => {
    try {
      const db = client.db("gp1");
      const postsCollection = db.collection('Post');
      const result = await postsCollection.updateOne(
        { id: Number(id) },
        { $pull: { comments: { commentid: Number(commentId) } }, $inc: { commentCount: -1 } }
      );
      return result;
    } catch (err) {
      console.error("Error removing comment:", err);
    }
  },
  editReply:async(postId, commentId, replyId, newText) =>{

  try {
    
    const db = client.db('gp1');
    const postsCollection = db.collection('Post');
    const result = await postsCollection.updateOne(
      { id: Number(postId), 'comments.commentid': Number(commentId), 'comments.replies.commentid': Number(replyId) },
      { $set: { 'comments.$[comment].replies.$[reply].text': newText } },
      { arrayFilters: [{ 'comment.commentid': Number(commentId) }, { 'reply.commentid': Number(replyId) }] }
    );
    return result;
  } catch (error) {
    console.error("Error updating reply:", error);
  } finally {
    
  }

  },
 removeReply: async (postId, commentId, replyId) => {
  try {
   
    const db = client.db('gp1');
    const postsCollection = db.collection('Post');

    const result = await postsCollection.updateOne(
      { id: Number(postId), 'comments.commentid': Number(commentId) },
      { 
        $pull: { 'comments.$.replies': { commentid: Number(replyId) } }
      }
    );

    if (result.modifiedCount === 0) {
      throw new Error('Reply not found');
    }
      await postsCollection.updateOne(
          { id: Number(postId) },
          { $inc: { commentCount: -1 } }
        );

    return result;
  } catch (error) {
    console.error("Error removing reply:", error);
  }
}


}

module.exports = Post;
