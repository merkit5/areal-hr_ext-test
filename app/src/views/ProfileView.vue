<template>
  <div class="profile-container">
    <h1>Личный кабинет</h1>

    <div v-if="user" class="profile-content">
      <div v-if="!isEditMode" class="user-info">
        <p><strong>Логин:</strong> {{ user.login }}</p>
        <p><strong>Имя:</strong> {{ user.first_name }}</p>
        <p><strong>Фамилия:</strong> {{ user.last_name }}</p>
        <p v-if="user.patronymic"><strong>Отчество:</strong> {{ user.patronymic }}</p>
        <p><strong>Роль:</strong> {{ user.role }}</p>

        <div class="actions">
          <button @click="isEditMode = true" class="edit-button">Редактировать</button>
          <button @click="handleLogout" class="logout-button">Выйти</button>
        </div>
      </div>

      <div v-else class="edit-form">
        <h3>Редактирование профиля</h3>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label>Имя:</label>
            <input v-model="editForm.first_name" required>
          </div>
          <div class="form-group">
            <label>Фамилия:</label>
            <input v-model="editForm.last_name" required>
          </div>
          <div class="form-group">
            <label>Отчество:</label>
            <input v-model="editForm.patronymic">
          </div>
          <div class="form-group">
            <label>Логин:</label>
            <input v-model="editForm.login" required>
          </div>

          <div class="form-actions">
            <button type="button" @click="isEditMode = false" class="cancel-button">Отмена</button>
            <button type="submit" class="save-button">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserData, updateUser, logout } from '@/services/auth';

const router = useRouter();
const user = ref(null);
const isEditMode = ref(false);
const editForm = ref({
  first_name: '',
  last_name: '',
  patronymic: '',
  login: ''
});

// Загружаем данные пользователя
onMounted(async () => {
  try {
    const response = await getUserData();
    user.value = response.data;
    editForm.value = { ...response.data };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
});

const handleLogout = async () => {
  try {
    await logout();
    localStorage.removeItem('token');
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const saveChanges = async () => {
  try {
    const response = await updateUser(editForm.value);
    user.value = response.data;
    isEditMode.value = false;
  } catch (error) {
    console.error('Failed to update user:', error);
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.profile-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info p {
  margin: 1rem 0;
  font-size: 1.1rem;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.edit-form {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.edit-button {
  background: #42b983;
  color: white;
}

.logout-button {
  background: #f44336;
  color: white;
}

.cancel-button {
  background: #e0e0e0;
}

.save-button {
  background: #42b983;
  color: white;
}
</style>
