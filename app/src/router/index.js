import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

import OrganizationList from '../components/organization/OrganizationList.vue';
import OrganizationCreate from '../components/organization/OrganizationCreate.vue';
import OrganizationEdit from '../components/organization/OrganizationEdit.vue';

import DepartmentList from '../components/department/DepartmentList.vue';
import DepartmentCreate from '../components/department/DepartmentCreate.vue';
import DepartmentEdit from '../components/department/DepartmentEdit.vue';

import PositionList from '../components/position/PositionList.vue';
import PositionCreate from '../components/position/PositionCreate.vue';
import PositionEdit from '../components/position/PositionEdit.vue';

import EmployeeList from '../components/employee/EmployeeList.vue';
import EmployeeForm from '../components/employee/EmployeeForm.vue';

import HROperationsList from '../components/hrOperations/HROperationsList.vue';
import HROperationForm from '../components/hrOperations/HROperationForm.vue';

import UserList from '../components/user/UserList.vue';
import UserForm from '../components/user/UserForm.vue';

import ChangeHistoryList from '../components/changeHistory/ChangeHistoryList.vue';

import Login from '../views/Login.vue';
import ProfileView from '../views/ProfileView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/organizations',
        name: 'organizations',
        component: OrganizationList,
        meta: { requiresAuth: true },
    },
    {
        path: '/organizations/new',
        name: 'create-organization',
        component: OrganizationCreate,
        meta: { requiresAuth: true },
    },
    {
        path: '/organizations/edit/:id',
        name: 'edit-organization',
        component: OrganizationEdit,
        meta: { requiresAuth: true },
    },
    {
        path: '/departments',
        name: 'departments',
        component: DepartmentList,
        meta: { requiresAuth: true },
    },
    {
        path: '/departments/new',
        name: 'create-department',
        component: DepartmentCreate,
        meta: { requiresAuth: true },
    },
    {
        path: '/departments/edit/:id',
        name: 'edit-department',
        component: DepartmentEdit,
        meta: { requiresAuth: true },
    },
    {
        path: '/positions',
        name: 'positions',
        component: PositionList,
        meta: { requiresAuth: true },
    },
    {
        path: '/positions/new',
        name: 'create-position',
        component: PositionCreate,
        meta: { requiresAuth: true },
    },
    {
        path: '/positions/edit/:id',
        name: 'edit-position',
        component: PositionEdit,
        meta: { requiresAuth: true },
    },
    {
        path: '/employees',
        name: 'EmployeeList',
        component: EmployeeList,
        meta: { requiresAuth: true },
    },
    {
        path: '/employees/new',
        name: 'EmployeeCreate',
        component: EmployeeForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/employees/edit/:id',
        name: 'EmployeeEdit',
        component: EmployeeForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/hr-operations',
        name: 'hr-operations',
        component: HROperationsList,
        meta: { requiresAuth: true },
    },
    {
        path: '/hr-operations/new',
        name: 'create-hr-operation',
        component: HROperationForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/hr-operations/edit/:id',
        name: 'edit-hr-operation',
        component: HROperationForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/users',
        name: 'UserList',
        component: UserList,
        meta: { requiresAuth: true },
    },
    {
        path: '/users/create',
        name: 'UserCreate',
        component: UserForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/users/edit/:id',
        name: 'UserEdit',
        component: UserForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/changeHistory',
        name: 'change-history',
        component: ChangeHistoryList,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;
