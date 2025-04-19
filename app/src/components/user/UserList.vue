<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchUsers, deleteUser } from '@/services/user';

const router = useRouter();
const users = ref([]);
const isLoading = ref(false);
const error = ref(null);

onMounted(async () => {
  await loadUsers();
});

const loadUsers = async () => {
  try {
    isLoading.value = true;
    const { data } = await fetchUsers();
    users.value = data;
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  } finally {
    isLoading.value = false;
  }
};

const handleEdit = (id) => {
  router.push(`/users/edit/${id}`);
};

const handleCreate = () => {
  router.push('/users/create');
};

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return;

  try {
    await deleteUser(id);
    await loadUsers();
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  }
};
</script>

<template>
  <div>
    <h1>User List</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <button @click="handleCreate">Create New User</button>

      <table v-if="users.length > 0">
        <thead>
        <tr>
          <th>ID</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Login</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.patronymic || '-' }}</td>
          <td>{{ user.login }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="handleEdit(user.id)">Edit</button>
            <button @click="handleDelete(user.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>No users found</div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  margin-right: 0.5rem;
}

.error {
  color: red;
  margin-bottom: 1rem;
}
</style>
