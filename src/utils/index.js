export const isLikedByMe = (likes, currentUser) => {
  return likes.includes(currentUser);
};

export const isSavedByMe = (postsId, id) => {
  return postsId.includes(id);
};
