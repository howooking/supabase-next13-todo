import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function UserAvatar({
  imgUrl,
  fallback,
}: {
  imgUrl: string;
  fallback: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={imgUrl} alt="profile image" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
