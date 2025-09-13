import axios from 'axios';

// 프로필 이미지 요청
export const fetchProfileImage = async () => {
  const res = await axios.get('/data/profile-image.json');
  return res.data.imageUrl;
};

// 닉네임 요청
export const fetchNickname = async () => {
  const res = await axios.get('/data/nickname.json');
  return res.data.nickname;
};
