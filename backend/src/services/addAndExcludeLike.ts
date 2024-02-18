import client from "../config/client";

//FUNÇÃO MOMENTANEA

interface Like {
  createdAt: Date;
  updatedAt: Date;
  postId: string;
}

const handleLike = async (
  userId: string,
  postId: string
): Promise<Like | null> => {

  const exististPost = await client.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      likeCount: true,
    },
  });

  if(!exististPost){
    return null
  }

  let likeCount = exististPost.likeCount
    
  const existingLike = await client.like.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });

  if (existingLike) {
    await client.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    await client.post.update({where:{
      id: postId
    }, data:{
      likeCount: likeCount-1
    }})

    return null;
  }

  const newLike = await client.like.create({
    data: {
      postId: postId,
      userId: userId
    },
  });

  await client.post.update({where:{
    id: postId
  }, data:{
    likeCount: likeCount+1
  }})

  return newLike;
};

export { handleLike };
