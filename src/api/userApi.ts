import { apiClient } from '@/api/apiClient';

// 프로필 이미지 요청
export const fetchProfileImageUrl = async () => {
  const res = await apiClient.get('/users/profile-image');
  return res.data.profileImageUrl;
};

// 닉네임 요청
export const fetchNickname = async () => {
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

//유저 정보 요청 api
export const getUserInfo = async () => {
  const res = await apiClient.get(`/users/me`);
  return res.data;
};
