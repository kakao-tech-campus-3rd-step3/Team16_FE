import axios from 'axios';

export type Alarm = {
  id: number;
  type: string;
  message: string;
  groupName: string;
  createdAt: string;
  action?: {
    label: string;
    url: string;
  };
};

export const getMockAlarms = async () => {
  const res = await axios.get<Alarm[]>('/public/data/notifications.json');
  return res.data;
};

// // 실제 API (아직 알림 조회 api가 없음..)
// export const getAlarms = async () => {
//   const res = await axios.get<Alarm[]>('/api/notifications');
//   return res.data;
// };
