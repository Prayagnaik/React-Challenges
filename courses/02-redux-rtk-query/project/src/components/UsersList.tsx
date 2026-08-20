import { useGetUsersQuery } from '../api/apiSlice'

export default function UsersList() {
  const { data, isLoading, error } = useGetUsersQuery();

  if (isLoading) {
    return <p data-testid="users-loading">Loading...</p>
  }

  if (error) {
    return <p data-testid="users-error">Failed to load users.</p>
  }

  return (
    <div>
      <h2>Users</h2>

      <ul data-testid="users-list">
        {data?.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
            <p>@{user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}