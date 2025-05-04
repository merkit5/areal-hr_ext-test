import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

import OrganizationList from '../components/organization/OrganizationList.vue';
import OrganizationForm from '../components/organization/OrganizationForm.vue';

import DepartmentList from '../components/department/DepartmentList.vue';
import DepartmentForm from '../components/department/DepartmentForm.vue';

import PositionList from '../components/position/PositionList.vue';
import PositionForm from '../components/position/PositionForm.vue';

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
        meta: { requiresAuth: false }
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
        component: OrganizationForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/organizations/edit/:id',
        name: 'edit-organization',
        component: OrganizationForm,
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
        component: DepartmentForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/departments/edit/:id',
        name: 'edit-department',
        component: DepartmentForm,
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
        component: PositionForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/positions/edit/:id',
        name: 'edit-position',
        component: PositionForm,
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

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth === false) {
        return next();
    }

    try {
        const response = await fetch('/api/auth/check', {
            credentials: 'include',
        });

        if (response.ok) {
            next();
        } else {
            next('/login');
        }
    } catch (error) {
        next('/login');
    }
});

export default router;
