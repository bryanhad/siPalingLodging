<script>
// components
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import SideBar from './components/sideBar/SideBar.vue';
import PageTitle from './components/PageTitle.vue'
import MiniUser from './components/MiniUser.vue'
import Loading from './components/Loading.vue';
// pages
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Home from './pages/Home.vue';
import LodgingsPage from './pages/Lodgings.vue';
import TypesPage from './pages/Types.vue';
import HistoriesPage from './pages/Histories.vue';
import AddLodgingPage from './pages/AddLodging.vue';
import EditLodging from './pages/EditLodging.vue';
// helper
import capitalizeFirstLetter from './helper/capitalizeFirstLetter'
import getData from './helper/getData';

export default {
    components: {
    Navbar,
    Footer,
    Login,
    Register,
    Home,
    SideBar,
    PageTitle,
    MiniUser,
    LodgingsPage,
    TypesPage,
    HistoriesPage,
    AddLodgingPage,
    EditLodging,
    Loading
},
    data() {
        return {
            currentPage: localStorage.getItem('currentPage'),
            loggedIn: localStorage.getItem('access_token'),
            data: {},
        }
    },
    methods: {
        changePage(destination) {
            if (!Array.isArray(destination)) {
                this.currentPage = capitalizeFirstLetter(destination)
                localStorage.setItem('currentPage', this.currentPage)
            } else {
                const [destinationPage, arg] = destination
                switch(destinationPage) {
                    case 'Edit Lodging':
                        localStorage.setItem('editLodging', arg)
                        this.currentPage = capitalizeFirstLetter(destinationPage)
                        localStorage.setItem('currentPage', this.currentPage)
                    default: return
                }
            }
            this.loggedIn = localStorage.getItem('access_token')
        },
        login() {
            this.loggedIn = localStorage.getItem('access_token')
            this.fetchData()
        },
        async fetchData() {
            const lodgings = await getData('/lodgings')
            const types = await getData('/types')
            const userCount = await getData('/user-count')
            const histories = await getData('/histories')
            this.data = {
                lodgings, types, userCount, histories
            }
        },
        async updateLodgings() {
            const histories = await getData('/histories')
            const lodgings = await getData('/lodgings')
            this.data.lodgings = lodgings
            this.data.histories = histories
        },
        async updateTypes() {
            const types = await getData('/types')
            this.data.types = types
        },
        async updateHistory() {
            const histories = await getData('/histories')
            this.data.histories = histories
        }
    },
    async created() {
        if (!localStorage.getItem('currentPage')) {
            localStorage.setItem('currentPage', 'Login')
        }
        if (this.loggedIn) {
            await this.fetchData()
        }
    }
}

</script>

<template>
    <div v-if="!loggedIn" class="min-h-screen flex flex-col">
        <Navbar/>
        <main class="flex-[1] max-w-[1240px] w-full mx-auto py-12">
            <Login 
                v-if="currentPage === 'Login'" 
                v-on:changePage="changePage" 
                v-on:login="login"
            />
            <Register 
                v-if="currentPage === 'Register'" 
                v-on:changePage="changePage"
                v-on:login="login"
            />
        </main>
        <Footer/>
    </div>
    <div v-else-if="loggedIn" class="min-h-screen flex flex-col lg:flex-row">
        <SideBar v-on:changePage="changePage" :currentPage="currentPage"/>
        <main class="flex-[1] bg-slate-100 p-6 lg:ml-[250px] flex flex-col">
            <header class="flex justify-between mb-4 p-4 shadow-sm bg-white rounded-md">
                <PageTitle :title="currentPage"/>
                <MiniUser/>
            </header>
            <Home v-if="currentPage === 'Dashboard'" :data="data"/>
            <LodgingsPage 
                v-if="currentPage === 'Lodgings'" 
                :lodgings="data.lodgings"
                v-on:changePage="changePage"
                v-on:updateLodgings="updateLodgings"
                v-on:updateHistory="updateHistory"
            />
            <TypesPage 
                v-if="currentPage === 'Types'" 
                :types="data.types"
                v-on:updateTypes="updateTypes"
                v-on:updateLodgings="updateLodgings"
            />
            <HistoriesPage 
                v-if="currentPage === 'History'" 
                :histories="data.histories"
            />
            <AddLodgingPage
                v-if="currentPage === 'Add Lodging'"
                :types="data.types"
                v-on:changePage="changePage"
                v-on:updateLodgings="updateLodgings"
            />
            <EditLodging
                v-if="currentPage === 'Edit Lodging'"
                v-on:changePage="changePage"
                v-on:updateLodgings="updateLodgings"
                :types="data.types"
            />
        </main>
    </div>
</template>