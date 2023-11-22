import axios from "axios"
import { defineStore } from "pinia"
import { useCustomerStore } from "./customer"
import { useToast_ErrorAxios, useToast_SuccessAxios } from "../helper/useToast"

export const useLodgingsStore = defineStore("lodging", {
    state: () => ({
        lodgings: [],
        size: 8,
        totalItems: 0,
        currentPage: 1,
        totalPages: 0,
        types: [],
        queriedType: { id: null, name: null },
        queryParams: {},
        queriedLodgingDetail: {}
    }),
    actions: {
        async fetchLodgings() {
            try {
                let url = import.meta.env.VITE_BASE_URL + `/lodgings`

                this.queryParams.page = this.currentPage
                if (this.queriedType.id)
                    this.queryParams.typeId = this.queriedType.id

                const { data } = await axios({
                    method: "GET",
                    url,
                    params: this.queryParams,
                })
                this.lodgings = data.data
                this.totalItems = data.totalItems
                this.totalPages = data.totalPages
            } catch (err) {
                console.log(err)
            }
        },
        async fetchNextPage() {
            this.currentPage =
                this.currentPage >= this.totalPages ? 1 : this.currentPage + 1
            await this.fetchLodgings()
        },
        async fetchPrevPage() {
            this.currentPage =
                this.currentPage <= 1 ? this.totalPages : this.currentPage - 1
            await this.fetchLodgings()
        },
        async fetchPage(i) {
            this.currentPage = i
            await this.fetchLodgings()
        },
        async fetchTypes() {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: import.meta.env.VITE_BASE_URL + `/types`,
                })
                this.types = data.data
            } catch (err) {
                console.log(err)
            }
        },
        async filterByType(id, name) {
            if (id === null) delete this.queryParams.typeId
 
            this.queriedType.id = id
            this.queriedType.name = name
            
            await this.fetchLodgings()
        },
        async getLodgingById(id) {
            try {
                const queriedLodgingRes = await axios({
                    method: "GET",
                    url: import.meta.env.VITE_BASE_URL + `/lodgings/${id}`,
                })
                this.queriedLodgingDetail = {
                    ...queriedLodgingRes.data.data,
                }
            } catch (err) {
                console.log(err)
            }
        },
        async getLodgingQR(id) {
            try {
                const qrCodeRes = await axios({
                    method: "GET",
                    url: import.meta.env.VITE_BASE_URL + `/lodgings/${id}/qrCode`,
                })
                this.queriedLodgingDetail.QR = qrCodeRes.data
            } catch (err) {
                console.log(err)
            }  
        },
        async addToWishList(lodgingId) {
            if (!useCustomerStore().isLoggedIn) {
                useToast_ErrorAxios('', 'Please sign in to be able to add wishlist!')
                return this.router.push({name: 'signIn'}) 
            }
            try {
                const {data} = await axios({
                    method: 'POST',
                    url: import.meta.env.VITE_BASE_URL + '/wishlists',
                    headers: {access_token: useCustomerStore().isLoggedIn},
                    data: {lodgingId}
                })
                useToast_SuccessAxios(data.message)
                console.log(data)
            } catch (err) {
                useToast_ErrorAxios('', 'There is a problem in adding wishlist!')
                console.log(err)
            }
        }
    },
})
