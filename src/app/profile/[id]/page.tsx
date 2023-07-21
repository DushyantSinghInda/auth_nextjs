export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="pb-3">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page{" "}
        <span className="p-2 ml-2 bg-orange-500 text-black rounded-lg">
          {params.id}
        </span>
      </p>
    </div>
  );
}
