import axios from "axios";
import { useToast } from "vue-toastification";
import numberToIDR from '../helper/numberToIDR'

async function getData(endPoint) {
    try {
        const {data} = await axios({
            method: 'get',
            url: import.meta.env.VITE_BASE_URL + endPoint,
            headers: {
                access_token: localStorage.getItem('access_token') 
            }
        })
        const fetched = data.data
        if (endPoint === '/lodgings') {
            fetched.forEach(el => {
                el.price = numberToIDR(el.price)
            })
        }
        return fetched
    } catch (err) {
        console.log(err)
        useToast().error('oh noose!')
    }
}

export default getData