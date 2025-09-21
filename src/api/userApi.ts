<<<<<<< HEAD
import axios from 'axios';

// 프로필 이미지 요청
export const fetchProfileImage = async () => {
  const res = await axios.get('/data/profile-image.json');
  return res.data.imageUrl;
=======
import { apiClient } from '@/api/apiClient';

// 프로필 이미지 요청
export const fetchProfileImageUrl = async () => {
  const res = await apiClient.get('/users/profile-image');
  return res.data.profileImageUrl;
>>>>>>> develop
};

// 닉네임 요청
export const fetchNickname = async () => {
<<<<<<< HEAD
  const res = await axios.get('/data/nickname.json');
  return res.data.nickname;
};
=======
  const res = await apiClient.get('/users/nickname');
  return res.data.nickname;
};

export const deleteProfileImg = async () => {
  await apiClient.delete('/users/profile-image');
};

export const updateNickname = async (nickname: string) => {
  await apiClient.put('/users/nickname', { nickname });
  return nickname;
};

export const updateUserProfileImg = async () => {
  const res = await apiClient.put('/users/profile-image');
  return res.data;
};
>>>>>>> develop
