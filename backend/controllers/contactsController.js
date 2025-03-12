const {client} = require('../lib/prisma.mjs');

async function getContacts(req, res, next) {
  const posts = await client.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
    },
  });

  res.status(200)
     .json({
       status: 200,
       data: posts,
       message: 'Вы успешно получили список пользователей',
     });
}

async function createContact(req, res, next) {
  const {title, body} = req.body;

  const post = await client.post.create({
    data: {
      title: title,
      body: body,
      created_at: new Date(),
    },
  });
  res.status(201)
     .json({
       message: 'Пост успешно создан',
       data: post,
     });
}

const deletePost = async (req, res, next) => {
 const {id} = req.params
  if (id) {
    const post = await client.post.delete({
      where:{
        id:+id
      }
    });
    res.status(204)
       .json({
         message: 'Пост успешно удален',
         data: post,
       });
  }

};

module.exports = {
  getContacts,
  createContact,
  deletePost,
};