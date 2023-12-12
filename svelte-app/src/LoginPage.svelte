<script lang="ts">
    import AuthenticationService from './services/AuthenticationService';

    let username = '';
    let password = '';
    let loginError = '';

    async function login() {
        try {
            await AuthenticationService.login(username, password);
            // Redirect or perform other actions upon successful login
            console.log('Logged in successfully');
        } catch (error) {
            loginError = 'Failed to log in. Please check your credentials.';
        }
    }

</script>

<style>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f2f5;
    }

    .login-form {
        padding: 2rem;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .login-form input {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .login-form button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .login-form button:hover {
        background-color: #0056b3;
    }
</style>

<div class="login-container">
    <form class="login-form" on:submit|preventDefault={login}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" bind:value={username} />
        <input type="password" placeholder="Password" bind:value={password} />
        <button type="submit">Login</button>
    </form>
</div>