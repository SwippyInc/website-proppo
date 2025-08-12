import axios from "axios";

const api = axios.create();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status == 401) {
    }
    return Promise.reject(error);
  }
)

export class DataService{
    constructor(){
        this.webhook_key = 'CHANGE_THIS_TO_SECURE_KEY'
    }
    
    async send_mail(obj){
        let url = `https://api.proppo.in/api/v1/notifications/email`
        let res = {status:'',message:''}
        try {
            let response = await api.post(url,obj,{headers:{ 'x-webhook-key': this.webhook_key ,'Content-Type':'application/json'}})
            if(response.status == 200){
                res.status = 'success'
            }
            res.message = response.data.message
        } catch (error) {
            res.message = error.response.data.message
        }
        return res
    }
}

let Data = new DataService()
export default Data




