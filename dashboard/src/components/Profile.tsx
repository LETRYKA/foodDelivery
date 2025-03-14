const Profile = (props: any) => {
  const { user } = props;
  return (
    <div className="h-full flex flex-row justify-end items-center gap-3">
      <div className="flex flex-col">
        <div className="flex flex-row gap-1 items-center justify-end">
          <p className="text-[10px] text-[var(--background)] py-[2px] px-2 bg-[var(--muted-foreground)] rounded-[var(--radius)]">
            {user.role}
          </p>
        </div>
        <p className="text-base font-medium text-[var(--foreground)] -mt-[2px] cursor-pointer">
          @{user.name}
        </p>
      </div>
      <div
        className="w-11 h-11 bg-slate-300 rounded-4xl bg-center bg-cover cursor-pointer"
        style={{ backgroundImage: `url(${user.profile})` }}
      ></div>
    </div>
  );
};

export default Profile;
