import axios from 'axios';

const url ="https://localhost:5001";

export const LoginUser = (value) => {
   return axios.post(`${url}/api/User/loginUser`,value);
}


export const LoginCompany = (value) => {
   return axios.post(`${url}/api/Company/loginCompany`,value);
}

export const AllPost = () => {
   return axios.post(`${url}/api/InternshipPosting/getAllPost`);
}

export const GetUserAppPost = (value) => {
   return axios.post(`${url}/api/ApplicationIntern/userApp`,value);
}

export const GetAllPositions = () => {
   return axios.post(`${url}/api/InternshipPosition/getAllPositions`);
}
export const AddPostApi = (values) => {
   return axios.post(`${url}/api/InternshipPosting/addPost`,values);
}
export const GetCompanyPosts = (values) => {
   return axios.post(`${url}/api/InternshipPosting/getByCompanyIdPost`,values);
}
export const AppIntern = (values) => {
   return axios.post(`${url}/api/ApplicationIntern/appIntern`,values);
}


