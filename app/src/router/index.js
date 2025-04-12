import { createRouter, createWebHistory } from 'vue-router'
import OrganizationList from '../components/OrganizationList.vue'
import OrganizationCreate from '../components/OrganizationCreate.vue'
import OrganizationEdit from '../components/OrganizationEdit.vue'

const routes = [
    {
        path: '/organizations',
        name: 'organizations',
        component: OrganizationList
    },
    {
        path: '/organizations/new',
        name: 'create-organization',
        component: OrganizationCreate
    },
    {
        path: '/organizations/edit/:id',
        name: 'edit-organization',
        component: OrganizationEdit
    },
    {
        path: '/',
        redirect: '/organizations'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router