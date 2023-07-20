
import { IEmail } from '@/app/api/email';
import { axios } from './axios';


export async function sendEmail(data: IEmail) {
  const res = await axios.post<IEmail>('/email', data);
  return res.data;
}