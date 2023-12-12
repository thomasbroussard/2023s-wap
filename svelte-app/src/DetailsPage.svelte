<script lang="ts">
    import { onMount } from 'svelte';
    import { UserService } from './services/UserService';

    let users = [];
    let currentPage = 1;
    let totalPages = 0;

    async function fetchUsers(page: number) {
        currentPage = page;
        try {
            const data = await UserService.getUsers(page);
            users = data.data;
            totalPages = data.total_pages;
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    }

    onMount(() => {
        fetchUsers(currentPage);
    });
</script>

<!-- Add your existing styles here -->

<div>
    <h2>User List</h2>
    {#if users.length > 0}
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Avatar</th>
            </tr>
            </thead>
            <tbody>
            {#each users as user}
                <tr>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td><img src={user.avatar} alt={`Avatar of ${user.first_name}`} width="50" /></td>
                </tr>
            {/each}
            </tbody>
        </table>
        <div class="pagination">
            {#if currentPage > 1}
                <button on:click={() => fetchUsers(currentPage - 1)}>Previous</button>
            {/if}
            {#if currentPage < totalPages}
                <button on:click={() => fetchUsers(currentPage + 1)}>Next</button>
            {/if}
        </div>
    {:else}
        <p>No users found.</p>
    {/if}
</div>
