import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import OrganizationList from '../components/organization/OrganizationList.vue'
import OrganizationCreate from '../components/organization/OrganizationCreate.vue'
import OrganizationEdit from '../components/organization/OrganizationEdit.vue'

import DepartmentList from '../components/department/DepartmentList.vue'
import DepartmentCreate from '../components/department/DepartmentCreate.vue'
import DepartmentEdit from '../components/department/DepartmentEdit.vue'

import PositionList from '../components/position/PositionList.vue'
import PositionCreate from '../components/position/PositionCreate.vue'
import PositionEdit from '../components/position/PositionEdit.vue'

import EmployeeList from '../components/employee/EmployeeList.vue'
import EmployeeForm from '../components/employee/EmployeeForm.vue'

import HROperationsList from '../components/hrOperations/HROperationsList.vue'
import HROperationForm from '../components/hrOperations/HROperationForm.vue'

import UserList from '../components/user/UserList.vue';
import UserForm from '../components/user/UserForm.vue';

import ChangeHistoryList from '../components/changeHistory/ChangeHistoryList.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
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
        path: '/departments',
        name: 'departments',
        component: DepartmentList
    },
    {
        path: '/departments/new',
        name: 'create-department',
        component: DepartmentCreate
    },
    {
        path: '/departments/edit/:id',
        name: 'edit-department',
        component: DepartmentEdit
    },
    {
        path: '/positions',
        name: 'positions',
        component: PositionList
    },
    {
        path: '/positions/new',
        name: 'create-position',
        component: PositionCreate
    },
    {
        path: '/positions/edit/:id',
        name: 'edit-position',
        component: PositionEdit
    },
    {
        path: '/employees',
        name: 'EmployeeList',
        component: EmployeeList
    },
    {
        path: '/employees/new',
        name: 'EmployeeCreate',
        component: EmployeeForm
    },
    {
        path: '/employees/edit/:id',
        name: 'EmployeeEdit',
        component: EmployeeForm,
    },
    {
        path: '/hr-operations',
        name: 'hr-operations',
        component: HROperationsList
    },
    {
        path: '/hr-operations/new',
        name: 'create-hr-operation',
        component: HROperationForm
    },
    {
        path: '/hr-operations/edit/:id',
        name: 'edit-hr-operation',
        component: HROperationForm,
    },
    {
        path: '/users',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/users/create',
        name: 'UserCreate',
        component: UserForm
    },
    {
        path: '/users/edit/:id',
        name: 'UserEdit',
        component: UserForm,
    },
    {
        path: '/changeHistory',
        name: 'change-history',
        component: ChangeHistoryList
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
