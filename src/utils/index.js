import { differenceInMinutes, parseISO } from "date-fns";

export const isLikedByMe = (likes, currentUser) => {
  return likes.includes(currentUser);
};

export const isSavedByMe = (postsId, id) => {
  return postsId.includes(id);
};

export const isFollwingByMe = (followingUser, currentUser) => {
  return followingUser.includes(currentUser);
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
