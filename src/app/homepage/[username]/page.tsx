export default function ProfilePage({ params }: { params: { username: string } }) {
  return <div>Homepage: {params.username}</div>
}
