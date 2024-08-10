import { differenceInMinutes, parseISO } from "date-fns";

export const isLikedByMe = (likes, currentUser) => {
  const userLikes = likes.map((like) => like.user.username);
  console.log("userLikes", userLikes);
  console.log(
    "userLikes.includes(currentUser)",
    userLikes.includes(currentUser)
  );
  return userLikes.includes(currentUser);
};

export const isSavedByMe = (postsId, id) => {
  return postsId.includes(id);
};

export const isFollwingByMe = (followingUser, currentUser) => {
  const userFound = followingUser.filter(
    (user) => user.username === currentUser.username
  );
  console.log("userFound", userFound.length > 0);
  return userFound.length > 0;
};

export const isFollowingByMe2 = (followingUser, currentUser) => {
  const userFound = followingUser.filter(
    (user) => user.username === currentUser.username
  );
  console.log("userFound", userFound.length > 0);
  return userFound.length > 0;
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const createdAtDate = parseISO(date);

  const minutes = differenceInMinutes(now, createdAtDate);

  if (minutes < 60) {
    return `${minutes}m`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  } else {
    const days = Math.ceil(minutes / 1440);
    return `${days}d`;
  }
};
